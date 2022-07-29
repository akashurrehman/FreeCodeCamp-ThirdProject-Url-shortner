require('dotenv').config();
const express = require('express');
const dns=require('dns');
const cors = require('cors');
const app = express();
const bodyParser=require('body-parser')
var shortUrl = require("node-url-shortener");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: false }))
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
  const links = [];
  let id = 0;

app.post("/api/shorturl",function(req,res){
    
    const {url} =req.body;
    const httpRegex = /^(http|https)(:\/\/)/;
    if (!httpRegex.test(url))
    {
      return res.json({ error: 'invalid url' })
    }
    else {
      id++;
      const link = {
        original_url: url,
        short_url: `${id}`
      };
      links.push(link);
      console.log(link);
      return res.json(link);
    }
});

app.get('/api/shorturl/:id', (req, res) => {
  const { id } = req.params;
  const link = links.find(a => a.short_url === id);
  if(link) {
    return res.redirect(link.original_url);
  } else {
    return res.json({
      error: 'No short url'
    });
  }

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
