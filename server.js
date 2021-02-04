const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin",  "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods","*"
  );
  next();
});

const db = mongoose.connect('mongodb://localhost/ToDoListApp',{
    useNewUrlParser: true ,
    useUnifiedTopology: true
})


let toDoItem = require('./model/ToDoListItem')

app.get('', function(req, res) {
  res.send('done')
})

app.get('/toDoItem', function(req, res) {
  toDoItem.find({}, function(err, toDoItems) {
    if(err) {
      console.log(err);
    }
    else {
      res.send(toDoItems)
    }
  })
})

app.delete('/toDoItem/:ID', function(req, res) {
    let itemId = req.params.ID
    toDoItem.deleteOne({_id: itemId}, function(err, toDoItem) {
      if(err) {
        console.log(err);
      }
      else {
        res.send(toDoItem)
      }
    })
})

app.post('/toDoItem', function(req, res) {
  let newtoDoItem = new toDoItem()
  newtoDoItem.text = req.body.TEXT //for client side in REACT
  newtoDoItem.isArchived = req.body.IsArchived

  newtoDoItem.save(function(err, toDoItem) {
    if(err) {
      console.log(err);
    }
    else {
      res.send(toDoItem)
    }
  })
})

app.put('/toDoItem/:ID', function(req, res) {
  let itemId = req.params.ID
  toDoItem.updateOne({_id: itemId},{$set: {text: req.body.TEXT, isArchived: req.body.IsArchived}} ,function(err, toDoItem) {
    if(err) {
      console.log(err);
    }
    else {
      res.send(toDoItem)
    }
  })
})


app.listen(4000, function() {
    console.log("Server is running on port 4000")
})
