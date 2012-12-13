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

      'click #login': function () {
        alert('Oi eu sou o login');
      },

       'click #logout': function () {
        alert('Oi eu sou o logout');
      },

       'click #home': function () {
        alert('Oi eu sou o home');
      },

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
