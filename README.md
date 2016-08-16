# swagger-resource-meddleware

Summary:

Starts a simple nodeJS server and loads the Swagger Spec


# Build & Run

```Shell
npm install
```

# Usage

```Javascript
var resourceServer = require('swagger-resource-meddleware');
var specDoc = yamltojs('yamlfile');
var app = require('express')();

resourceServer.mount({
  name: 'specname',
  doc: specDoc
}, app, callback);

```
