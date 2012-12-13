if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to app.";
  };

  Template.hello.events({
      'click #login': function () {
        login();
      },

       'click #logout': function () {
        alert('Oi eu sou o logout');
      },

       'click #home': function () {
        alert('Oi eu sou o home');
      },

      var login = function() {
        console.log( 'login' );
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
