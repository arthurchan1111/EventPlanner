$(document).ready(function(){
	
 
$("#registration").formValidation({
	framework: "bootstrap",
	icon:{
		valid:"glyphicon glyphicon-ok",
		invalid:"glyphicon glyphicon-remove",
		validating:"glyphicon glyphicon-refresh"
	},
	fields:{
		fname:{
			row:".col-md-6",
			validators:{
				notEmpty:{
					message:"First Name is Required"
				},
				
				regexp:{
					regexp:/^[a-zA-Z]+$/,
					message: "You cannot use any numbers or special characters in input"	
					
				}
			}
		},
		lname:{
			row: ".col-md-6",
			validators:{
				notEmpty:{
					message:"Last Name is Required"
				},
				
				regexp:{
					regexp:/^[a-zA-Z]+$/,
					message: "You cannot use any numbers or special characters in input"	
					
				}
			}
		},
		
		emailin:{
			row:".col-md-12",
			validators:{
				notEmpty:{
					message:"Please Enter an Email Address"
				},
				emailAddress:{
					message:"This is not a valid Email Address"
				}
		/*	
				callback:{
					message:"This Email Address Is Already Registered",
					callback: function(value,validator,$field){
						var finalproduct;
						$("#emailinput").focusout(function(){
						var result;
						var email= $("#emailinput").val();
						firebase.database().ref("users/").orderByChild("email").equalTo(String(value)).on("child_added",function(snapshot){
						result= snapshot.val().email;
						
						 
						
						});
						 
						 finalproduct =(value===result)? "false":"true";
							console.log(finalproduct);
						});
						
						
						
						return false;
						
				}
			*/	
				
			}
			
		},
		
		passwordin:{
			row: ".col-md-12",
			validators:{
				notEmpty:{
					message:"Password is required"
				},
				stringLength:{
							min:6,
							max:30,
							message:"Password Must Be Between 6 and 30 Characters"
				},
				
				regexp:{
					regexp: /^[a-zA-Z0-9]+$/,
					message: "Password can only contain Letters and Numbers"
					
				}
				
				
			}
		},
		confirmpasswordin:{
			row: ".col-md-12",
			validators:{
				notEmpty:{
					message:"You need to reenter your password"
				},
				callback:{
					message: "This does not match with password entered",
					callback: function(value,validator,$field){
						var typedpassword = $("#pwdinput").val();
						
						return value == typedpassword;
						
					}
					
					
				}
				
			}
			
			
		}
		
		
		
	
	
	}
});
/*
$("#emailinput").blur(function(){
var result;
var email= $("#emailinput").val();
firebase.database().ref("users/").orderByChild("email").equalTo(String(email)).on("child_added",function(snapshot){
result= snapshot.val().email;
//console.log(result);
 if (result===email){
	 $("#emailGroup").append(" <span class='glyphicon glyphicon-remove form-control-feedback'></span>")
	 $("#emailGroup").toggleClass("form-group has-warning has-feedback");
 }						 
						
});
						
});

*/
$("#registerConfirm").click(function(){
var email= $("#emailinput").val();
var pwd= $("#pwdinput").val();
var fname = $("#firstnameInput").val();
var lname = $("#lastnameInput").val();
var result;
firebase.database().ref("users/").orderByChild("email").equalTo(String(email)).on("child_added",function(snapshot){
						result= snapshot.val().email;
	if (result===email){
		location.reload();
		
	}
	else{
		firebase.auth().createUserWithEmailAndPassword(String(email),String(pwd)).catch(function(error){
		var  errorCode=error.code;
		var errorMessage =error.message;
		console.log(error.code);
		console.log(error.message);
		});
		 
		}
});
});
});
   // console.log("Successfully created user account with uid:", userData.uid);
	//var childName= email.replace(".",",");
	
	
	//database.child("users").child(String(childName)).set({
     //	email: String(email),
	//	pwd: String(pwd),
		//firstname: String(fname),
	//	lastname: String(lname),
		//});
	 
	 
	//window.location.href = "login.html";


 












