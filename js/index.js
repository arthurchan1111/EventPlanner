$(window).load(function(){

var config = {
    apiKey: "AIzaSyDlYhWf4GHAY75jlhyX-Fx4Ycy5-ZD9lFI",
    authDomain: "eventplanner-arthurchan.firebaseapp.com",
    databaseURL: "https://eventplanner-arthurchan.firebaseio.com",
    storageBucket: "eventplanner-arthurchan.appspot.com",
  };
  firebase.initializeApp(config);

$("#warning").hide();

$("#loginButton").click(function(){
$("#logintab").addClass("active");
$("#registertab").removeClass("active");
$("#registration").fadeOut();
$("#loginform").fadeIn();	
$("#modal").modal();	

	
});

$("#registerButton").click(function(){
	$("#registertab").addClass("active");
	$("#logintab").removeClass("active");
	$("#loginform").fadeOut();
	$("#registration").fadeIn();
	$("#modal").modal();
	
});


$("#logintab").click(function(){
	$("#logintab").addClass("active");
	$("#registertab").removeClass("active");
	$("#registration").fadeOut();
	$("#loginform").fadeIn();
});

$("#registertab").click(function(){
		$("#registertab").addClass("active");
	$("#logintab").removeClass("active");
	$("#loginform").fadeOut();
	$("#registration").fadeIn();
	
});












});