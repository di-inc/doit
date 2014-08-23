angular.module('doit.services', ['ionic'])

// .factory('LoginCheck', function(){
//   //check login and send user to login page if they are not logged in...
// })

.factory('ToDoLoader', function(serverRequest, $http){
  var toDoSpec = {};
  var loader = {};
  loader.myEvents = null;
  loader.loadToDoSpec = function(toDo){
    toDoSpec = toDo;
  };
  loader.getToDoSpec = function(){
    return toDoSpec;
  };

  loader.events = function(){
    var typeFormatter = function(toDo){
      if (toDo === 'adventurous') {
        return 1;
      } else if (toDo === 'rocking') {
        return 2;
      } else if (toDo === 'intense') {
        return 3;
      } else if (toDo === 'chill') {
        return 4;
      } else if (toDo === 'fun') {
        return 5;
      } else if (toDo === 'classic') {
        return 6;
      }
    };
    var userTime = function(time){
    // if (time === )
      if (time === 'now') {
        return 0;
      } else if (time === '30 minutes from now') {
        return 30;
      } else if (time === '1 hour from now') {
        return 60;
      } else if (time === 'in a few hours') {
        return 180;
      } else {
        return 'not a valid time';
      }
    };
    // change time formatter to server side logic
    var timeFormatter = function(time) {
      var date = new Date();
      var time = date.getTime() + (time * 60000);
      var updatedDate = new Date(time);
      return updatedDate;
    }; 
    // change durationConverter to server side logic
    var durationConverter = function(duration) {
        if (duration === '5 minutes') {
          return 1;
        } else if (duration === '15 minutes') {
          return 2;
        } else if (duration === '30 minutes') {
          return 3;
        } else if (duration === '1 hour') {
          return 4;
        } else if (duration === '1 - 3 hours') {
          return 5;
        } else if (duration === 'all day') {
          return 6;
        } else {
          return 'not a valid duration';
        }
    };

    var date = timeFormatter(userTime(loader.getToDoSpec()['time']));
    var type = typeFormatter(loader.getToDoSpec()['type']);
    var data = {
          userID: 1,
          locationID: 2,
          dateTimeToDo: date,
          typeID: type,
          duration: durationConverter(loader.getToDoSpec()['duration'])
    };

    serverRequest.post('user/getNewActivities', data).then(function(res){
      loader.myEvents = res;
      console.log(loader.myEvents);
    }) 
  };


  return loader;
})

.factory('DashOptions', function(){
  var options = {};
  //might want sliders for the time options so you can select between some times...
  options.timeOptions = function(){
    //maybe add in commented out times later... right now focus on 24 hour activities for mvp!
    var times = ['now', '30 minutes from now', '1 hour from now', 'in a few hours', 'tonight', ]; // 'tomorrow', 'this weekend', 'next weekend'];
    return times;
  };
  options.durationOptions = function(){
    var durations = ['5 minutes', '15 minutes', '30 minutes', '1 hour', '1 - 3 hours', 'all day'];
    return durations;
  };
  options.typeOptions = function(){
    var types = ['adventurous', 'rocking', 'intense', 'chill', 'fun', 'classic'];
    return types;
  };
  return options;
})

.factory('MyEvents', function(){
  var myEvents = {};
  myEvents.events = {
    'chill': {
      'jazz': {
        title: 'Jazz',
        img: 'http://www.jazzrochester.com/images/jazzwsax.jpg',
        events: [
        {
      title: 'Les Joulins Jazz Bistro',
      img:'http://www.jazzbistrosf.com/images/jazz_bistro_front03.png',
      where: 'Powell St',
      description:{
        date: '9pm August 23rd',
        location: 'Powell St.',
        describe: 'Jazz all night, never a cover charge!',
        }
      },
        {
      title: "Yoshi's San Francisco",
      img:'http://www.yoshis.com/userfiles/concerts/big/Yoshis.SF-logo.jpg',
      where: 'Fillmore St.',
      description:{
        date: '9:30pm August 23rd',
        location: 'Fillmore St.',
        describe: 'Great sushi, and good music.',
        }
      },
      {
      title: 'Keshia Cole',
      img:'http://cdn.singersroom.com/upload/2012/05/Keyshia-Cole-050212.jpg',
      where: 'FillMore Auditorium',
      description: {
        date: '8pm August 23rd',
        location: 'Fillmore Auditorium',
        describe: 'Keyshia Cole makes her first trip to SF in 3 years, join the fun!',
        }
      },
      {
        title: 'Miles Electric Band',
        img:'http://events.sfgate.com/images/internal/5/6/3/1/img_36811365_primary.jpg?resample_method=',
        where: 'SF Jazz Center',
        description:{
          date: '7pm August 23rd',
          location: 'SF Jazz Center',
          describe: 'Miles Electric Band will be performing!',
        }
      },
      {
        title: 'Cocktail Class',
        img:'https://dm8upoct4laqm.cloudfront.net/thumbs/9b/e6/9be6ec4e4158812849b1d1c19ff31ae9.jpg',
        where: 'Bergerac Bar',
        description:{
          date: '5:00pm August 23rd',
          location: 'Bergerac Bar',
          describe: 'Miles Electric Band will be performing!',
        }
      },
      {
      title: '20th St. Block Party',
        img:'https://dm8upoct4laqm.cloudfront.net/thumbs/c2/7f/c27f0d3ea8ba787287e9378d295725ea.jpg',
        where: 'Mission',
        description:{
          date: '6pm - 9pm August 23rd',
          location: 'Mission',
          describe: 'Take a trip to Baker Beach and enjoy the sun and waves!',
        }
      },
      {
        title: 'Organic Bees Wax Making Class',
        img:'http://www.sfstation.com/images/ev/51/2022851a_tn220x220.jpg',
        where: '1748 Clement St.',
        description:{
          date: '6:30pm - 840pm August 23rd',
          location: '1748 Clement St.',
          describe: 'Ever wonder how to make bees wax? Go and join other bee enthusiasts and learn!',
          }
      },
      {
        title: 'Jazz Ensemble',
        img:'http://www.countbasietheatre.org/images/cms/jazzFINAL.jpg',
        where: 'Marina',
        description:{
          date: '6:30pm - 840pm August 23rd',
          location: '1748 Clement St.',
          describe: 'Ever wonder how to make bees wax? Go and join other bee enthusiasts and learn!',
          }
      },
        ]
      }
    },
  };


  return myEvents;


})

