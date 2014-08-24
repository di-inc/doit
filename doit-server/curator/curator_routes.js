var controller = require('./curator_controller.js');

module.exports = exports = function(route){
  route.post('/addPlace', controller.isCurator, controller.addPlace);
  route.post('/addActivity', controller.isCurator, controller.addActivity);
  route.get('/places', controller.getPlaces);
  route.get('/placeCategories',controller.getPlaceCategories);
  route.get('/types', controller.getTypes);
};
