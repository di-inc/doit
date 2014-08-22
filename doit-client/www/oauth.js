var oauth = (function() {
    // courtesy of Paul Yi (www.github.com/paulyi326)
    var FB_LOGIN_URL = 'https://www.facebook.com/dialog/oauth';
    var FB_LOGOUT_URL = 'https://www.facebook.com/logout.php';

    var tokenStore = window.sessionStorage;
    var appId = 270758579793905; // this is considered public knowledge

    var loginCallback;
    var loginProcessed;
    var runningInCordova;

    document.addEventListener('deviceready', function() {
        runningInCordova = true;
    }, false);

    var oauthRedirectURL = 'http://localhost:8100/oauthcallback.html';

    var isLoggedIn = function() {
        return tokenStore.getItem('access_token') !== null;
    };

    var login = function(callback) {
        if (!appId) {
            callback({status: 'unkonwn', error: 'appId not set'});
        }
        var loginWindow;
        var startTime;

        var loginWindowLoadHandler = function(event) {
            var url = event.url;
            console.log('im running in cordova, im in loginWindowHandler, here is url', url);
            if (url.indexOf('access_token') !== -1) {
                var timeout = 600 - (new Date().getTime() - startTime);
                setTimeout(function () {
                  loginWindow.close();
                }, timeout > 0 ? timeout : 0);
                oauthCallback(url);
            } else if (url.indexOf('error') !== -1) {
                console.log('there is an error')
            }
        };

        var loginWindowExitHandler = function() {
            loginWindow.removeEventListener('loadstart', loginWindowLoadHandler);
            loginWindow.removeEventListener('exit', loginWindowExitHandler);
            loginWindow = null;
            console.log('removed listeners and login window');
        };

        loginCallback = callback;
        loginProcessed = false;

        if (runningInCordova) {
          oauthRedirectURL = 'https://www.facebook.com/connect/login_success.html';
        }

        startTime = new Date().getTime(); 
        loginWindow = window.open(FB_LOGIN_URL + '?client_id=' + appId + '&redirect_uri=' + oauthRedirectURL +
                    '&response_type=token&scope=public_profile,user_friends', '_blank', 'location=no');

        if (runningInCordova) {
            tokenStore = window.localStorage;
            console.log(tokenStore);
            loginWindow.addEventListener('loadstart', loginWindowLoadHandler);
            loginWindow.addEventListener('exit', loginWindowExitHandler);
        }
    };

    var logout = function(callback) {
      if (tokenStore.getItem('serverToken')) {
        tokenStore.removeItem('serverToken');
      }
    };

    var oauthCallback = function(url) {
        // Parse the OAuth data received from Facebook
        var queryString;
        var queryObj;

        loginProcessed = true;

        if (url.indexOf("access_token=") !== -1) {
            queryString = url.substr(url.indexOf('#') + 1);
            queryObj = $.deparam(queryString);
            tokenStore.setItem('access_token', queryObj['access_token']);
            if (loginCallback) {
                loginCallback({
                    status: 'connected', 
                    token: queryObj['access_token']
                });
            }
        } else if (url.indexOf("error=") !== -1) {
            queryString = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
            queryObj = $.deparam(queryString);
            if (loginCallback) {
                loginCallback({
                    status: 'not_authorized',
                    error: queryObj.error
                });
            }
        } else {
            if (loginCallback) {
                loginCallback({
                    status: 'not_authorized'
                });
            }
        }
    };

    return {
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        oauthCallback: oauthCallback,
    };

})();