var controller = require('./user_controller.js');

module.exports = exports = function(route){
  route.post('/login', controller.login);
  route.post('/getPreviousActivities', controller.isUser, controller.getPreviousActivities);
  route.post('/addActivity', controller.isUser, controller.addActivity);
  route.post('/getNewActivities', controller.isUser, controller.getNewActivities);
  route.post('/updateActivityToCompleted', controller.isUser, controller.updateActivityToCompleted);
  route.post('/getCurrentActivities', controller.isUser, controller.getCurrentActivities);
  route.post('/addRating', controller.isUser, controller.addRating);
  route.get('/getAllActivities', controller.getAllActivities);
};
