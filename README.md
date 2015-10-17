## Systemjs ES6 modules loader on both side

**This package adds SystemJS Module Loader to your project.**
This package use SystemJS default configuration. You can use `import` and `export` syntax on both client/server side.

**You can not use it alone**. Because the js-compiler of meteor will only transpile files with on module system. You can use it with [meteor-typescript](https://github.com/TsumiNa/meteor-typescript). It's a typescript compiler can transpile files to `system` and `amd`.
```bash
$ meteor add tsumina:meteor-systemjs
$ meteor add tsumina:meteor-typescript  # add typescript compiler
```

## SystemJS API
Full SystemJS API docs can be found [on their Github repo](https://github.com/systemjs/systemjs/blob/master/docs/system-api.md).

See detail about [SystemJS](https://github.com/systemjs/systemjs)


## change log
#### 0.1.0
- amd module load support

#### 0.0.4
- Update systemjs to v0.19.4

## Usage
```bash
$ meteor add tsumina:meteor-systemjs
```

### Roadmap

- [ ] examples for usage
- [ ] Improve README


### Copyright and license

Code and documentation &copy; 2015 [TsumiNa](https://github.com/TsumiNa)
Released under the MIT license. 