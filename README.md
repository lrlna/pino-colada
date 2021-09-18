# pino-colada 🍹
[![npm version][1]][2] [![build status][3]][4]
[![downloads][5]][6] [![js-standard-style][7]][8]

A cute [ndjson](http://ndjson.org) formatter for [pino](https://github.com/pinojs/pino). 

![pino-colada](./pino-colada.png)

# Usage
Pipe a server that uses pino into pino-colada for logging.

```bash
node server.js | pino-colada
```

## pino-colada
After parsing input from `server.js`, pino-colada returns a stream and pipes it
over to `process.stdout`. It will output a timestamp, a log level in a form of
an emoji, and a message.

# Programmatic integration as [pino prettifier](http://getpino.io/#/docs/pretty?id=api-example)

```javascript
const pino = require('pino')
const logger = pino({
  prettyPrint: {},
  prettifier: require('pino-colada')
})

logger.info('hi')
```

## Custom emojis
When using pino-colada programmatically, you can define custom emojis. This is useful
when you define custom levels and want to provide emojis for them or if you want to
override any default emoji.

```
const pino = require('pino')
const logger = pino({
  prettyPrint: {
    customEmojis: {
      info: '✅',
      success: '✅',
      fail: '❌'
    }
  },
  prettifier: require('pino-colada'),
  customLevels: {
    success: 31,
    fail: 32
  }
})

logger.info ('hi');
logger.success ('hi');
logger.fail ('hi');
```


# Install
```bash
npm install pino-colada
```

# Related content
- [pino](https://github.com/pinojs/pino)
- [merry](https://github.com/shipharbor/merry)
- [garnish](https://github.com/mattdesl/garnish)
- [@studio/log](https://github.com/javascript-studio/studio-log)
- [pino-http](https://github.com/pinojs/pino-http)
- [hapi-pino](https://github.com/pinojs/hapi-pino)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[1]: https://img.shields.io/npm/v/pino-colada.svg?style=flat-square
[2]: https://npmjs.org/package/pino-colada
[3]: https://img.shields.io/travis/lrlna/pino-colada/master.svg?style=flat-square
[4]: https://travis-ci.org/lrlna/pino-colada
[5]: http://img.shields.io/npm/dm/pino-colada.svg?style=flat-square
[6]: https://npmjs.org/package/pino-colada
[7]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[8]: https://github.com/feross/standard
