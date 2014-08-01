angular.module('doit.services', [])

// .factory('LoginCheck', function(){
//   //check login and send user to login page if they are not logged in...
// })

.factory('ToDoLoader', function(){
  var toDoSpec = {};
  var loader = {};
  loader.loadToDoSpec = function(toDo){
    toDoSpec = toDo;
  };
  loader.getToDoSpec = function(){
    return toDoSpec;
  };
  return loader;
})

.factory('Friends', function(){
  
  var friends = [
      {
      name: 'Thomas',
      img:'http://upload.wikimedia.org/wikipedia/commons/9/92/George_Clooney-4_The_Men_Who_Stare_at_Goats_TIFF09_(cropped).jpg'},
      {
      name: 'Kad',
      img:'http://weadiamedia.com/wp-content/uploads/2014/04/george-clooney-1.jpg'},
      {
      name: 'Suzanne',
      img: 'http://images.boomsbeat.com/data/images/full/51818/clooney_george-jpg.jpg'},
      {
      name: "Leon",
      img:'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/7/1391786293758/George-Clooney---Save-the-012.jpg'},
  ];

  return friends;

})

.factory('DashOptions', function(){
  var options = {};
  options.timeOptions = function(){
    var times = ['now', '30 minutes from now', '1 hour from now', 'tonight', 'tomorrow', 'this weekend', 'next weekend'];
    return times;
  };
  options.durationOptions = function(){
    var durations = ['5 minutes', '15 minutes', '30 minutes', '1 hour', '1 - 3 hours', 'all day', 'multiple days'];
    return durations;
  };
  options.typeOptions = function(){
    var types = ['adventurous', 'rocking', 'intense', 'chill', 'fun', 'classic'];
    return types;
  };
  return options;
});

