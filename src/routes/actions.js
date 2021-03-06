const db = require(__dirname.slice(0,__dirname.length-11)+'/models/');
const datify = require('../datify.js');

const fs = require('fs');

module.exports={
	getActions: function(req, res){
		console.log("The actions");
		return db.Actions.findAll()
    		.then((actions) => res.send(actions))
    		.catch((err) => {
      		console.log('There was an error querying actions', JSON.stringify(err))
      	return res.send(err)
    });
	},
	getAction: function(req, res){
		console.log(req.params.svgPath);
		let id=parseInt(req.params.svgPath);
		return  db.sequelize.query('select svgPath from actions where canvasId='+id )
    		.then((action) =>{
				var ob={};
				console.log(action);
				console.log(action[0][0]);
					fs.readFile(action[0][0].svgPath, 'utf-8',(errorL,data)=>{
						if(errorL){
							console.log(errorL);
						}
						ob = {"svg":data};
						res.send(ob);
					})
			})
    		.catch((err) => {
      		console.log('There was an error querying the action', JSON.stringify(err))
      	return res.send(err)
    });
	},
	postAction: function(req, res){
		console.log("Post action");
		return db.Actions.create({"userId":req.body.userId, "canvasId":req.body.canvasId, "svgPath":req.body.svgPath, "time":datify.getDate(), "sessionId":req.body.sessionId })
    		.then((action) => res.send(action))
    		.catch((err) => {
      	console.log('***There was an error creating an action', JSON.stringify(err))
      return res.status(400).send(err)
    });
	},
	putAction: function(req, res){
		console.log("Post action");
		var svgPath = `data/svgs/canvas_${req.body.canvasId}.svg`;
		fs.writeFile(svgPath,req.body.svgPath,(err)=>{
			if(err){
				console.log(err);
				throw err;
			}
			console.log("Successful save of information on "+svgPath);
		});
	},
	deleteAction: function(req, res){
		console.log("Delete action "+ req.params.actionid);
		const id = parseInt(req.params.actionid)
  		return db.Actions.findByPk(id)
    		.then((action) => action.destroy())
    		.then(() => res.send( action ))
    			.catch((err) => {
      			console.log('***Error deleting action', JSON.stringify(err))
      		res.status(400).send(err)
    });
	}
}