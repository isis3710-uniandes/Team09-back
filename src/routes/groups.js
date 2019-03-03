//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');
//const uig = require('../../models/usersInGroups');

module.exports={
	getGroups: function(req, res){
		console.log("The groups");
		return db.Groups.findAll()
    		.then((groups) => res.send(groups))
    		.catch((err) => {
      			console.log('There was an error querying groups', JSON.stringify(err))
				  return res.send(err)
			});
	},
	getGroup: function(req, res){
		console.log(req.params.groupid);
		let id=parseInt(req.params.groupid);
		return db.Groups.findByPk(id)
    		.then((group) => res.send(group))
    		.catch((err) => {
      		console.log('There was an error querying the group', JSON.stringify(err))
      	return res.send(err)
    });
	},
	postGroup: function(req, res){
		return db.Groups.create({ "name": req.body.name })
			.then((group) => res.send(group))
    		.catch((err) => {
      	console.log('***There was an error creating a group', JSON.stringify(contact))
      return res.status(400).send(err)
    });
	},
	postAdmin: function(req, res){
		return db.UsersInGroups.create({ "groupId":req.params.groupId, "userId":req.params.id, "isAdmin": true })
    		.then((user) => res.send(user))
    		.catch((err) => {
      	console.log('***There was an error giving admin priviledges to user', JSON.stringify(contact))
      return res.status(400).send(err)
    });
	},
	postUser: function(req, res){
		return db.UsersInGroups.create({ "groupId":req.params.groupId, "userId":req.params.id, "isAdmin": false })
    		.then((user) => res.send(user))
    		.catch((err) => {
      	console.log('***There was an error adding user to group', JSON.stringify(contact))
	  return res.status(400).send(err)
	});
	},
	deleteGroup: function(req, res){
		console.log("Delete group "+ req.params.groupid);
		const id = parseInt(req.params.groupid)
  		return db.Groups.findByPk(id)
    		.then((group) => group.destroy())
    		.then(() => res.send({ group }))
    			.catch((err) => {
      			console.log('***Error deleting group', JSON.stringify(err))
      		res.status(400).send(err)
    });
	}
}