const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const { dirname } = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const session = require('express-session');

const users = new Map();
// const loginUsers = [];

const url = 'mongodb://localhost:27017';
const dbName = 'matching0013';
const connectOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

class Room {
  constructor() {
    this.users = [];
    this.roomid = null;
    this.date = [];
    this.message = [];
  }
}

const room = [
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
  new Room(),
];

/*
MongoClient.connect(url, connectOption, (err, client) => {

  assert.equal(null, err);

  console.log('Connected successfully to server');

  const db = client.db(dbName);

  client.close();
});
*/


var sessionMiddleware = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
    httpOnly: false,
    secure: false,
    maxage: 1000 * 60 * 30
  }});
app.session = sessionMiddleware;
app.use(sessionMiddleware);

io.use(function(socket, next){
    sessionMiddleware(socket.request, socket.request.res, next);
});

function getColor(color) {
    if (color == 15) { return "f";}
    else if (color == 14) { return "e";}
    else if (color == 13) { return "d";}
    else if (color == 12) { return "c";}
    else if (color == 11) { return "b";}
    else if (color == 10) { return "a";}
    return ("" + color + "");
}
const connectedAccount = async (data, _io, _socket) => {
    let resultUserID;
    let client;
    let login = false;
    
    try {
      client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
      const db = client.db(dbName);
      const collection = db.collection('account');
        await collection.find({}).toArray( async (err, docs) => {
          for (const doc of docs) {
            if (doc.mail == data.mail) {
              if (doc.password == data.password) {
                await _io.to(_socket.id).emit('connected', {
                    userid: doc.userid,
                    color: doc.color, age: doc.age, pref: doc.pref, image: doc.image, name: doc.name,
                  });
              }
            }
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
  //    client.close();
    }
  
};
const getAccountJson = async (data, _res) => {
    let resultUserID;
    let client;
    let login = false;
    
    try {
      client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
      const db = client.db(dbName);
      const collection = db.collection('account');
        await collection.find({}).toArray(  (err, docs) => {
          for (const doc of docs) {
            if (doc.mail == data.mail) {
              if (doc.password == data.password) {
                _res.json(doc);
                return;
              }
            }
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
  //    client.close();
    }
  
};

const getAccount = async (data, _io, _socket) => {
    let resultUserID;
    let client;
    let login = false;
    
    try {
      client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
      const db = client.db(dbName);
      const collection = db.collection('account');
        await collection.find({}).toArray( async (err, docs) => {
          for (const doc of docs) {
            if (doc.mail == data.mail) {
              if (doc.password == data.password) {
                await _io.to(_socket.id).emit('getUserId', doc.userid);
              }
            }
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
  //    client.close();
    }
  
};

const transactionKururiDownload = async (data, res) => {
  let client;
  let login = false;
  try {
    client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
    const db = client.db(dbName);
    const collection = db.collection('account');
      await collection.find({}).toArray( (err, docs) => {
        for (const doc of docs) {
          if (doc.mail == data.mail) {
            if (doc.password == data.password) {
              login = true;
            //   data["tempid"] = Math.floor(Math.random() * 100000);
            //   room[data.roomid].roomid = data.roomid;
            //   loginUsers.push(data);
              res.sendFile(__dirname + "/index.html");
            }
          }
        }
        if (!login) {
            res.sendFile(__dirname + "/login.html");
        }
//        res.send(docs);
//        client.close();
      });
  } catch (error) {
    console.log(error);
  } finally {
//    client.close();
  }

//   try {
//     client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
//     const db = client.db(dbName);
//     const collection = db.collection('room');
//     await collection.deleteMany();
//   } catch (error) {
//     console.log(error);
//   } finally {
// //    client.close();
//   }

};

const transactionVoxelDownload = async (emitid, data, io, socketid, userid) => {
//   if (!room[loginUsers[loginUsers.length - 1].roomid].date) {
    let client;
    let login = false;
    try {
      client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
      const db = client.db(dbName);
      const collection = db.collection('room');
      const doc1 = await collection.findOne({roomid:data});

      const collection2 = db.collection('account');
      await collection2.find({}).toArray( (err, docs2) => {
        if (doc1.message && doc1.message.length > 0) {
            for (let i = 0; i < doc1.message.length; i += 1) {
                for (const doc2 of docs2) {
                    if (doc1.message[i].userid == doc2.userid) {
                        doc1.message[i].name = doc2.name;
                        doc1.message[i].color = doc2.color;
                        doc1.message[i].image = doc2.image;
                    }
                }
            }
            if (doc1) {
                io.to(socketid).emit(emitid, doc1);
            }
    
        }
      });




    //  console.log("roomid:" + loginUsers[loginUsers.length - 1].roomid);



//      const collection2 = db.collection('account');
//      await collection2.find({}).toArray( (err, docs) => {
//        for (const doc of docs) {
//          if (doc.userid == userid) {
//              login = true;
//             loginUsers[loginUsers.length - 1].socketid = socketid;
//             io.to(socketid).emit(emitid, {
//               userID: loginUsers[loginUsers.length - 1].tempid,
//               roomID: loginUsers[loginUsers.length - 1].roomid,
//               color: doc.color, age: doc.age, pref: doc.pref, image: doc.image, name: doc.name,
//               room: room[loginUsers[loginUsers.length - 1].roomid],
//             });
//          }
//        }
//        if (!login) {
//          res.send("login error");
//        }
// //        res.send(docs);
// //        client.close();
//      });




  //        client.close();
    } catch (error) {
      console.log(error);
    } finally {
  //    client.close();
    }
//   }


};



const transactionKururiInsert = async (data, res) => {
  let client;
  data = Object.assign(data, {date: new Date(Date.now() + ((new Date().getTimezoneOffset() + (18 * 60)) * 60 * 1000)) });

//   loginUsers.push(data);
  try {
    client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
    const db = client.db(dbName);
    const collection = db.collection('account');

    if (data.userid == null) {
        const dataid = await (await collection.find({}).toArray()).length;
        data = Object.assign(data, {userid: dataid});    
    }

    const a = await collection.updateOne({
//        age:data.age, pref:data.pref, color:data.color, image:data.image,
        userid:data.userid
//         mail:data.mail, password:data.password, name:data.name, date:data.date
        }, {$set:data}, true );
    if (a.result.n == 0) {
      await collection.insertOne(data);
    } else if (a.result.n >= 1) {
        console.log("result.n:" + a.result.n);
    } else {
        console.log("insert error account1");
    }

  } catch (error) {
    console.log(error);
  } finally {
    // client.close();
  }
};

const transactionVoxelInsert = async (data, res) => {
  let client;
//   data = Object.assign(data, {date: new Date() });
  try {
    client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
    const db = client.db(dbName);
    const collection = db.collection('room');
    const a = await collection.updateOne({
      roomid: data.roomid//, voxel: data.voxel, users: data.users, date:data.date
    }, {$set:data}, true );
    if (a.result.n == 0) {
      await collection.insertOne({roomid: data.roomid, message: data.message, voxel: data.voxel, users: data.users, date: data.date});
    } else {
      console.log("insert error");
    }
  } catch (error) {
    console.log(error);
  } finally {
    // client.close();
  }
};

const transactionMessageInsert = async (data) => {
    let client;
    // data = Object.assign(data, {date: new Date() });
    try {
      client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
      const db = client.db(dbName);
      const collection = db.collection('room');


      const doc = await collection.findOne({roomid:data.roomid});
      if (doc) {
          doc.message.push(data.message[0]);

          const a = await collection.updateOne({
            roomid: data.roomid//, voxel: data.voxel, users: data.users, date:data.date
          }, { $set: doc }, true );
          if (a.result.n == 0) {
            await collection.insertOne({roomid: data.roomid, message: doc.message});
          } else if (a.result.n >= 1) {
          } else {
            console.log("insert error1");
          }
      } else {
        const a = await collection.updateOne({
            roomid: data.roomid//, voxel: data.voxel, users: data.users, date:data.date
          }, { $set: data }, true );
          if (a.result.n == 0) {
            await collection.insertOne({roomid: data.roomid, message: data.message});
          } else {
            console.log("insert error2");
          }    
      }

      
    } catch (error) {
      console.log(error);
    } finally {
    //   client.close();
    }
  };
  






app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/download', (req, res) => {
  res.download(__dirname + "/server.js");
});
app.get('/', (req, res) => {

    transactionKururiDownload({mail: req.session.mail, password: req.session.password}, res);
    //   res.sendFile(__dirname + "/index.html");
});
app.get('/account', (req, res) => {
  res.sendFile(__dirname + "/account.html");
});
app.get('/images/profile.png', (req, res) => {
  res.sendFile(__dirname + "/images/profile.png");
});
    
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.get('/src/publicmain.js', (req, res) => {
    res.sendFile(__dirname + "/publicmain.js");
});
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/style.css");
});

app.post('/account', async (req, res) => {
    let client;
    let exist = false;
    try {
      client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
      const db = client.db(dbName);
      const collection = db.collection('account');
        await collection.find({}).toArray( (err, docs) => {
          for (const doc of docs) {
            if (doc.mail == req.session.mail){
                exist = true;
                let user = {userid:doc.userid, mail:doc.mail, password:doc.password};
                user["age"] = req.body.age;
                user["pref"] = req.body.pref;
                user["name"] = req.body.accountname;
                user["color"] = req.body.color;
                user["image"] = "images/profile.png";
            //  transactionKururiDownload(req.body, res);
                transactionKururiInsert(user, res);
            
                res.sendFile(__dirname + "/account.html");
            }
          }
  
         if (!exist) {
            res.sendFile(__dirname + "/signuperror.html");
          }
  
        
  
        });
    } catch (error) {
      console.log(error);
    } finally {
  //    client.close();
    }
  
  

});

app.post('/signup', async (req, res) => {
  let client;
  let exist = false;
  try {
    client = await MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser:true, useUnifiedTopology:true});
    const db = client.db(dbName);
    const collection = db.collection('account');
      await collection.find({}).toArray( (err, docs) => {
        for (const doc of docs) {
          if (doc.mail == req.body.mail){
            exist = true;
          }
        }

        let user = {userid: null};

        if (!exist && req.body.mail != "" && req.body.password != "") {
          user["mail"] = req.body.mail;
          user["password"] = req.body.password;
        //   user["name"] = user.mail.substr(0, user.mail.indexOf("@"));

          user["age"] = "";
          user["pref"] = "";
          user["name"] = "no name";
          user["color"] = "#" +
          getColor(Math.floor( Math.random() * 16 )) + "" +
          getColor(Math.floor( Math.random() * 16 )) + "" +
          getColor(Math.floor( Math.random() * 16 )) + "" +
          getColor(Math.floor( Math.random() * 16 )) + "" +
          getColor(Math.floor( Math.random() * 16 )) + "" +
          getColor(Math.floor( Math.random() * 16 ));
          user["image"] = "images/profile.png";

      //  transactionKururiDownload(req.body, res);
          transactionKururiInsert(user, res);
      
          res.sendFile(__dirname + "/signuped.html");
        } else {
          res.sendFile(__dirname + "/signuperror.html");
        }
      

      });
  } catch (error) {
    console.log(error);
  } finally {
//    client.close();
  }


});

app.get('/apiaccount', (req, res) => {
    getAccountJson({mail: req.session.mail, password: req.session.password}, res);
});

app.post('/', (req, res) => {
  let user = {
    mail:"", name:"", password:"", roomid:"", tempid:"", socketid:"",
    color: [
      Math.floor( Math.random() * 16 ),
      Math.floor( Math.random() * 16 ),
      Math.floor( Math.random() * 16 ),
      Math.floor( Math.random() * 16 ),
      Math.floor( Math.random() * 16 ),
      Math.floor( Math.random() * 16 ),
    ],
  };

  user["mail"] = req.body.mail;
  user["password"] = req.body.password;
//  user["name"] = user.mail.substr(0, user.mail.indexOf("@"));
//   user["roomid"] = req.body.select;

  req.session.mail = req.body.mail;
  req.session.password = req.body.password;


  transactionKururiDownload(user, res);

//   user["roomid"] = 0;
//   user["tempid"] = Math.floor(Math.random() * 100000);
//   room[0].roomid = user.roomid;
// //  loginUsers.push(data);

//   res.sendFile(__dirname + "/index.html");

});

const getAccountID = async (_io, _socket) => {
    await getAccount({mail:_socket.request.session.mail, password:_socket.request.session.password}, _io, _socket);
    // await _io.to(_socket.id).emit('getUserId', userAccountID);
};

io.on('connection', socket => {

//   let connected = false;
//   let index = 0;
//   for (const l of loginUsers) {
//     if (l.socketid == socket.id) {
//       connected = true;
//       break;
//     }
//     ++index;
//   }

//   if (connected) {

//     connectedAccount({mail:_socket.request.session.mail, password:_socket.request.session.password}, _io, _socket)
//   } else {
      getAccountID(io, socket);
//   }
  socket.on('getUserId', data => {
    transactionVoxelDownload('connected', 0, io, socket.id, data.userid);
  });
//   socket.on('selectRoom', data => {
//     loginUsers[loginUsers.length - 1].roomid = data;    
//     transactionVoxelDownload('selectRoom', data, io, socket.id);


//   });
//   socket.on('saveRoom', data => {
// //    room[data].date = new Date();
//     room[data].roomid = data;
//     transactionVoxelInsert(room[data]);
//   });

//   socket.on('loadRoom', data => {
//   });

//   socket.on('put', data => {
//     room[data.roomID].date = new Date();
//     room[data.roomID].voxel.push(data.voxel);
//     console.log(data.voxel);
//     io.emit('put', {
//         roomID: data.roomID,
//         userID: data.userID,
//         voxel: data.voxel,
//     });
//   });

//   socket.on('deleteVoxel', data => {
//     room[data.roomID].date = new Date();
//     room[data.roomID].voxel.splice(data.index, 1);
//     console.log(data.voxel);
//     io.emit('deleteVoxel', {
//         roomID: data.roomID,
//         userID: data.userID,
//         index: data.index,
//     });
//   });

//   socket.on('deleteAll', data => {
//     room[data.roomID].date = new Date();
//     room[data.roomID].voxel.length = 0;
//     room[data.roomID].voxel = [];
    
//     console.log("deleteAll");
//     io.emit('deleteAll', {
//         roomID: data.roomID,
//         userID: data.userID,
//     });
//   });

//   socket.on('updatePosition', data => {
//       users.set(socket.id, {
//           clientID: data.clientID,
//           position: data.position
//       });
//       io.emit('updatePosition', data);
//   });

  socket.on('sendMessage', data => {

    


    // room[data.roomID].message.push(data.message);
    const d = new Date(Date.now() + ((new Date().getTimezoneOffset() + (18 * 60)) * 60 * 1000));
    // room[data.roomID].date.push( d );
    // room[data.roomID].roomid = data.roomID;
    // console.log("roomID" + data.roomID);
    // console.log( room[data.roomID]);

    data.message[0].date = d;
    transactionMessageInsert(data);

    io.emit('recieveMessage', data);
  });
  // socket.on("disconnect",  () => {
  //     if (users.has(socket.id)) {
  //         io.emit('disconnected', users.get(socket.id).clientID);
  //         users.delete(socket.id);
  //         console.log('client disconnected:');
  //         console.log(Array.from(users.values()).reduce((acc, c) => {
  //             return acc + c.clientID + ', '
  //         }, '').slice(0, -2));
  //     }
  // });
});



http.listen(8080, () => {
  console.log('listening on :8080');
});