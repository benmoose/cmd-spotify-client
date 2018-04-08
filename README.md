# CMD Spotify Client

## Installation

1. Clone the repo

```
https://github.com/benjaminhadfield/cmd-spotify-client.git
```

2. Navigate to the project root

```
cd cmd-spotify-client
```

The next steps differ depending on whether you arre using docker or a local
version of Node to run the server.

#### Docker

3. In the project root, build the image

```
docker build -t cmd-spotify/client .
```

4. Run the image, exposing the port to your host machine

```
docker run -p 3000:3000 cmd-spotify/client
```

If you want to use a different port on your host machine, change the `-p` flag
to `<PORT>:3000`. If you do this, then you will need to change the CLIENT URL
environment variable on the server to point to the new port.
