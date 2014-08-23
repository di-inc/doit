angular.module('doit.controllers', [])

.controller('DashCtrl', function($scope, $state, DashOptions, ToDoLoader, serverRequest, $rootScope) {

  $scope.timeOptions = DashOptions.timeOptions();
  $scope.durationOptions = DashOptions.durationOptions();
  $scope.typeOptions = DashOptions.typeOptions();
  $scope.toDo = ToDoLoader.getToDoSpec();
  //three buttons for time, duration, and type
  //each opens up a modal with options from scope array

  $scope.sendToDo = function(){
    ToDoLoader.events();
    $state.go('served-events');
  };
})


.controller('EventsCtrl', function($scope, $state, ToDoLoader, $http) {
  $scope.toDo = ToDoLoader.events;
  $scope.profile = function(){
    $state.go('tab.profile');
  };
})


.controller('LoginCtrl', function($scope, $state, $http){
  $scope.login = function(){
    oauth.login();
    setTimeout(function(){ 
    $state.go('tab.profile');
    }, 10000)
  };

})

.controller('ProfileCtrl', function($scope, $state, ToDoLoader, RecentEvents, $rootScope) {
  $scope.rate = 0;
  $scope.max = 5;
  $scope.user = {
    name: 'Albrey Brown',
    location: 'SF',
    personality: 'Adventurous',
    img:'https://yy1.staticflickr.com/179/404202272_e124e56ad3_z.jpg'
  };

  $scope.myEvents = RecentEvents.events;
  

  $scope.events = function(){
    $state.go('tab.events');
  };
  
})

.controller('ServedCtrl', function($scope, $state, ToDoLoader, $ionicModal, RecentEvents, MyEvents){
  $scope.toDo = MyEvents.events['chill']['jazz']['events'];
  $scope.recentEvents = RecentEvents.events;
  $scope.events = ToDoLoader.getToDoSpec();
  $scope.activityList = function(){
    $state.go('tab.dash');
  };
})


.controller('ActivityListCtrl', function($scope, $state, ToDoLoader, $ionicModal, RecentEvents, MyEvents, $stateParams){
  $scope.activity = MyEvents.events['chill']['jazz']['events'][$stateParams.id];
  $scope.served = function(){
    console.log($stateParams);
    $state.go('served-events');
  };

  $scope.doit = function(){
    $scope.activity.description.date = "9pm-12am August 23rd";
    RecentEvents.events.unshift($scope.activity);
    // $state.go('profile');
  }
})


.controller('ActivitiesCtrl', function($scope, $stateParams, $state, ToDoLoader, RecentEvents, $ionicModal){
  $scope.max = 5;
  $scope.rate = 3;
   $scope.profile = function(){
    $state.go('tab.profile');
  };
  $scope.activity = RecentEvents.events[$stateParams.id];

  $ionicModal.fromTemplateUrl('../templates/modal.html', {
      
    animation: 'slide-in-up',
    scope: $scope,

  }).then(function(modal){
    $scope.modal = modal;
    
    $scope.createEvent = function(){
      $scope.modal.hide();
    };
  });

  $scope.openModal = function(){
    $scope.modal.show();
  };
})




// .controller('MapsCtrl', function($scope){
//   $scope.map = {
//     center: {
//       latitude: 45,
//       longitude: -73
//     },

//     zoom: 8
//   };
// })