Package.describe({
  name: 'tsumina:meteor-systemjs',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'configurable meteor systemjs loader',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/TsumiNa/meteor-systemjs',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.use('promise');
  api.addFiles('lib/require.js', 'server');
  api.addFiles([
    'lib/URLPolyfill.js',
    'lib/system.src.js',
    'lib/config.js'
  ])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('tsumina:meteor-systemjs');
  api.addFiles('meteor-systemjs-tests.js');
});
