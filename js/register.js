$(document).ready(function(){
var database= new Firebase("https://eventplanner-arthurchan.firebaseio.com");

$("#emailinput").focusout(function(){
var email= $("#emailinput").val();
database.child("userIDAdmin");
database.equalTo(String(email)).on("child_added", function(snapshot){
console.log(snapshot.val().email); 

});


});

$("#confirmpass").focusout(function(){
var password= $("#pwdinput").val();

var confirmPassword=$("#confirmpass").val();

if(password === confirmPassword){

$("#confirmPassGroup").toggleClass("form-group has-success has-feedback");
$("#mutationConfirmPassword").toggleClass("glyphicon glyphicon-ok form-control-feedback");


}
else{

$("#confirmPassGroup").toggleClass("form-group has-error has-feedback");
$("#mutationConfirmPassword").toggleClass("glyphicon glyphicon-remove form-control-feedback");

}





});

$("#registerConfirm").click(function(){
var email= $("#emailinput").val();
var password= $("#pwdinput").val();
var fname = $("#firstnameInput").val();
var lname = $("#lastnameInput").val();
database.createUser({
email: String(email),
password: String(password)

}, function(error, userData) {
  if (error) {
    console.log("Error creating user:", error);
  } 
  else {
    console.log("Successfully created user account with uid:", userData.uid);
	database.child("users").push().set({
     	email: String(email),
		password: String(password),
		firstname: String(fname),
		lastname: String(lname)

     });
	 
     
	 
	    database.child("userIDAdmin").push().set({
			email: String(email),
			password: String(password),
			firstname: String(fname),
			lastname: String(lname)
		
		
     });
	//window.location.href = "login.html";
  }
  
}); 










});
});