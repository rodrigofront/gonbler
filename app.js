Perfil = new Meteor.Collection('perfil');

if (Meteor.isClient) {

  //LISTAGEM DOS PERFIL GRAVADOS
  Template.perfil_list.perfil = function() {
    return Perfil.find({}, {sort: {likes: -1, name: 1}});
  };
  //criando as variaveis
  var id,nome;

  //funcoes uteis do login
  function showButtonLogin (){
    $("#bt-login").show();
  };
  function hideButtonLogin (){
    $("#bt-login").hide();
  };
  function showButtonLogout(){
    $("#bt-logout").show();
  };
  function hideButtonLogout(){
    $("#bt-logout").hide();
    $(".list-perfil").hide();
    $(".home").show();
  };
  function showPerfil(id,nome){
    $("#name").text("Olá " + nome );
    $("#id").text( id );
    $("#avatar").attr("src","https://graph.facebook.com/" + id + "/picture?type=normal");

    $(".list-perfil").show();
    $(".home").hide();
  };
  function getPerfil() {
    FB.api('/me', function(response) {
      id = response.id;
      nome = response.name;
      apelido = response.username;
      console.log("get perfil");

      GravaPerfil(id, nome);
    });
  };

  function GravaPerfil() {
    var gravatar = "https://graph.facebook.com/" + id + "/picture?type=normal";

    var ids = function() {

        var userIds = new Array();

        Perfil.find({}).forEach(function(perfil) {
          if (userIds.indexOf(perfil.id) === -1) {
            userIds.push(perfil.id);
          }
        });

        return userIds;
      }

      var listIds = ids(),
          myUser = id,
          UserExist = $.inArray( myUser, listIds );

      if ( UserExist == -1 ) {
        Perfil.insert({ id: id, user: nome, img: gravatar });
      }
      else {
        console.log("Usuário Cadastrado");
      }

  }

  Template.home_perfil.events = {
    //Quando usuário loga pelo bt
    'click #bt-login': function() {
     FB.login(function(response) {
      if (response.authResponse) {
        console.log("usuário logado facebook");
        showButtonLogout();
        hideButtonLogin();
        $(".perfil").show();
        getPerfil();

        FB.api('/me', function(response) {
          id = response.id;
          nome = response.name;
          apelido = response.username;
          console.log(id ,nome,apelido);
          showPerfil(id,nome);
        });
      } else {
        console.log("conexão cancelada pelo facebook");
      }
    }
    , {scope: 'email,user_photos'}
    );
   },

    //usuário deslogando do app
    'click #bt-logout': function(){
      FB.logout(function(response) {
        // user is now logged out
        console.log("usuário desconectado do facebook");
        $(".perfil").hide();
        showButtonLogin();
        hideButtonLogout();
      });
    },

    //cadastrando as informações do usuario
    'click #cad-usuario': function() {
      var str = $("#name").text(),
      name = str.replace("Olá", ""),
      id = $("#id").text();

      Perfil.insert({ id: id, user: name })
    },
    //removendo usuario
    'click #del-usuario': function() {
      var str = $("#name").text(),
      name = str.replace("Olá", ""),
      id = $("#id").text();
      Perfil.remove({ id: id })
    }
  };
  //FACEBOOK
  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '118794124948220', // App ID from the App Dashboard
      channelUrl : 'http://www.danielfernandez.com.br/appfacebook/channel.html', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

    // Additional initialization code such as adding Event Listeners goes here
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // connected
        console.log("Usuario ja esta logado")
        hideButtonLogin();
        showButtonLogout();
        FB.api('/me', function(response) {
          id = response.id;
          nome = response.name;
          console.log(id ,nome);
          showPerfil(id,nome);
        });
        $(".list-perfil").show();
        $(".home").hide();
      } else if (response.status === 'not_authorized') {
        // not_authorized
        showButtonLogin();
        hideButtonLogout();
        $(".list-perfil").hide();

      } else {
        // not_logged_in
        showButtonLogin();
        hideButtonLogout();
        $(".list-perfil").hide();

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