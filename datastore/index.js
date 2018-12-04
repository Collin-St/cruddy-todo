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

  fs.readFile(exports.dataDir + '/' + id + '.txt', (err,data) => {
    if(err) {
      callback(err);
    } else {
      callback(null, {id, 'text':data.toString()})
    }
  })

// fs.readdir(exports.dataDir, (err, files) => {
//   if (err) {
//    callback(err);
//   } else {
//     // files.forEach(file => {
//     for (var i = 0; i < files.length; i++) {
//       if(files[i].slice(0, - 4) === id) {
//         // console.log('FILENAME', files[i]);
//         // console.log("HOOORAY")
//         // console.log(exports.dataDir + '/' + files[i])
//         fs.readFile(exports.dataDir + '/' + files[i], (err, data) => {
//           if(err) {
//             callback(err);
//           } else {
//           // console.log('DATA ', data)
//             // console.log("==== here");
//             // console.log('file ===== ', file, id)  
//               callback(null, {id, 'text': data.toString('utf8')})
//           }
//           // if (found === false) {
//           //   callback(err);
//           // }
//         }
//       )} 
          
//     }
        
//         // callback(null, {id, 'text': data.toString('utf8')})
//     //)
//     // callback(null, {id, text});
//   }
// })
};

exports.update = (id, text, callback) => {
  
  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, data) => {
    if (err) {
      callback(err)
    } else {
      // console.log(id, text, data.toString())
      // data = text;
      // console.log(data);
      fs.writeFile(exports.dataDir + '/' + id + '.txt', text, (err) => {
        // console.log(text);
        if (err) {
          callback(err);
        } else {
          // console.log('complete')
          callback(null, {id, text});
        }
      })
    }
  })
  
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  fs.unlink(exports.dataDir + '/' + id + '.txt', (err) => {
    if(err) {
      callback(err);
    } else {
      callback(null, {id})
    }
  })
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
