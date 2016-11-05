$(document).ready(function(){

  var config = {
      apiKey: "AIzaSyDlYhWf4GHAY75jlhyX-Fx4Ycy5-ZD9lFI",
      authDomain: "eventplanner-arthurchan.firebaseapp.com",
      databaseURL: "https://eventplanner-arthurchan.firebaseio.com",
      storageBucket: "eventplanner-arthurchan.appspot.com",
    };
    firebase.initializeApp(config);
$("#aftermessage").hide();
$("#confirmation").click(function(){
var email = $("#inputEmail").val();
var auth = firebase.auth();
auth.sendPasswordResetEmail(String(email)).then(function(){

}, function(error){
  if(error){
    switch(error.code){
      case "auth/invalid-email":
      break;
      case"auth/user-not-found":

      break;

    }
});
$("#emailform").hide();
$("#aftermessage").show();
});







});
