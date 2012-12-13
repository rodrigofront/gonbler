if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to app.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },



      'click #login':   function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            logado();
        } else {
            // cancelled
            console.log("teste2");
        }
    });
},

       'click #logout': function logout(){
  FB.logout(function(response) {
  // user is now logged out
  console.log("user is now logged out");
});
},

       'click #home': function nome(){
FB.api('/me', function(response) {
  alert('Your name is ' + response.name);
});

},

  });
  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '118794124948220', // App ID from the App Dashboard
      channelUrl : 'http://www.danielfernandez.com.br/appfacebook/channel.html', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // connected
      } else if (response.status === 'not_authorized') {
        // not_authorized
        
      } else {
        // not_logged_in
      
      }
 });


  };



 var logado = function() {
console.log('logado');
 }



  // Load the SDK's source Asynchronously
  // Note that the debug version is being actively developed and might
  // contain some type checks that are overly strict.
  // Please report such bugs using the bugs tool.
  (function(d, debug){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "https://connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
     ref.parentNode.insertBefore(js, ref);
   }(document, /*debug*/ false));
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
