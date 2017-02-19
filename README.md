# pino-colada 🍹
A cute [ndjson](http://ndjson.org) pretty-printer for [pino](https://github.com/pinojs/pino). 

![pino-colada](./pino-colada.png)

# usage
Pipe pino-colada to a your server that uses pino for logging.

```bash
node server.js | pino-colada
```

## pino-colada
After parsing input from `server.js`, pino-colada returns a stream and pipes it
over to `process.stdout`. It will output a timestamp, a log level in a form of
an emoji, and a message.

# related content
- [merry](https://github.com/yoshuawuyts/merry)
- [garnish](https://github.com/mattdesl/garnish)
- [@studio/log](https://github.com/javascript-studio/studio-log)
- [pino](https://github.com/pinojs/pino)

## License
[MIT](https://tldrlegal.com/license/mit-license)
