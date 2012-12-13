Perfil = new Meteor.Collection('perfil');

if (Meteor.isClient) {

  //LISTAGEM DOS PERFIL GRAVADOS
  Template.perfil_list.perfil = function() {
    return Perfil.find({}, {sort: {likes: -1, name: 1}});
  };

  Template.home_perfil.events = {
    //Quando usuário loga pelo bt
    'click #bt-login': function() {
       FB.login(function(response) {
          if (response.authResponse) {
            console.log("usuário logado facebook");
            FB.api('/me', function(response) {
              $("#name").text("Olá " + response.name );
              $("#id").text( response.id );
              $("#avatar").attr("src","https://graph.facebook.com/" + response.id + "/picture");
            });
          } else {
            console.log("conexão cancelada pelo facebook");
          }
      });
    },

    //usuário deslogando do app
    'click #bt-logout': function(){
      FB.logout(function(response) {
        // user is now logged out
        console.log("usuário desconectado do facebook");
      });
    },

    //cadastrando as informações do usuario
    'click #cad-usuario': function() {
      var str = $("#name").text(),
          name = str.replace("Olá", ""),
          id = $("#id").text();

      Perfil.insert({ id: id, user: name })
    }
  };

  //FACEBOOK
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
        FB.api('/me', function(response) {
          $("#name").text("Olá " + response.name );
          $("#id").text( response.id );
          $("#avatar").attr("src","https://graph.facebook.com/" + response.id + "/picture");
        });
      } else if (response.status === 'not_authorized') {
        // not_authorized
        
      } else {
        // not_logged_in
      }
    });
  };

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