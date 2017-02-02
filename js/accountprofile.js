$(document).ready(function(){



var config = {
    apiKey: "AIzaSyDlYhWf4GHAY75jlhyX-Fx4Ycy5-ZD9lFI",
    authDomain: "eventplanner-arthurchan.firebaseapp.com",
    databaseURL: "https://eventplanner-arthurchan.firebaseio.com",
    storageBucket: "eventplanner-arthurchan.appspot.com",
  };
  function redirect(){
    window.location.href = "index.html";

  };
  firebase.initializeApp(config);
    var account=sessionStorage.getItem("email");

    var database= firebase.database().ref('/users/'+usertemp+'/events').orderByChild('email').on("child_added",function(snapshot){
    var result= snapshot.val();
    console.log(result);
  });
  $('#createevent').click(function(){
    
  });
  $('#eventmanage').click(function(){
    window.location.href='eventmanage.html';
  });
  $('#accountdetail').click(function(){
    window.location.href='accountprofile.html';
  });

  $("#signout").click(function(){
    firebase.auth().signOut().then(function(){

  }, function(error) {

    });
    setTimeout(redirect,2000);
  });

  });
