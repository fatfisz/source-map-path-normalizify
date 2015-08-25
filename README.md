# source-map-path-normalizify

> Browserify transform that fixes source map paths

## The problem

Let's say you use [grunt-browserify](https://github.com/jmreidy/grunt-browserify) with a `debug` option turned on.
And you use a transform, e.g. [reactify](https://github.com/andreypopp/reactify).
And you work on Windows!

There is a chance your source maps don't have the right paths.
Instead of seeing nice tree like this in your dev tools:

```
localhost:8080
├─ js
|  ├─ dir1
|  |  ├─ script1.js
|  |  ├─ script2.js
|  ├─ dir2
|  |  ├─ script1.js
|  |  └─ script2.js
|  └─ bundle.js
└─ node-modules
   ├─ grunt-browserify/node_modules/browserify/node_modules
   │  ├─ browser-pack
   |  |  └─ _prelude.js
   |  └─ events
   |     └─ events.js
   ├─ module1
   └─ module2

```

you see this abomination:

```
localhost:8080
└─ js
   ├─ node_modules
   |  ├─ grunt-browserify/node_modules/browserify/node_modules/events
   |  |  └─ events.js
   |  ├─ module1
   |  └─ module2
   ├─ D:\LongPathToTheProject\js\dir1\script1.js        The filename is a full absolute path.
   ├─ D:\LongPathToTheProject\js\dir1\script2.js        And where did my directory structure go?
   ├─ D:\LongPathToTheProject\js\dir2\script1.js        Oh no!
   ├─ D:\LongPathToTheProject\js\dir2\script2.js
   ├─ bundle.js
   └─ node_modules\grunt-browserify\node_modules\browserify\node_modules\browser-pack\_prelude.js
```

## The solution

Just use this transform as you'd use any other, preferably as the last one.
It will extract the source map and fix the paths.

## Options

### options.root
Type: `String`
Default: `process.cwd()`

The path with respect to which we will be resolving the paths saved in the old source map.

E.g. for an old path `D:\LongPathToTheProject\js\dir2\script2.js` and `options.root` set to `D:\LongPathToTheProject`, the resulting path will be `js/dir2/script2.js` (notice the normalized separators).

### options.sourceRoot
Type: `String`
Default: `'/'`

The new value of the `sourceRoot` source map property.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

## License
Copyright (c) 2015 FatFisz. Licensed under the MIT license.
