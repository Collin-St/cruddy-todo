const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, counter) {
    if(err) {
      throw err;
    } else {
      // var obj = {id: counter, text: text};
      items = {id: counter, text: text}; 
      fs.writeFile(exports.dataDir + '/' + counter + '.txt', text, function(err) {
        if (err) {
          throw err;
        } else {
          // callback(null, obj)
          callback(null, items)
        }
      });
    }
  });
  // console.log('ITEMS ARE HERE ----> ', data)
  // items[id] = text;

};

exports.readAll = (callback) => {
  var data = [];
  
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw err;
    } else {
    files.forEach(file => {
      var sliced = file.slice(0, file.length - 4).toString();
      data.push({'id': sliced, 'text': sliced});
      // console.log('###########', sliced);
    })
    callback(null, data);
    }
  })

  // callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
