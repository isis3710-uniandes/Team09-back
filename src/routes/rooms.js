const express = require('express');
const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');

module.exports={
	getRooms: function(req, res){
		console.log("The rooms");
		return db.Rooms.findAll()
    		.then((rooms) => res.send(rooms))
    		.catch((err) => {
      		console.log('There was an error querying rooms', JSON.stringify(err))
      	return res.send(err)
    });
	},
	getRoom: function(req, res){
		console.log(req.params.roomid);
		let id=parseInt(req.params.roomid);
		return db.Rooms.findByPk(id)
    		.then((room) => res.send(room))
    		.catch((err) => {
      		console.log('There was an error querying the room', JSON.stringify(err))
      	return res.send(err)
    });
	},
	postRoom: function(req, res){
		return  db.sequelize.query('insert into rooms (name, groupId) values ("'+req.body.name+'", "'+req.body.groupId+'"); SELECT last_insert_rowid()' )
    		.then((room) => res.send(room))
    		.catch((err) => {
      	console.log('***There was an error creating a room', JSON.stringify(contact))
      return res.status(400).send(err)
    });
	},
	putRoom: function(req, res){
		console.log("Put Room "+req.params.roomid);
		const id = parseInt(req.params.roomid)
  		return db.Rooms.findByPk(id)
  			.then((room) => {
    			if(room!==null){
    				return room.update({ "name":req.body.name })
      			.then(() => res.send(room))
      			.catch((err) => {
        			console.log('***Error updating room', JSON.stringify(err))
        			res.status(400).send(err)
      				})}
      			else{
      		res.status(400).send("Object not found")
      	}
  	});
	},
	deleteRoom: function(req, res){
		console.log("Delete room "+ req.params.roomid);
		const id = parseInt(req.params.roomid)
  		return db.Rooms.findByPk(id)
    		.then((room) => room.destroy())
    		.then(() => res.send({ room }))
    			.catch((err) => {
      			console.log('***Error deleting room', JSON.stringify(err))
      		res.status(400).send(err)
    });
	},
  getCanvases: function(req,res){

      return db.sequelize.query("select * from canvases where roomId="+req.params.roomid, { type: db.sequelize.QueryTypes.SELECT})
        .then((canvas) => res.send(canvas))
        .catch((err) => {
          console.log('There was an error querying the users', JSON.stringify(err))
        res.status(400).send(err)
    // We don't need spread here, since only the results will be returned for select queries
    });
  },
  getMessages: function(req,res){

      return db.sequelize.query("select * from messages natural join chats where roomId="+req.params.roomid, { type: db.sequelize.QueryTypes.SELECT})
        .then((canvas) => res.send(canvas))
        .catch((err) => {
          console.log('There was an error querying the users', JSON.stringify(err))
        res.status(400).send(err)
    // We don't need spread here, since only the results will be returned for select queries
    });
  },
  getChats: function(req,res){

      return db.sequelize.query("select * from chats where roomId="+req.params.roomid, { type: db.sequelize.QueryTypes.SELECT})
        .then((chats) => res.send(chats))
        .catch((err) => {
          console.log('There was an error querying the chats', JSON.stringify(err))
        res.status(400).send(err)
    // We don't need spread here, since only the results will be returned for select queries
    });
  }
}