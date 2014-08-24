var dbOps = require('../dbOperations/adminDB');



module.exports = exports = {
  isUser : function(req,res,next){
    //TODO ** check that userID given in req is legit
    next();
  },
  login : function(req,res){
    // dbOps.checkUserExists(err,row){
    //   if
    // }
  },
  getEventsFromActivityID : function(req,res){
    dbOps.getEventsFromActivityID(req.body.locationID, req.body.activityID, req.body.dateTimeToDo,
                                  function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    })
  },
  getAllActivities : function(req, res){
    dbOps.getAllActivities(function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
  getCurrentActivities : function(req, res){
    //do check on request to make sure its good

    //send request to adminDB function and then send the resposne back to client
    dbOps.getUserCurrent(req.body.userID, function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });

  },
  getPreviousActivities : function(req, res){
    //do check on request to make sure its good

    //send request to adminDB function 
    //check that their dateTime hasn't expired
    //and then send the resposne back to client
    dbOps.getUserPrevious(req.body.userID, function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
  addRating : function(req,res){
    //do check on request to make sure its good

    dbOps.addRatingToActivity(req.body.userID, req.body.userActivityID, req.body.rating, function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
  addActivity : function(req,res){
    //TODO ** do check on request to make sure its good

    //send request to adminDB function and then confirm to client that activity has been added...
    dbOps.setUserCurrent(req.body.userID, req.body.activityID, req.body.startDateTime,req.body.duration,
     req.body.placeID, function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
  getNewActivities : function(req,res){
    //TODO ** do check on request to make sure its good


    //send request to adminDB function and then send response back to client
    dbOps.getUserActivities(req.body.userID, req.body.locationID, req.body.whenStart, 
      req.body.duration, req.body.typeID, req.body.dateTimeToDo, req.body.timeToDo,
      function(err,rows){
      if(err){
        console.log(err);
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
  updateActivityToCompleted : function(req,res){
    //TODO ** do check on request to make sure its good

    //send request to adminDB function and then send response back to client
    dbOps.updateActivityToCompleted(req.body.userID, req.body.userActivityID, req.body.endTime, 
      function(err,rows){
        if(err){
          console.log(err);
          res.status(500).send(err);
        }
        else{
          res.status(200).send(rows);
        }
      });
  },
};
