$(document).ready(function(){
  var config = {
      apiKey: "AIzaSyDlYhWf4GHAY75jlhyX-Fx4Ycy5-ZD9lFI",
      authDomain: "eventplanner-arthurchan.firebaseapp.com",
      databaseURL: "https://eventplanner-arthurchan.firebaseio.com",
      storageBucket: "eventplanner-arthurchan.appspot.com",
    };
    firebase.initializeApp(config);
    $("#warning").hide();
    $("#forgetpassword").click(function(){
      window.location.href="forgetpassword.html";

    });
    $("#registerNow").click(function(){
      window.location.href="register.html";

    });
    function redirect(){
      window.location.href = "map.html";

    }

$("#signInBtn").click(function(){
var email= $("#inputEmail").val();
var pwd= $("#inputPassword").val();
firebase.auth().signInWithEmailAndPassword(email,pwd).catch(function(error){
 if(error){
   switch(error.code){
     case "auth/invalid-email":
     $("#warningtext").html("<strong>Oops!</strong> The Email You Entered does not contain the correct format");
      $("#warning").show();
      $("#inputEmail").val("");
      $("#inputPassword").val("");
      break;
      case "auth/wrong-password":
      $("#warningtext").html("<strong>Oops!</strong> You entered the wrong password associated with the account.");
       $("#warning").show();
       $("#inputEmail").val("");
         $("#inputPassword").val("");
       break;
       case "auth/user-not-found":
        $("#warningtext").html("<strong>Oops!</strong> There is no user email that we could match with your email");
        $("#warning").show();
        $("#inputEmail").val("");
        $("#inputPassword").val("");
        break;
      case "auth/user-disabled":
       $("#warningtext").html("<strong>Oops!</strong> User Has Disabled Their Email Please Try Again");
       $("#warning").show();
       $("#inputEmail").val("");
       $("#inputPassword").val("");
       break;
      default:
        $("#warningtext").html("<strong>Oops!</strong> You cannot login at this time please try again");
        $("#warning").show();
        $("#inputEmail").val("");
        $("#inputPassword").val("");

   }
 }
});


firebase.database().ref("users/").orderByChild("email").equalTo(String(email)).on("child_added",function(snapshot){
  var queryemail= snapshot.val().email;
  var querypassword=snapshot.val().pwd;

  if(queryemail=== email && querypassword === pwd){
    sessionStorage.setItem("email",email);
    setTimeout(redirect,2000);

  }

});




});

});
