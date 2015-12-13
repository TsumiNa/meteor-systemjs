## Systemjs ES6 modules loader on both side

**This package adds SystemJS Module Loader to your project.** 
You can use `import` and `export` syntax on both client/server side.

**This package add `.sys.js` extension to your app.** 
ES6 codes in `.sys.js` extension files will be transpiled to `systemjs loader` compatible files. For example:

* `foo.sys.js`

```javascript
import 'jQuery'
export const FOO = 'SYSTEM';
```

* `bar.sys.js`

```js
import {FOO} from `./foo`
console.log(FOO);
```
then use a `System.import()` to load them

* `startup.js`

```js
// this will load on both side
System.import('bar');
```

You can also use it with [meteor-typescript](https://github.com/TsumiNa/meteor-typescript). Transpile `ts` files to `system` and `amd` compatible `js` files.
```bash
$ meteor add tsumina:meteor-systemjs
$ meteor add tsumina:meteor-typescript  # add typescript compiler
```

## SystemJS API
This package use SystemJS default configuration. Full SystemJS API docs can be found [on their Github repo](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md).

See detail about [SystemJS](https://github.com/systemjs/systemjs)


## change log

#### 0.3.6
- **Bug fix**, fix `Path reservation conflict` error when your have two or more files have exactly identical content.

#### 0.3.4
- Better javascript syntax error output.
- Optimize javascript output.

#### 0.3.2
- AMD loader bug fix.

#### 0.3.1
- **[*breaking change*]:** Now ES6 compiler is bundle with this package. You can use `sys.js` extension to work with `systemjs loader`.

#### 0.2.1
- Update systemjs to v0.19.6

#### 0.1.0
- amd module load support


### Copyright and license

Code and documentation &copy; 2015 [TsumiNa](https://github.com/TsumiNa)
Released under the MIT license. 