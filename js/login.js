$(document).ready(function(){

$("#signInBtn").click(function(){
var email= $("#inputEmail").val();
var pwd= $("#inputPassword").val();
firebase.auth().signInWithEmailAndPassword(email,pwd).catch(function(error){
var errorCode = error.code;
 var errorMessage = error.message;
 console.log(errorCode);
 if(errorCode === "auth/user-not-found"){
	 console.log("wrong email");
	 //location.reload();
 }
 else{
	// window.location.href= "map.html";
	 
 }
});



});

});