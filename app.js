const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const WebSocket = require("ws")
const fs = require("fs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/assets", express.static("assets"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.htm")
})

app.get("/character", (req, res) => {
  io.emit("frame", req.query.frame || 0)
  res.send("ok")
})

app.get("/map", (req, res) => {
  res.sendFile(__dirname + "/pages/character-map.htm")
})

app.post("/map", (req, res) => {
  try {
    if (!fs.existsSync("assets/backups")) {
      fs.mkdirSync("assets/backups")
    }

    var d = new Date()
    const date = `${d.getFullYear()}_${("0" + (d.getMonth() + 1)).slice(-2)}_${(
      "0" + d.getDate()
    ).slice(-2)}`

    if (!fs.existsSync(`assets/backups/frames-${date}.json`)) {
      fs.copyFile(
        "assets/frames.json",
        `assets/backups/frames-${date}.json`,
        (err) => {}
      )
    }
  } catch (err) {
    console.error(err)
  }

  fs.writeFile("assets/frames.json", JSON.stringify(req.body), (err) => {
    if (err) {
      console.error(err)
      res.send("err")
      return
    }
  })

  res.json({ ok: true })
})

server.listen(3000, () => {
  console.log(`Maze Character App is running!`)
})

const wss = new WebSocket.Server({
  server,
})

wss.on("connection", (ws, req) => {
  ws.on("message", (data) => {
    io.emit("frame", data.toString())
  })

  ws.on("error", (error) => {
    // console.error(`onError: ${error.message}`)
  })
})
