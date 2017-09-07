const hotClient = require('webpack-hot-middleware/client');

// subscribe event
hotClient.subscribe((event) => {
  if (event.action === 'reload') {
    window.location.reload();
  }
})