.factory('RecentEvents', function(){
  var toDoSpec = {};
  var recentEvents = {};
  recentEvents.loadToDoSpec = function(toDo){
    toDoSpec = toDo;
  };
  recentEvents.getToDoSpec = function(){
    return toDoSpec;
  };

  recentEvents.events = [
    {
      title: 'Surfing in the Sunset',
      img:'http://www.personalluxuryresortsandhotels.com/i/SITE_120910_12161610_5R1BV/content/CMS_121005_16245907_J2FB7/7F45873D-188B-3B72-2E7EA991C83EDA3E.JPG',
      where: 'San Francisco',
      description:{
        date: '12pm-3pm August 22nd',
        location: 'Baker Beach',
        describe: 'Take a trip to Baker Beach and enjoy the sun and waves!',
        average: '4.5'
      }
    },
    {
      title: 'Kayaking',
      img: 'http://www.adventurestateparks.com/!images/rotator/asp_adventure_mp_mainimage_01b.jpg',
      where: 'San Francisco',
      description: {
        date: '11am-2pm August 18th',
        location: 'The Bay',
        describe: 'Kayaking in the bay is easy! Go to Joes Crab Shack, rent a couple of boats and get your Kayak on!',
        average: '3.8'
      },
    },
    {
      title: 'B.B. King Concert', img:'http://www2.sk-static.com/images/media/profile_images/artists/14318/col2', where: 'San Francisco',  
      description: {
        date: '9pm-12am August 14th',
        location: 'Downtown SF',
        describe: 'B.B Kings first concert in over 3 years. Join the fun!',
        average: '4.9',
      }
    },
    {
      title: 'Coffee at Coffee Bean',
      img:'http://theselby.com/media/2_28_11_SupremeCoffee7598.jpg',
      where: 'Market St.',
      description:{
        date: '11am-12pm August 14th',
        location: 'San Francisco',
        describe: 'Go a pick-me-up at the Coffee Bean, there may be a coupon there in the future :)',
        average: '2.7'
      }
    },
    {
      title: 'Bowling',
      img: 'http://homesoftherich.net/wp-content/uploads/2010/09/residential-bowling-alley_12.jpg',
      where: 'The Sunset District',
      description: {
        date: '5pm-8pm August 13th',
        location: 'The Bay',
        describe: 'Kayaking in the bay is easy! Go to Joes Crab Shack, rent a couple of boats and get your Kayak on!',
        average: '3.5'
      },
    },
    {
      title: 'Salsa By The Bay', 
      img:'http://www.dancesf.com/dancing/albany-salsa-dance.jpg', where: 'San Francisco',  
      description: {
        date: '7pm-10pm August 11th',
        location: 'Pier 27',
        describe: 'Bring out your wild side at Salsa By The Bay! Learn to dance with many singles.',
        average: '5'
      }
    },
    {
      title: 'Jog',
      img:'http://bestjoggingstrollerhub.com/wp-content/uploads/2013/09/jogging.jpg',
      where: 'The Panhandle',
      description:{
        date: '8am-9am August 10nd',
        location: 'Panhandle',
        describe: 'Take a run in the Panhandle like 100s of other SF dwellers!',
        average: '2.7'
      }
    },

  ];


    return recentEvents;
})

.factory('serverRequest', function($http, $state){
  var requestObject = {};

  requestObject.get = function(route, params){
    return $http({
            method: 'GET',
            url: 'http://do-it-server.cloudapp.net/',
            params: params

            })
          .success(function(data, status, headers, config){
            console.log(data);
           })
          .error(function(data, status, headers, config){
            console.log(data);
          });
  };

  requestObject.post = function(route, data){
    return $http.post('http://do-it-server.cloudapp.net/' + route, data)
           .then(function(res){
             return res.data;
            });
  };

  return requestObject;
});

