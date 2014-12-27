Package.describe({
  summary: 'Simple username and password exchanges for token',
  version: '0.0.2',
  name: 'khanghoang:oauth2-provider',
  git: 'https://github.com/khanghoang/oauth2-provider.git'
})

Npm.depends({
  'crypto-js': "3.1.2-5"
})

Package.onUse(function (api) {
  api.versionsFrom('0.9.0')
  api.use(['underscore', 'mongo@1.0.4'], ['server', 'client'])
  api.use('application-configuration@1.0.0');
  api.export(['Token'], ['server', 'client']),
  api.addFiles(['khanghoang:oauth2-provider.js'], ['server', 'client']) 
})

Package.onTest(function (api) {
  api.use('tinytest'),
  api.addFiles('khanghoang:oauth2-provider-tests.js', 'server')
})
