// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('doit', ['ionic', 'doit.controllers', 'doit.services', 'ionic.contrib.ui.cards', 'ionic.rating', 'angular-velocity', 'ngAnimate'])

.run(function($ionicPlatform, ToDoLoader, $rootScope, serverRequest, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    // seen other people put each route config into thecontroller files.
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/tab-profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('served-events', {
      url: '/served-events',
      templateUrl: 'templates/served-events.html',
      controller: 'ServedCtrl',
    })

    .state('activities', {
      url: '/activity/:id',
      templateUrl: 'templates/activities.html',
      controller: 'ActivitiesCtrl'
    })

    .state('activitiesMap', {
      url: '/map',
      templateUrl: 'templates/mapLoader.html',
      controller: 'MapsCtrl'
    })

    .state('activitylist', {
      url: '/activitylist/:id',
      templateUrl: 'templates/activityList.html',
      controller: 'ActivityListCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

