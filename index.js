const livereload = require("livereload");
const express = require('express');
const path = require('path')
const app = express();
const fs = require('fs');
const committeeInfo = JSON.parse(fs.readFileSync('./public/content/COMMITTEE_INFO.json'));

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
else {
  console.log(process.env.NODE_ENV)
}

const committee_names = Object.keys(committeeInfo)
const validateUrl = (req, res, next) => {
  request_page = req.url.slice(1)
  if (committee_names.includes(request_page)) {
    res.render('committee_info', {data : committeeInfo[request_page]})
  }
  else {
    next()
  }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(validateUrl)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// Define routes
app.get('/', (req, res) => {
  res.render('index', {data: committeeInfo});
});

app.get('*', (req, res) => {
  res.render('404');
});

port = process.env.port || 7000;
app.listen(port, () => {console.log(`Listening on ${port}`)}  );
