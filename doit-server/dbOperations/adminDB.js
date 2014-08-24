var doit_pass = require('./dbCredentials').password;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'doit',
    password : doit_pass,
});
// uncomment the following when password is correctly SET...
 // connection.connect();

module.exports = exports = {

  getAllActivities : function(callback){
    var sql = 'SELECT * FROM activities';
    connection.query(sql, function(err,rows){
      if (err){
        callback(err);
      }
      else{
        callback(null,rows);
      }
    });
  },
  addEvent : function(eventName, description, placeID, occursOnce, startDateTime, endDateTime,
                      openingTime, closingTime, cost, imgLink, activityIDs, callback){
    var sql = 'INSERT into events (eventName, description, placeID, occursOnce \
               startDateTime, endDateTime, openingTime, closingTime, cost, imgLink) \
               VALUES (?,?,?,?,?,?,?,?,?,?);';
    connection.query(sql, [eventName,description, placeID, occursOnce, startDateTime, endDateTime,
                    openingTime, closingTime, cost, imgLink], function(err,rows){
      if (err){
        callback(err);
      }
      else{
        if (activityID){
          setTimeout(function(){exports.addEventToActivity(activityIDs, rows.insertId, callback)},200);
        }
        else{
          callback(null, rows);
        }
      }
    });           
  },
  addEventsToActivity : function(activityIDs, eventID, callback){
    if (!Array.isArray(activityIDs)){
      activityIDS = [activityIDs];
    }
    var arr = [];
    for (var i = 0; i < activityIds.length; i++){
      arr.push([activityIds[i], eventID])
    }
    var sql = 'INSERT into activity_events_join (activityID, eventID) VALUES (?,?);';
    connection.query(sql, arr, function(err,rows){
      if (err){
        console.log(err);
        callback(err);
      }
      else{
        callback(null, err);
      }
    });
  },

  addActivity : function(activityName, description, uniquePlace, 
                       placeCategoryID, placeID, imgLink, status, 
                       participantsNeeded, occursOnce, startDateTime, 
                       endDateTime, openingTime, closingTime, minDuration, 
                       maxDuration, typeIDs, callback){
    var sql = 'INSERT into activities (activityName, description, \
              uniquePlace, placeCategoryID, placeID, imgLink, status, \
              participantsNeeded, occursOnce, startDateTime, endDateTime, openingTime, \
              closingTime, minDuration, maxDuration) \
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    connection.query(sql, [activityName, description, uniquePlace, placeCategoryID, placeID, imgLink, status, 
                           participantsNeeded, occursOnce, startDateTime,  endDateTime, openingTime,
                           closingTime, minDuration, maxDuration],
    function(err,rows){
      if (err){
        callback(err);
      }
      else{
        console.log('fooo', rows.insertId, typeID);
        setTimeout(function(){exports.addTypeToActivities(rows.insertId, typeIDs, callback)},200);
      }
    });
  },
  addPlace : function(locationID, placeName, address, description, imgLink, latitude, longitude, callback){
    var sql = 'INSERT into places (locationID, placeName, address, description, imgLink) \
               VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [locationID, placeName, address, description, imgLink, latitude, longitude], function(err,res){
      if(err){  
        callback(err);
      }
      else{
        callback(null, res);
      }
    });
  },
  getPlaces : function(callback){
    var sql = 'SELECT id AS placeID, placeName, description as placeDescription, address, \
               imgLink as placeImgLink, latitude, longitude FROM places';
    connection.query(sql, function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }
    });
  },
  getActivities : function(callback){
    var sql = 'SELECT id AS activityID, activityName, description, imgLink FROM activities';
    connection.query(sql, function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }
    });
  },
  getTypes : function(callback){
    var sql = 'SELECT id, type FROM activity_types';
    connection.query(sql, function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }
    });    
  },
  addActivityTypes : function(type, callback){
    var sql = 'INSERT into activity_types (type) VALUES (?)';
    connection.query(sql, [type], function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }
    });
  },
  addTypeToActivities : function(activityID, typeIDs, callback){
    if (!Array.isArray(typeIDs)){
      typeIDs = [typeIDs];
    }
    var arr = [];
    for (var i = 0; i < typeIds.length; i++){
      arr.push([activityID, typeIDs[i], activityID, typeIds[i]]);
    }
    var sql = 'INSERT INTO activity_types_join (activityID, activityTypeID) \
              SELECT * FROM (SELECT ?, ?) AS tmp \
              WHERE NOT EXISTS ( \
                SELECT activityID, activityTypeID FROM activity_types_join \
                WHERE activityID = ? AND activityTypeID = ?) LIMIT 1;'
    connection.query(sql, arr, function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }  
    });
  },
  getEventsFromActivityID : function(locationID, activityID, dateTimeToDo, callback){
    var sql ='SELECT e.id AS eventID, e.eventName, e.description AS eventDescription, e.imgLink AS eventImage, \
              e.startDateTime, e.endDateTime, e.openingTime, e.closingTime, \
              p.placeName, p.address, p.description AS placeDescription, p.imgLink AS placeImage, \
              p.latitude, p.longitude \
              FROM \
              events AS e \
              LEFT JOIN places AS p \
              ON e.placeID = p.id \
              inner join activity_events_join AS ae \
              ON ae.activityID = ? \
              WHERE (e.startDateTime is NULL OR e.startDateTime >= CAST(? AS dateTime)) \
              AND (e.endDateTime is NULL OR e.endDateTime <= CAST(? AS dateTime)) \
              AND ((e.openingTime is NULL AND e.closingTime is NULL) \
                      OR (e.openingTime <= CAST(? AS time) AND e.closingTime >= CAST(? AS time)) \
                      OR (e.openingTime >= CAST(? AS time) AND e.closingTime <= CAST(? AS time)) \
              group by e.id';
    connection.query(sql, [activityID, dateTimeToDo, dateTimeToDo, dateTimeToDo, dateTimeToDo,
                      dateTimeToDo, dateTimeToDo], function(err, rows){
                        if (err){
                          callback(err);
                        }
                        else{
                          callback(null,rows);
                        }
                      });
  },
  //need to set up location for laters....
  getUserActivities : function(userID, locationID, whenStart, duration, typeID, dateTimeToDo, timeToDo, callback){
    var sql = 'SELECT a.id AS activityID, a.activityName, a.description AS activityDescription, a.imgLink AS activityImage, \
               a.startDateTime, a.endDateTime, a.openingTime, a.closingTime, \
              p.placeName, p.address, p.description AS placeDescription, p.imgLink AS placeImage \
              FROM \
              activities AS a \
              left Join places AS p \
              ON a.placeID = p.id \
              inner join activity_types_join AS a_t \
              ON a_t.activitytypeID = ? AND a.id = a_t.activityID \
              where a.minDuration <= ? AND a.maxDuration >= ?  \
              AND (a.startDateTime is NULL OR a.startDateTime >= CAST(? AS dateTime)) \
              AND (a.endDateTime is NULL OR a.endDateTime <= CAST(? AS dateTime)) \
              AND (a.openingTime is NULL OR a.openingTime <= CAST(? AS Time)) \
              AND (a.closingTime is NULL OR a.closingTime >= CAST(? AS Time)) \
              group by a.id \
              limit 10';
    connection.query(sql, [typeID, duration, duration, dateTimeToDo, dateTimeToDo, dateTimeToDo, dateTimeToDo], function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }
    });
  },

  setUserCurrent : function(userID, activityID, startDateTime,duration, placeID,callback){
    var sql = 'INSERT into user_activities (status, userID, activityID, startDateTime, duration, placeID) \
              VALUES (?, ?,?,?,?,?)';
    connection.query(sql, ['inprogress', userID,activityID,startDateTime,duration,placeID], function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }
    });
  },

  getUserCurrent : function(userID, callback){
    var sql = 'SELECT ua.id AS userActivityID, ua.startDateTime, ua.duration, a.id AS activityID, a.activityName, a.description AS activityDescription, a.imgLink AS activityImage, \
              p.placeName, p.address, p.description AS placeDescription, p.imgLink AS placeImage \
              FROM \
              user_activities AS ua \
              inner join activities AS a ON a.id = ua.activityID \
              left join places AS p ON p.id = ua.placeID \
              where ua.userID = ? AND ua.status = ?';
    connection.query(sql, [userID, 'inprogress'], function(err, res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }
    });
  },
  //could add comments OR rating here....
  updateActivityToCompleted : function(userID, userActivityID, endTime, callback){
    var sql = 'UPDATE user_activities SET endTime=?, status=? where id=? AND userID=?'
    connection.query(sql, [endTime, 'completed', userActivityID, userID], function(err,res){
      if (err){
        callback(err);
      }
      else{
        callback(null, res);
      }      
    });
  },
  getPlaceCategories : function(callback){
    var sql = 'SELECT id AS placeCategoryID, placeCategory, description FROM place_categories';
    connection.query(sql, function(err,rows){
      if (err){
        callback(err);
      }
      else{
        callback(null, rows);
      }
    });
  },
  getUserPrevious : function(userID, callback){
    var sql = 'SELECT ua.id AS userActivityID, ua.startDateTime, ua.duration, ua.endDateTime, a.id AS activityID, a.activityName, a.description AS activityDescription, a.imgLink AS activityImage, \
              p.placeName, p.address, p.description AS placeDescription, p.imgLink AS placeImage \
              FROM \
              user_activities AS ua \
              INNER JOIN activities AS a ON a.id = ua.activityID \
              left join places AS p ON p.id = ua.placeID \
              where ua.userID = ? AND ua.status = ?';
    connection.query(sql, [userID, 'completed'], function(err, rows){
      if (err){
        callback(err);
      }
      else{
        callback(null, rows);
      }
    });
  },



};
