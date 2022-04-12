# Low cost sprite based V-Tubing

## Requirements

- Basic [NodeJS](http://nodejs.org) knowledge.
- Basic HTML, JS, CSS, jQuery knowledge.
- [Stream Deck Web Requests plugin](https://apps.elgato.com/plugins/gg.datagram.web-requests) and/or [Touch Portal](https://www.touch-portal.com/)'s HTTP GET action.

## Instalation/Usage

First, install the required Node dependencies in the project folder:
`npm i ws socket.io express`

Then, run the main script:
`node app.js`

## Using with Stream Deck

1. Point to the (running) webservice;
2. From 0 (zero) to F-1 (total frames minus one), specify the frame you want as "message".

![sd-action.png](tutorial/sd-action.png)

## Using with Touch Portal

1. Point to the (running) webpage (usually, `http://127.0.0.1:3000/character`) with the `?frame=` query string;
2. From 0 (zero) to F-1 (total frames minus one), specify the frame you want as `?frame=` query string.

![tp-action.png](tutorial/tp-action.png)

## Mapping the character

1. You'll need the `X` and `Y` coordinates, plus the `width` and `height` of each frame, in order to map it correctly;
2. Then, proceed to fill the `frames` array inside the `assets/frames.json` file.

## Other commands

- Use `flip` and `unflip` as commands to (un)flip the frame.
- Use `first` to jump to the first frame recorded in the `frames.json` file.
- Use `last` to jump to the last frame recorded in the `frames.json` file.
- Use `random` to jump to a random frame recorded in the `frames.json` file.

## Todo

- ⬜ Support for small movement when microphone is detected.
- ⬜ Support for second set of frames for mouth movement when microphone is detected.
- ✅ "first", "last" and "random" actions.
- ✅ "flip" and "unflip" actions.

## FAQ

Q: _Why do you use WebSockets on Stream Deck?_
A: It's faster.

Q: _Why do you use GET on Touch Portal?_
A: It's more compatible and easy to use. Plus, no plugin needed.

Q: _Are you going to improve this project?_
A: I'll probably add minor modifications. But I won't do much. As it is part of my (bigger) [caramel.gg](http://caramel.gg) project.

Q: _Your demo has a white background on my OBS!_
A: Yes. I'm lazy and didn't bother finding a demo sheet without background.

Q: _Your demo has more frames than the three you mapped!_
A: I. Am. LAZY!

## Credits

- Demo using [Female Character Sprite for Visual Novel](https://sutemo.itch.io/female-character).
- Tell me if you use this script. So I can feature you.
