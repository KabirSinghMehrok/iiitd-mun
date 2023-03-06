const livereload = require("livereload");
const express = require('express');
const path = require('path')
const app = express();

// livereload
if (process.env.NODE_ENV === 'development') {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'public'));
  
  // connect livereload using express middleware
  const connectLivereload = require("connect-livereload");
  app.use(connectLivereload());
  
  // avoid infinite loop
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}

// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for home.html and about.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/unga', (req, res) => {
  res.sendFile(__dirname + '/views/unga.html');
});

app.get('/unsc', (req, res) => {
  res.sendFile(__dirname + '/views/404.html');
});

app.get('/g20', (req, res) => {
  res.sendFile(__dirname + '/views/404.html');
});

app.get('/uncsw', (req, res) => {
  res.sendFile(__dirname + '/views/404.html');
});

app.get('/unhrc', (req, res) => {
  res.sendFile(__dirname + '/views/404.html');
});

app.get('/aippm', (req, res) => {
  res.sendFile(__dirname + '/views/404.html');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/views/404.html');
});

port = process.env.port || 8000;
app.listen(port, () => {console.log(`Listening on ${port}`)}  );
