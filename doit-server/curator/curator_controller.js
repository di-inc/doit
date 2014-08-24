var dbOps = require('../dbOperations/adminDB');

module.exports = exports = {
  isCurator : function(req,res,next){
    next();
  },
  addPlaceCategory : function(req,res){
    dbOps.addPlaceCategory(req.body.placeCategory, req.body.description, function(err,rows){
      if (err){
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }     
    });
  },
  addEvent : function(req, res){
    dbOps.addEvent(req.body.eventName, req.body.description, req.body.placeID, req.body.occursOnce, req.body.startDateTime,
                  req.body.endDateTime, req.body.openingTime, req.body.closingTime, req.body.cost, req.body.imgLink, req.body.activityIDs,
                  function(err,rows){
                           if (err){
                            console.log(err);
                            res.status(500).send(err);
                          }
                          else{
                            res.status(200).send(rows);
                          } 
                  })
  },
  addPlace : function(req, res){
    //check variables are good...
    dbOps.addPlace(req.body.locationID, req.body.placeName, req.body.address, req.body.description, req.body.imgLink, 
      req.body.latitude, req.body.longitude,
      function(err,rows){
        if (err){
          res.status(500).send(err);
        }
        else{
          res.status(200).send(rows);
        }
      });
  },
  addActivity : function(req,res){
    //the following line is long... contains all params from addActicity in dbOps, callback function on second line 
    dbOps.addActivity(req.body.activityName, req.body.description, req.body.uniquePlace, req.body.placeCategoryID, req.body.placeID, req.body.imgLink, req.body.status, req.body.participantsNeeded, req.body.occursOnce, req.body.startDateTime, req.body.endDateTime, req.body.openingTime, req.body.closingTime, req.body.minDuration, req.body.maxDuration, req.body.typeIDs,
      function(err,rows){
        if (err){
          res.status(500).send(err);
        }
        else{
          res.status(200).send(rows);
        }
      });
  },
  getPlaces : function(req,res){
    dbOps.getPlaces(function(err,rows){
      if (err){
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
  getPlaceCategories : function(req,res){
    dbOps.getPlaceCategories(function(err,rows){
      if (err){
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
  getTypes  : function(req,res){
    dbOps.getTypes(function(err,rows){
      if (err){
        res.status(500).send(err);
      }
      else{
        res.status(200).send(rows);
      }
    });
  },
};
