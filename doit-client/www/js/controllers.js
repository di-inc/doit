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
    setTimeout(function(){
    $state.go('activitylist');
    }, 1000);
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
    // oauth.login();
    $state.go('tab.profile');
  };

})

.controller('ProfileCtrl', function($scope, $state, ToDoLoader, RecentEvents, $rootScope) {
  $scope.rate = 0;
  $scope.max = 5;
  $scope.user = {
    name: 'Albrey Brown',
    location: 'SF',
    personality: 'Adventurous',
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
  $scope.goToDash = function(){
    $state.go('activitylist');
  };
  $ionicModal.fromTemplateUrl('../templates/modal.html', {
      
        animation: 'slide-in-up',
        scope: $scope,

  }).then(function(modal){
    $scope.modal = modal;
    
    $scope.createEvent = function(){
      serverRequest.post('user/addActivity', {
      userID: 1,
      tokenID: 2,
      activityID: 3,
      startDateTime: new Date(),
      duration: 4,
      placeID: null,
      })
      .success(function(data, status){
        console.log('activity has been added');
        $state.go('tab.profile');
      });


      $scope.modal.hide();
    };
  });

  $scope.openModal = function(index){
    $scope.event = $scope.toDo[index];
    $scope.modal.show();
  };
})


.controller('ActivityListCtrl', function($scope, $state, ToDoLoader, $ionicModal, RecentEvents, MyEvents){
  $scope.toDo = MyEvents.events['chill'];
  $scope.recentEvents = RecentEvents.events;
  $scope.events = ToDoLoader.getToDoSpec();
  $scope.goToDash = function(){
    $state.go('tab.dash');
  };

  // $ionicModal.fromTemplateUrl('../templates/modal.html', {
      
  //       animation: 'slide-in-up',
  //       scope: $scope,

  // }).then(function(modal){
  //   $scope.modal = modal;
    
  //   $scope.createEvent = function(){
  //     serverRequest.post('user/addActivity', {
  //     userID: 1,
  //     tokenID: 2,
  //     activityID: 3,
  //     startDateTime: new Date(),
  //     duration: 4,
  //     placeID: null,
  //     })
  //     .success(function(data, status){
  //       console.log('activity has been added');
  //       $state.go('tab.profile');
  //     });


  //     $scope.modal.hide();
  //   };
  // })
})


.controller('ActivitiesCtrl', function($scope, $stateParams, $state, ToDoLoader, RecentEvents){
  $scope.max = 5;
   $scope.profile = function(){
    $state.go('tab.profile');
  };
  $scope.activity = RecentEvents.events[$stateParams.id];
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