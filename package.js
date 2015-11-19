Package.describe({
  name: 'tsumina:meteor-systemjs',
  version: '0.2.1',
  // Brief, one-line summary of the package.
  summary: 'Systemjs loader for meteor. Running on both side',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/TsumiNa/meteor-systemjs',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('promise');
  api.addFiles('lib/require.js', 'server', {bare: true});
  api.addFiles([
    'lib/system-polyfills.src.js',
    'lib/system.src.js',
    'lib/config.js',
    'lib/amd.js'
  ], ['server', 'client'], {bare: true});
  api.export('define');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tsumina:meteor-systemjs');
  api.addFiles('meteor-systemjs-tests.js');
});
