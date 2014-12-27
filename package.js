Package.describe({
  summary: 'Simple username and password exchanges for token',
  version: '0.0.1',
  name: 'khanghoang:oauth2-provider',
  git: 'https://github.com/khanghoang/oauth2-provider.git'
})

Npm.depends({
  'crypto-js': "3.1.2-5"
})

Package.onUse(function (api) {
  api.use(['underscore', 'mongo'], ['server', 'client'])
  api.export(['Token'], ['server', 'client'])
  api.addFiles(['khanghoang/oauth2-provider.js'], ['server', 'client'])
})
