//const express = require('express');
//const app = express();
const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');

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
		return db.sequelize.query('insert into groups (name) values ("'+req.body.name+'"); SELECT last_insert_rowid()' )
			.then((group) => res.send(group))
    		.catch((err) => {
      	console.log('***There was an error creating a group')
      return res.status(400).send(err)
    });
	},
	postAdmin: function(req, res){
		return db.sequelize.query(`insert into usersInGroups (groupId, userId, isAdmin) values ("${req.body.groupId}","${req.body.userId}",true); select last_insert_rowid()`)
    		.then((user) => res.send(user))
    		.catch((err) => {
      	console.log('***There was an error giving admin priviledges to user')
      return res.status(400).send(err)
    });
	},
	postUser: function(req, res){
		console.log("going!!!!")
		return db.UsersInGroups.create({ "groupId":req.body.groupId, "userId":req.body.userId, "isAdmin": false })
				.then((user) => {console.log(user); res.send(user)})
    		.catch((err) => {
      	console.log('***There was an error adding user to group' + err)
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
	},
	getUsers: function(req,res){

      return db.sequelize.query("select userId,  username, email, isAdmin from 'usersInGroups' natural join users where groupId="+req.params.groupid, { type: db.sequelize.QueryTypes.SELECT})
        .then((users) => res.send(users))
        .catch((err) => {
          console.log('There was an error querying the users', JSON.stringify(err))
        res.status(400).send(err)
    // We don't need spread here, since only the results will be returned for select queries
    });
  },
  	getRooms: function(req,res){

      return db.sequelize.query("select * from rooms where groupId="+req.params.groupid, { type: db.sequelize.QueryTypes.SELECT})
        .then((rooms) => res.send(rooms))
        .catch((err) => {
          console.log('There was an error querying the users', JSON.stringify(err))
        res.status(400).send(err)
    // We don't need spread here, since only the results will be returned for select queries
    });
	},

	getGroupsFromUser: function(req,res){

		return db.sequelize.query("select usersInGroups.groupId, groups.name from 'usersInGroups', 'groups' where usersInGroups.userID="+req.params.userid +" and usersInGroups.groupId = groups.id", { type: db.sequelize.QueryTypes.SELECT})
			.then((groups) => res.send(groups))
			.catch((err) => {
				console.log('There was an error querying the groups', JSON.stringify(err))
			res.status(400).send(err)
	// We don't need spread here, since only the results will be returned for select queries
	});
}

}