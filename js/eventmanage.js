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

var temp= [];
  var i =0;
  var events;
  var account=sessionStorage.getItem("email");
    var usertemp="arthurchan1111@gmail,com";
 function getdata(email, callback){
  // return new Promise(function(resolve,reject){
     firebase.database().ref('/users/'+usertemp+'/events').orderByChild('date').on("value",function(snapshot){
        var result= snapshot.val();
        temp.push(result);

        callback(temp[i]);
        i=i+1;
});


  // });
 }

getdata(usertemp,function(data){

  events= data;
  console.log(events);
  var i =0;
  console.log(Object.keys(events).length);
  for (i=0;i<Object.keys(events).length; i++){

    $('#eventlist').append('<li class="list-group-item" href="#" id='+String(events[Object.keys(events)[i]].eventname).split(" ").join("")+'>'+events[Object.keys(events)[i]].eventname+'<a href="#" class="glyphiconlink pull-right">'+
    '<span class="glyphicon glyphicon-chevron-down" id=glyphicon'+String(events[Object.keys(events)[i]].eventname).split(" ").join("")+'></span> </a>'+
    '<a href="#" class="pull-right"><span class="close" data-toggle="modal" data-target="#myModal" id='+events[Object.keys(events)[i]].eventname.split(" ").join("")+">&times</span></a>  </li>");
    $('#'+String(events[Object.keys(events)[i]].eventname.split(" ").join(""))).append("<div style='display:none;' id=panel"+String(events[Object.keys(events)[i]].eventname.split(" ").join(""))+"></div>");
     $('#panel'+String(events[Object.keys(events)[i]].eventname.split(" ").join(""))).html("<form class=''>"+
     "<div class='form-group'><label for='eventname'>Event Name: </label><input type='text' class='form-control' id="+events[Object.keys(events)[i]].eventname.split(" ").join("")+ "name placeholder="+events[Object.keys(events)[i]].eventname+"></div> <br>" +
     "<div class='form-group'><label for='address'>Address: </label><input type='text' class='form-control' id="+events[Object.keys(events)[i]].eventname.split(" ").join("")+ "address placeholder="+events[Object.keys(events)[i]].address+"></div> <br>" +
      "<div class='form-group'><label for='date'>Date: </label><input type='text' class='form-control' id="+events[Object.keys(events)[i]].eventname.split(" ").join("")+ "date placeholder="+events[Object.keys(events)[i]].date+"></div> <br>" +
      "<div class='form-group'><label for='starttime'>Start Time: </label><input type='text' class='form-control' id="+events[Object.keys(events)[i]].eventname.split(" ").join("")+ "starttime placeholder="+events[Object.keys(events)[i]].starttime+"></div> <br>" +
      "<div class='form-group'><label for='endtime'>End Time: </label><input type='text' class='form-control' id="+events[Object.keys(events)[i]].eventname.split(" ").join("")+ "endtime placeholder="+events[Object.keys(events)[i]].endtime+"></div> <br>" +
     "<div class='form-group'><label for='description'>Description: </label><input type='text' class='form-control' id="+events[Object.keys(events)[i]].eventname.split(" ").join("")+ "description placeholder="+events[Object.keys(events)[i]].description+"></div> <br>" +
     "<button class='btn btn-default btn-block' id=savebutton"+events[Object.keys(events)[i]].eventname.split(" ").join("")+">Save Changes</button>  </form>"

   );
  }


  $('.glyphiconlink').click(function(){
    var id= $(this).closest("li").prop("id");
    var specific= $(this).attr("id");
    $('#panel'+ id).slideToggle();
  
     $('#glyphicon'+ id).toggleClass('glyphicon glyphicon-chevron-up');




     $("#savebutton"+id).click(function(){
        console.log(id);

     });
  });


  $(".close").click(function(){
    var id= this.id;
    console.log(id);
     $("#myModal").modal();

  });
});


$('#createevent').click(function(){
  window.location.href='map.html';
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
