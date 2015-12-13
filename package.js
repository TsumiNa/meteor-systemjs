Package.describe({
    name: 'tsumina:meteor-systemjs',
    version: '0.3.6',
    // Brief, one-line summary of the package.
    summary: 'Systemjs loader for meteor. Running on both side',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/TsumiNa/meteor-systemjs.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.2');
    api.use('isobuild:compiler-plugin@1.0.0');
    api.use('ecmascript@0.1.6');
    api.addFiles('lib/require.js', 'server', {
        bare: true
    });
    api.addFiles([
        'lib/system-polyfills.src.js',
        'lib/system.src.js',
        'lib/config.js',
        'lib/amd.js'
    ], ['server', 'client'], {
        bare: true
    });
    api.export('define');
});

Package.registerBuildPlugin({
    name: 'es6-compiler',
    use: [
        'ecmascript@0.1.6',
        'caching-compiler@1.0.0'
    ],
    sources: [
        'lib/utils.js',
        'plugin/es6-compiler.js'
    ],
    npmDependencies: {
        'typescript': '1.7.3',
        'crc': '3.4.0',
        'chalk': '1.1.1'
    }
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('ecmascript');
    api.use('tsumina:meteor-systemjs');
    api.addFiles('meteor-systemjs-tests.js');
});