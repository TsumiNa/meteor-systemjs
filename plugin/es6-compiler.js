const ts = Npm.require('typescript');
const crc = Npm.require('crc');
// const debug = Npm.require('debug')('ts:debug:');

Plugin.registerCompiler({
    extensions: ['sys.js', 'au.js'],
    filenames: []
}, () => {
    return new ES6Compiler();
});

function prepareSourceMap(sourceMapContent, fileContent, sourceMapPath) {
    let sourceMapJson = JSON.parse(sourceMapContent);
    sourceMapJson.sourcesContent = [fileContent];
    sourceMapJson.sources = [sourceMapPath];
    delete sourceMapJson.file;
    return sourceMapJson;
}


class ES6Compiler extends CachingCompiler {
    constructor() {
        super({
            compilerName: 'ES6Compiler',
            defaultCacheSize: 1024 * 1024 * 10,
        });
        /**
         * defaults compiler options
         */
        this.options = this.options || {
            noLib: false,
            noEmitOnError: false,
            sourceMap: true,
            noImplicitAny: false,
            removeComments: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            allowNonTsExtensions: true,
            declaration: false,
            jsx: ts.JsxEmit.React,
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.System
        };

        // starting message
        msg[2](' Using Systemjs Loader...             ');
        msg[2](' Using Aurelia Framework...           ');
    }

    getCacheKey(inputFile) {
        return inputFile.getSourceHash() + crc.crc32(inputFile.getPathInPackage()).toString(32);
    }

    compileResultSize(compileResult) {
        // let path = compileResult.path
        // debug('Result: %j', path);
        return compileResult.code.length + compileResult.map.length;
    }

    compileOneFile(inputFile) {
        let fileName = inputFile.getPathInPackage();
        let fileContent = inputFile.getContentsAsString();
        let packageName = inputFile.getPackageName();
        let sourceMapPath = inputFile.getDisplayPath();

        // debug('Javascript File: %j', inputFile.getPathInPackage());
        let moduleName = fileName.replace(/(\.au|\.sys)\.js$/, '').replace(/\\/g, '/');
        moduleName = packageName ? packageName + '/' + moduleName : moduleName;

        let result;
        try {
            result = ts.transpileModule(fileContent, {
                compilerOptions: this.options,
                moduleName: moduleName,
                reportDiagnostics: true
            });
        } catch (err) {
            return inputFile.error({
                message: "Compiler error: " + err.message,
                sourcePath: fileName
            });
        }

        result.diagnostics.forEach(diagnostic => {
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            if (!diagnostic.file) {
                msg[1](` ${message}`);
                return;
            }
            let {
                line, character
            } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);

            // emit error messages
            // debug('Emit Error File: %j', diagnostic.file.fileName);
            inputFile.error({
                message: message,
                column: character + 1,
                line: line + 1
            });
        });

        // get transpiled code
        let code = result.outputText;
        code = code ? code.slice(0, code.lastIndexOf("//#")) : code;

        // get source map
        let map = prepareSourceMap(
            result.sourceMapText,
            fileContent,
            sourceMapPath);

        // push to result
        return {
            code: code,
            path: moduleName + '.js',
            map: map
        };
    }

    addCompileResult(inputFile, compileResult) {
        inputFile.addJavaScript({
            path: compileResult.path,
            sourcePath: inputFile.getPathInPackage(),
            data: compileResult.code,
            sourceMap: compileResult.map,
            bare: true
        });
    }
}