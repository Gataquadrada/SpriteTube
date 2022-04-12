const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const WebSocket = require("ws")

app.use("/assets", express.static("assets"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.htm")
})

app.get("/character", (req, res) => {
  io.emit("frame", req.query.frame || 0)
  res.send("ok")
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
