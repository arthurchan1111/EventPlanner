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
  var data=[];
  var i=0;
  var events;
    var account=sessionStorage.getItem("email");
  var usertemp="arthurchan1111@gmail,com";
   function getdata(callback){
firebase.database().ref('/users/'+usertemp+'/').orderByChild('email').on("child_added",function(snapshot){
    var result= snapshot.val();
    data.push(result);
    if (data.length ===5){
      callback(data);

    }

    i= i+1;
  });
};


getdata(function(array){

 events= array;
console.log(events);
var originalemail=events[0];
$("#inputEmail").val(events[0]);
$("#inputPassword").val(events[4]);
$("#inputfname").val(events[2]);
$("#inputlname").val(events[3]);
/*
$("#saveInfo").click(function(){
var emailcheck= $("#inputEmail").val();
if(events[0]!=emailcheck){
  firebase.database.ref("users/"+ String(emailcheck)).set({
    email: String(emailcheck),
    pwd: String($("#inputPassword").val()),
    firstname: String($("#inputfname").val()),
    lastname: String($("#inputlname").val()),
    events: events[1]
     });
 firebase.database.ref("users/"+ String(originalemail)).remove();
}
else{
  firebase.database.ref("users/"+originalemail+"/").update({
    pwd: String($("#inputPassword").val()),
    firstname: String($("#inputfname").val()),
    lastname: String($("#inputlname").val())
  }

  )
}

});
*/
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
