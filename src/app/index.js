var MongoClient = require('mongodb').MongoClient;
const express = require('express')
const path = require('path')
const app = express()
const port = 4000
var url = "mongodb://mongo:27017/";

app.use(express.static(path.join(__dirname, 'public')));
//app.get('/', (req, res) => res.sendFile(__dirname, 'index.html'));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/submit', function(req, res) {
  res.sendFile(__dirname + '/public/submit.html');
});
app.get('/comments', function(req, res) {
  res.sendFile(__dirname + '/public/comments1.html');
});
//app.get('/comments', (req, res) => res.sendFile(__dirname, 'comments.html'));

app.post('/db/:db/count/:count', function(req, res) {
  if (!isNaN(req.params.count)) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("weather");
      var count = req.params.count;
      var limit = 30;
      var skip = parseInt(count) * limit;

      dbo.collection('a').aggregate([{

          $group: {
            '_id': "$tx.h",
            'blk': {
              $first: "$blk"
            },
            'out': {
              $first: "$out"
            },
            'count': {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            'blk.i': -1
          }

        },
        {
          "$limit": skip + limit
        },
        {
          "$skip": skip
        }

      ]).toArray(function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        db.close();
        res.send(result);
      })

    });
  } else {
    res.send("Not a number");
  }
});

app.post('/tx/:tx/count/:count', function(req, res) {
  if ((req.params.tx !== undefined) && (!isNaN(req.params.count))) {
    // if ((req.params.tx !== undefined ) && (req.params.comments ! == undefined){
    var tx = req.params.tx;
    var count = req.params.count;

    var limit = 30;
    var skip = parseInt(count) * limit;

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("weather");

      dbo.collection('a').aggregate([{
          $unwind: "$out"
        },
        {
          $group: {
            '_id': "$tx.h",

            'blk': {
              $first: "$blk"
            },
            'out': {
              $first: "$out"
            }
          }
        },
        {
          $sort: {
            'out.s5': 1
          }
        },
        {
          $match: {
            $or: [{
              '_id': tx
            }, {
              'out.s6': tx
            }]
          }
        },
        {
          "$limit": skip + limit
        },
        {
          "$skip": skip
        }

      ]).toArray(function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        db.close();
        res.send(result);
      })

    });
  } else {
    res.send("Not a number");
  }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
