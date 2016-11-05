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
var database= firebase.database();


var account=sessionStorage.getItem("email");
/*if(account===null){
  window.location.href="index.html";
}
*/
var user = String(account).replace(".",",");
var usertemp="arthurchan1111@gmail,com";
var markers=[];
var events=[];
var useragent = navigator.userAgent;


function initialize() {
var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 45,lng:  -95},
  zoom: 4,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  mapTypeControl:false,
  streetViewControl: false
});
function getdata(user,callback){
  database.ref('users/'+ user+'/'+'/events').orderByChild('eventname').on("child_added",function(snapshot){
  var result= snapshot.val().eventname;
  callback(result);
});
}
 var infoWindow = new google.maps.InfoWindow({map: map});
 /*if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(location) {
    var position = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
   map.setCenter(position);
}, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
}
*/
document.getElementById("closebutton").onclick =function(){
  form.style.width="0%";
  input.style.marginLeft="2%";
  submit.style.marginLeft="0%";
  navbar.style.marginLeft="0%";
  navbar.style.marginRight="0%";
  navbar.style.width="100%";
  document.getElementById("makeevent").reset();
 };
var input = document.getElementById("map-search");
var submit= document.getElementById("searchbtn");
var form = document.getElementById("form");
var navbar= document.getElementById("navigationbar");
var markerplace=document.getElementById("markerplace");
var searchBox = new google.maps.places.SearchBox(input);
var addressBox = new google.maps.places.SearchBox(document.getElementById("address"));
map.controls[google.maps.ControlPosition.TOP_CENTER].push(navbar);

map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(submit);
map.controls[google.maps.ControlPosition.LEFT_CENTER].push(form);

if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1){
  input.style.marginTop="25%";
  submit.style.marginTop="25%";
  input.style.width="60%";
  submit.style.width="15%";
}
else{
  input.style.marginTop="12%";
  submit.style.marginTop="12%";
  input.style.width="33%";
  submit.style.width="5%";
}

map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});
 searchBox.addListener('places_changed', function() {

  var places = searchBox.getPlaces();

  if (places.length == 0) {
   return;
  }

  markers.forEach(function(marker) {
    markers[0].setMap(null);
  });

markers=[];

var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
  };
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));
  var title = place.name;
   var eventString = "<div class='title'> <h3>" + place.name+ "</h3> </div>"
    + "<div class='link' id='eventformlink'><a href='#'> Click Here to Make an Event</a> </div>";
   var infowindow = new google.maps.InfoWindow({
    content:eventString
   });
  markers[0].addListener('click',function(){
  infowindow.open(map,markers[0]);
  document.getElementById("eventformlink").onclick= function(){
    if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1){
      form.style.width="100%";
      document.getElementsByClassName("form-group").style.paddingTop="0%";

    }
    else{
    form.style.width = "25%";
    input.style.marginLeft="30%";
    submit.style.marginLeft="26%";
    navbar.style.width="75%";
    navbar.style.marginLeft="25%";
}
    document.getElementById("address").value = place.name.toString();
    document.getElementById("confirmevent").onclick=function(){
      var eventname= document.getElementById("eventname").value;
      var address= document.getElementById("address").value;
      var date= document.getElementById("date").value;
      var starttime= document.getElementById("starttime").value;
      var endtime= document.getElementById("endtime").value;
      var desc= document.getElementById("description").value;
    firebase.database().ref("users/"+user+"/ "+"events/"+String(eventname)).set({
      eventname:String(eventname),
      address: String(address),
      date: String(date),
      starttime:String(starttime),
      endtime: String(endtime),
      description:String(desc)
    });
    form.style.width="0%";
    input.style.marginLeft="2%";
    submit.style.marginLeft="0%";
    navbar.style.marginLeft="0%";
    navbar.style.marginRight="0%";
    navbar.style.width="100%";
    document.getElementById("makeevent").reset();
      };

    };


  });


    if (place.geometry.viewport) {

      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});
submit.onclick =function(){
google.maps.event.trigger(input,"focus")
google.maps.event.trigger(input,"keydown",{
  keyCode: 13

});

};
document.getElementById("createevent").onclick= function(){
  if(useragent.indexOf("iPhone") != -1 || useragent.indexOf("Android") != -1){
    form.style.width="100%";
    form.style.height="80%";
    navbar.style.width="0%";

  }
  else{
    form.style.width = "25%";
    input.style.marginLeft="30%";
    submit.style.marginLeft="26%";
    navbar.style.width="75%";
    navbar.style.marginLeft="25%";
}
  document.getElementById("address").onblur=function(){
    input.value=document.getElementById("address").value;
    google.maps.event.trigger(input,"focus")
    google.maps.event.trigger(input,"keydown",{
      keyCode: 9

    });

  };
  document.getElementById("confirmevent").onclick=function(){
    var eventname= document.getElementById("eventname").value;
    var address= document.getElementById("address").value;
    var date= document.getElementById("date").value;
    var starttime= document.getElementById("starttime").value;
    var endtime= document.getElementById("endtime").value;
    var desc= document.getElementById("description").value;
  firebase.database().ref("users/"+usertemp+"/ "+"events/"+String(eventname)).set({
    eventname:String(eventname),
    address: String(address),
    date: String(date),
    starttime:String(starttime),
    endtime: String(endtime),
    description:String(desc)
  });
  form.style.width="0%";
  input.style.marginLeft="2%";
  submit.style.marginLeft="0%";
  navbar.style.marginLeft="0%";
  navbar.style.marginRight="0%";
  navbar.style.width="100%";
  document.getElementById("makeevent").reset();
    };
};
document.getElementById("accountdetail").onclick=function(){
  form.style.width = "100%";
 document.getElementById("makeevent").style.display="none";
}

document.getElementById("eventmanage").onclick=function(){

getdata(usertemp, function(returnvalue){
  console.log(returnvalue);
});



}
document.getElementById("signout").onclick=function(){
  firebase.auth().signOut().then(function(){

}, function(error) {

  });
  setTimeout(redirect,2000);
};



};
