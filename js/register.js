$(document).ready(function(){
	var config = {
	    apiKey: "AIzaSyDlYhWf4GHAY75jlhyX-Fx4Ycy5-ZD9lFI",
	    authDomain: "eventplanner-arthurchan.firebaseapp.com",
	    databaseURL: "https://eventplanner-arthurchan.firebaseio.com",
	    storageBucket: "eventplanner-arthurchan.appspot.com",
	  };
	  firebase.initializeApp(config);
$("#error").hide();
$("#registration").formValidation({
	framework: "bootstrap",
	icon:{
		valid:"glyphicon glyphicon-ok",
		invalid:"glyphicon glyphicon-remove",
		validating:"glyphicon glyphicon-refresh"
	},
	fields:{
		fname:{
			validators:{
				notEmpty:{
					message: "Full Name is Required"
				},

				regexp:{
					regexp:/^[a-z ,.'-]+$/i,
					message: "You cannot use any numbers or special characters in input"

				}
			}
		},


emailin:{

			validators:{
				notEmpty:{
					message:"Please Enter an Email Address"
				},
				emailAddress:{
					message:"This is not a valid Email Address"
				}


			}

		},

		passwordin:{

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
$("#signin").click(function(){
	window.location.href="login.html";
});

var result;
$("#emailinput").blur(function(){
var email= $("#emailinput").val();
firebase.database().ref("users/").orderByChild("email").equalTo(String(email)).on("child_added",function(snapshot){
result= snapshot.val().email;

 if (result===email){
	 	$("#error").show();
 }

});

});
var createaccount;

$("#registerConfirm").click(function(){
var email= $("#emailinput").val();
var pwd= $("#pwdinput").val();
var fname = $("#nameInput").val();
var confirmpass= $("#confirmpass").val();

if(fname === "" || confirmpass===""){
$("#errortext").html("<strong>Oops!</strong> One or more input fields are blank");
$("#error").show();
}
else if (confirmpass != pwd){
	$("#errortext").html("<strong>Oops!</strong> Your Password and Retyped Password Don't Match");
	$("#error").show();
}
else if(fname.search("([0-9]|[\-+#])+")>-1){
	$("#errortext").html("<strong>Oops!</strong> You cannot use any numbers or special characters in input");
	$("#error").show();
}

else{
createaccount=firebase.auth().createUserWithEmailAndPassword(String(email),String(pwd)).catch(function(error){
		if(error){
			switch(error.code){
				case "auth/invalid-email":
					$("#errortext").html("<strong>Oops!</strong> The Email You Entered is Invalid");
					$("#error").show();
					$("#pwdinput").val("");
					$("#confirmpass").val("");
					$("#emailinput").val("");
					break;
			   case "auth/email-already-in-use":
				 	 $("#errortext").html("<strong>Oops!</strong> It seems that there is an identical email already registered. Please Use a Different Email.");
					 $("#error").show();
					 $("#pwdinput").val("");
 					 $("#confirmpass").val("");
					 break;
					case "auth/weak-password":
						$("#errortext").html("<strong>Oops! </strong>" + error.message);
						$("#error").show();
						$("#pwdinput").val("");
						$("#confirmpass").val("");
						break;
					default:
					$("#errortext").html("<strong>Oops!</strong> An Account Could Not be Created At This Time Please Try Again");
					$("#error").show();
					$("#pwdinput").val("");
					$("#confirmpass").val("");
			}
		}
		});
		console.log(createaccount);
		if(result !=email){

		 var childName= email.replace(".",",");
		  var namesep = String(fname).split(" ");

		 firebase.database().ref("users/"+ String(childName)).set({
			email: String(email),
		 	pwd: String(pwd),
			firstname: String(namesep[0]),
		 	lastname: String(namesep[1]),
			 });

			 function redirect(){

				 $("#success").show();
				 window.location.href = "index.html";

			 }
			 $("#error").hide();
			 setTimeout(redirect,3000);

		}

}

});

});
