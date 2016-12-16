function journey_start_map() {
    journey_update_map1();
   /* journey_updater = setInterval(function(){ 
        journey_update_map();
    }, 15000); */
}
window.dis_data = [];
window.sour_dest = [];
window.api_lat_lng = [];
 var marker = {};   
function journey_update_map1() {
latitude = document.getElementById('lat').value;
longitude = document.getElementById('long').value;
var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      disableDefaultUI: true,
      streetViewControl: false,
      center: new google.maps.LatLng(latitude, longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]
    });
    c();
     var infowindow = new google.maps.InfoWindow();
    var numDeltas = 100;
        var delay = 10; 
        function moveMarker2(name,position,deltalat,deltalng,inc){
            //alert(name+","+position+","+deltalat+","+deltalng+","+inc)
            if(typeof position !== 'undefined'){
            deltaLat=deltalat;deltaLng=deltalng;
            position=position;
            position[0] += deltaLat;
            position[1] += deltaLng;
            var latlng = new google.maps.LatLng(position[0], position[1]);
            var key=name;
            var q=marker[key];
            if(typeof q !== 'undefined'){
            q.setPosition(latlng);
            }
            if(inc!=numDeltas){
                inc++;
                setTimeout( function() { moveMarker2(name,position,deltalat,deltalng,inc); }, 30 );
            }
            }
        }
        var infobubble2 = new InfoBubble({
                                                  map: map,
                                                  position: new google.maps.LatLng(-32.0, 149.0),
                                                  shadowStyle: 1,
                                                  padding: 5,
                                                  color: '#ffffff',
                                                  backgroundColor: '#3f9eb9',
                                                  borderRadius: 5,
                                                  arrowSize: 10,
                                                  borderWidth: 1,
                                                  borderColor: '#3f9eb9',
                                                  disableAutoPan: true,
                                                  hideCloseButton: false,
                                                  arrowPosition: 30,
                                                  backgroundClassName: 'transparent',
                                                  arrowStyle: 2
                                                });
    function c(){
var driver_passenger_calculated_distance = document.getElementById('driver_passenger_calculated_distance').innerHTML;

driver_passenger_calculated_distance = parseInt(driver_passenger_calculated_distance);
window.reached_destination = {};

    if (driver_passenger_calculated_distance < 0.3) {
        
        var activity = localStorage.getItem('activity');
        if (activity == 'driver_has_accepted') {
            localStorage.setItem('activity','driver_has_arrived');
            var userid = localStorage.getItem('userid');
            var pickdriver_id = localStorage.getItem("pickdriver_id");
            $.get( "https://250taxi.com/db/partner/taxi_comlink_journey.php?task=accepted&passenger_id="+userid+"&pickdriver_id="+pickdriver_id+"",      function( data ) {});
            var pickdriver_name = localStorage.getItem("pickdriver_name");
            var voice_enabled = localStorage.getItem("voice_enabled");
            if (voice_enabled == "On") {
                responsiveVoice.speak("Your driver "+pickdriver_name+" has arrived!");
            }
            document.getElementById('journey_status_dialog').style.display = "block";
            document.getElementById('journey_status_dialog').className = "animated fadeIn jd_yellow"
            document.getElementById('journey_status_dialog_window').className = "sdbox animated fadeInUp"
            document.getElementById('journey_status_dialog_title').innerHTML = "Your taxi is close";
            document.getElementById('journey_status_dialog_content').innerHTML = "<div>Please look for the taxi and confirm your boarding.</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_has_boarded(); }, 1000);'>Boarded</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_not_yet_boarded(); }, 1000);'>I don't see the taxi.</div>";
        }
    }

    
pickdriver_id = localStorage.getItem("pickdriver_id");
    
$( "#driveroverlay_show_details" ).load( "https://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id="+pickdriver_id+"&passenger_lat="+latitude+"&passenger_long="+longitude+"", function() {

});
    
pickdriver_currentgpslat = document.getElementById('pickdriver_currentgpslat').innerHTML;
pickdriver_currentgpslong = document.getElementById('pickdriver_currentgpslong').innerHTML;
pickdriver_accuracy = document.getElementById('pickdriver_accuracy').innerHTML;
pickdriver_name = document.getElementById('pickdriver_name').innerHTML;
    
console.log("pickdriver_currentgpslat:"+pickdriver_currentgpslat+
    "\npickdriver_currentgpslong:"+pickdriver_currentgpslong+
    "\nlatitude:"+latitude+"\nlongitude:"+longitude+"");

driverLatLng = {};
/* 
    For polyline implement between driver current pos and previous pos
    Mainly for turning the vehicle
*/
if (typeof driverLatLng === "undefined"){
    driverLatLng = {
        "previous_lat": pickdriver_currentgpslat,
        "previous_lng": pickdriver_currentgpslong,
        "current_lat": pickdriver_currentgpslat,
        "current_lng": pickdriver_currentgpslong
    }
}
else{
    driverLatLng["previous_lat"] = driverLatLng["current_lat"];
    driverLatLng["previous_lng"] = driverLatLng["current_lng"];
    driverLatLng["current_lat"] = pickdriver_currentgpslat;
    driverLatLng["current_lng"] = pickdriver_currentgpslong;
}
    
window.api_lat_lng.push(
    "pickdriver_currentgpslat: "+pickdriver_currentgpslat+
    " pickdriver_currentgpslong: "+pickdriver_currentgpslong+
    " latitude: "+latitude+" longitude: "+longitude+
    " previous_lat: "+ driverLatLng.previous_lat +
    " previous_lng: "+ driverLatLng.previous_lng
);
var locations = [
    
['Me', latitude, longitude, 'css/userpinicon.png','10'],
['Driver', pickdriver_currentgpslat, pickdriver_currentgpslong, 'journey/journey_marker_driver.png',pickdriver_accuracy],

];
//if(typeof map1 === 'undefined'){

//}
/*
else{
    map1.setCenter({
        lat : latitude,
        lng : longitude
    });
}*/
    /* marker set here*/
    var infowindow = new google.maps.InfoWindow();
    var numDeltas = 100;
        var delay = 10; 
        // User Marker
        function moveMarker2(name,position,deltalat,deltalng,inc){
            // console.log(name+","+position+","+deltalat+","+deltalng+","+inc);
            if(typeof position !== 'undefined'){
                deltaLat=deltalat;
                deltaLng=deltalng;
                position=position;
                position[0] += deltaLat;
                position[1] += deltaLng;
                // console.log(position[0], position[1]);
                var latlng = new google.maps.LatLng(position[0], position[1]);
                var key=name;
                var q = marker[key];
                if(typeof q !== 'undefined'){
                    q.setPosition(latlng);
                }
                if(inc!=numDeltas){
                    inc++;
                    setTimeout( function() { moveMarker2(name,position,deltalat,deltalng,inc); }, 20 );
                }
            }
        }
    var i; var angle2;

    for (i = 0; i < locations.length; i++) {

        var name=locations[i][0];
        var lat=locations[i][1];
        var lng=locations[i][2];
        var driver_accuracy=locations[i][4];
        var previous_lat, previous_lng;
        var iconimage = {
            url: locations[i][3],
            scaledSize: new google.maps.Size(90, 90), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(43,90) // anchor
        };
if( typeof marker[name] !== 'undefined'){
         previous_lat = marker[name].getPosition().lat();
         previous_lng = marker[name].getPosition().lng();
var B = {
                x : lat,
              y : lng
            };

            var A = {
                x : previous_lat,
              y : previous_lng
            };
             angle2 = ( ( ( -(Math.atan2((A.x-B.x),(A.y-B.y))*(180/Math.PI)) % 360) + 360) % 360);
             angle2= angle2 +60; 
        }
// console.log(angle2);
    
angle2 = Math.floor(angle2);
    
angle2 = Math.round(angle2 / 10) * 10;
    
// console.log("Angle:" +angle2);
    
// imgUrl="https://250taxi.com/ios/test.php?a="+angle2;
    
if (angle2 > 360) {
    console.log("360 exceeded");
    angle2_s = angle2.toString();
    angle2_s = angle2_s.substring(1);
    angle2 = parseInt(angle2_s);
}
    
imgUrl="taxi/taxi_"+angle2+".svg";
    
// console.log(imgUrl);
if(name=="Driver"){
var iconimage1 = {
 url: imgUrl, // url
    //path: 'M -1,0 A 1,1 0 0 0 -3,0 1,1 0 0 0 -1,0M 1,0 A 1,1 0 0 0 3,0 1,1 0 0 0 1,0M -3,3 Q 0,5 3,3',
    //rotation: angle2,
    scaledSize: new google.maps.Size(60, 60), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90),// anchor
    
};
} else{
var iconimage1 = {
    url: locations[i][3],
    scaledSize: new google.maps.Size(90, 90), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90) // anchor
};
}
        var position = [previous_lat, previous_lng];
        //var numDeltas = 100;
        //var delay = 30; //milliseconds
        var inc = 0;
        var deltaLat;
        var deltaLng;
       if( typeof marker[name] === 'undefined'){
      marker[name] = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        // icon: iconimage1,
        map: map,
        title:name,
        draggable:false 
      });
       }else if( typeof marker[name] !== 'undefined'){

            /* current lat lng */
            // var result1 = [lat, lng];
            // inc = 0;
            // /* result - current lat lng , position - previous lat lng */
            // deltaLat = (result1[0] - position[0])/numDeltas;
            // deltaLng = (result1[1] - position[1])/numDeltas;
            // if(driver_accuracy < 50){
            //     /* c() to moveMarker always happens here */

            //     moveMarker2(name,position,deltaLat,deltaLng,inc);
            // }

            //custom code
            /* current lat lng */
            console.log("driverLatLng: "+ driverLatLng);
            console.log("name: "+ name);
            if (name != "Me"){
                // map movement for the driver
                callDirectionApi(driverLatLng,marker[name]);
            }
            else{
                var result1 = [lat, lng];
                console.log("result1"+ result1);
                inc = 0;
                /* result - current lat lng , position - previous lat lng */
                deltaLat = (result1[0] - position[0])/numDeltas;
                deltaLng = (result1[1] - position[1])/numDeltas;
                console.log("deltaLat :" + deltaLat + " deltaLng: "+ deltaLng);
                console.log(
                    "position[0]previous_lat: " + position[0] +
                     " position[1]: " + position[1]
                    )
                console.log("driver_accuracy : " + driver_accuracy);
                if(driver_accuracy < 50){
                    // c() to moveMarker always happens here

                    moveMarker2(name,position,deltaLat,deltaLng,inc);
                }
            }

            // var poly_coords_array = callDirectionApi(driverLatLng,marker[name]);
            // console.log(poly_coords_array);
            // var result1 = [lat, lng];
            // console.log("result1"+ result1);
            // inc = 0;
            // /* result - current lat lng , position - previous lat lng */
            // deltaLat = (result1[0] - position[0])/numDeltas;
            // deltaLng = (result1[1] - position[1])/numDeltas;
            // console.log("deltaLat :" + deltaLat + " deltaLng: "+ deltaLng);
            // console.log(
            //     "position[0]previous_lat: " + position[0] +
            //      " position[1]: " + position[1]
            //     )
            // console.log("driver_accuracy : " + driver_accuracy);
            // if(driver_accuracy < 50){
            //     // c() to moveMarker always happens here

            //     moveMarker2(name,position,deltaLat,deltaLng,inc);
            // }

       }

       
       if( typeof marker['Driver'] !== 'undefined'){
            var arg;
            var contentString = '<div style="color:white;">&nbsp;<b>'+pickdriver_name+'</b><IMG BORDER="0" ALIGN="Left" WIDTH="40" SRC="https://www.250taxi.com/driverpics/'+pickdriver_id+'.jpg" onError="this.src = \'https://www.250taxi.com/app/no-user-image.gif\'"></div>';
            var currentmarker=marker['Driver'];
            google.maps.event.addListener(currentmarker, 'click', (function(currentmarker, arg) {
               return function() {                 
                        infobubble2.setContent(contentString);
                        infobubble2.open(map, currentmarker);
                }
            })(currentmarker, arg)); 
           }
      /*google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i)); */
    
    }
    }
    journey_updater=setInterval(function(){ 
        c();
    }, 1500);
}
function journey_update_map() {
    if( typeof marker["Driver"] !== 'undefined') {
        var previous_lat = marker["Driver"].getPosition().lat();
        var previous_lat = marker["Driver"].getPosition().lat();
        delete marker["Driver"];
    }
var driver_passenger_calculated_distance = document.getElementById('driver_passenger_calculated_distance').innerHTML;

driver_passenger_calculated_distance = parseInt(driver_passenger_calculated_distance);

if (driver_passenger_calculated_distance < 0.1) {
    
var activity = localStorage.getItem('activity');
    
if (activity == 'driver_has_accepted') {

    localStorage.setItem('activity','driver_has_arrived');
    
    var userid = localStorage.getItem('userid');
    var pickdriver_id = localStorage.getItem("pickdriver_id");
    
    $.get( "https://250taxi.com/db/partner/taxi_comlink_journey.php?task=accepted&passenger_id="+userid+"&pickdriver_id="+pickdriver_id+"",      function( data ) {});
        
    var pickdriver_name = localStorage.getItem("pickdriver_name");
        
    var voice_enabled = localStorage.getItem("voice_enabled");
    if (voice_enabled == "On") {responsiveVoice.speak("Your driver "+pickdriver_name+" has arrived!");}
        
    document.getElementById('journey_status_dialog').style.display = "block";
    document.getElementById('journey_status_dialog').className = "animated fadeIn jd_yellow"
    document.getElementById('journey_status_dialog_window').className = "sdbox animated fadeInUp"
    document.getElementById('journey_status_dialog_title').innerHTML = "Driver has arrived";
    document.getElementById('journey_status_dialog_content').innerHTML = "<div>Have you boarded the taxi?</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_has_boarded(); }, 1000);'>Yes</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_not_yet_boarded(); }, 1000);'>Not yet</div>";

    }
    
}

latitude = document.getElementById('lat').value;
longitude = document.getElementById('long').value;
    
pickdriver_id = localStorage.getItem("pickdriver_id");
    
$( "#driveroverlay_show_details" ).load( "https://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id="+pickdriver_id+"&passenger_lat="+latitude+"&passenger_long="+longitude+"", function() {

});
    
pickdriver_currentgpslat = document.getElementById('pickdriver_currentgpslat').innerHTML;
pickdriver_currentgpslong = document.getElementById('pickdriver_currentgpslong').innerHTML;

console.log("pickdriver_currentgpslat:"+pickdriver_currentgpslat+"\npickdriver_currentgpslong:"+pickdriver_currentgpslong+"\nlatitude:"+latitude+"\nlongitude:"+longitude+"");
    
var locations = [
    
['Me', latitude, longitude, 'userpinicon.png'],
['Driver', pickdriver_currentgpslat, pickdriver_currentgpslong, 'journey/journey_marker_driver.png'],

];
//if(typeof map1 === 'undefined'){
var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      disableDefaultUI: true,
      streetViewControl: false,
      center: new google.maps.LatLng(latitude, longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}]
    });
//}
/*
else{
    map1.setCenter({
        lat : latitude,
        lng : longitude
    });
}*/
    var infowindow = new google.maps.InfoWindow();
    var numDeltas = 100;
        var delay = 10; 
        function moveMarker2(name,position,deltalat,deltalng,inc){
            //alert(name+","+position+","+deltalat+","+deltalng+","+inc)
            if(typeof position !== 'undefined'){
            deltaLat=deltalat;deltaLng=deltalng;
            position=position;
            position[0] += deltaLat;
            position[1] += deltaLng;
            var latlng = new google.maps.LatLng(position[0], position[1]);
            var key=name;
            var q=marker[key];
            if(typeof q !== 'undefined'){
            q.setPosition(latlng);
            }
            if(inc!=numDeltas){
                inc++;
                setTimeout( function() { moveMarker2(name,position,deltalat,deltalng,inc); }, 30 );
            }
            }
        }
    var i;
   
    locations.forEach(function(entry) {
        name=entry[0];
        lat=entry[1];
        lng=entry[2];
        var iconimage = {
        url: entry[3],
        scaledSize: new google.maps.Size(90, 90), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(43,90) // anchor
    };

        var position = [previous_lat, previous_lng];
        var inc = 0;
        var deltaLat;
        var deltaLng;
            
        if( typeof marker[name] === 'undefined') {
            
            alert("undefined");
                var pos1 = new google.maps.LatLng(lat, lng);
                marker[name] = new google.maps.Marker({
                position: pos1,
                map: map,
                draggable: true,
                icon: iconimage,
                title: "Taxi"+name,
                id: name
                }); 
                inc = 0;
                var result1 = [lat, lng];
            deltaLat = (result1[0] - position[0])/numDeltas;
            deltaLng = (result1[1] - position[1])/numDeltas;
            //moveMarker2(name,position,deltaLat,deltaLng,inc);
        }/*
        else if( typeof marker[name] !== 'undefined' ){
            //alert("defined");
            var result1 = [lat, lng];
            //taxi_marker=marker[name];
            //transitionArr[taxi_id](result);
            inc = 0;
            deltaLat = (result1[0] - position[0])/numDeltas;
            deltaLng = (result1[1] - position[1])/numDeltas;
            moveMarker2(name,position,deltaLat,deltaLng,inc);
        } */
    });
    /*for (i = 0; i < locations.length; i++) {
        
var iconimage = {
    url: locations[i][3],
    scaledSize: new google.maps.Size(90, 90), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(43,90) // anchor
};
        
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        icon: iconimage,
        map: map,
        title:"driver marker"
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }*/
}

function journey_has_boarded() {

localStorage.setItem('activity','has_boarded');
    
driverid = localStorage.getItem("pickdriver_id");
clientid = localStorage.getItem("userid");
    
var userid = localStorage.getItem('userid');
var driverid = localStorage.getItem("pickdriver_id");
localStorage.setItem("logupdate",""+userid+"*"+driverid+"*boarded*User"+clientid+" boarded with Driver"+driverid+"");logupdate_v2();
    
console.log("Start Journey!"); 
    
$.get( "https://250taxi.com/db/journey/journey_mode.php?task=taxi_boarded&passenger_id="+clientid+"&pickdriver_id="+driverid+"",  function( journey_id ) {
    console.log("Journey ID: " + journey_id);
    localStorage.setItem("journey_id",journey_id);
    journey_start_fare();
}); 
    
}
function journey_not_yet_boarded() {
    
    localStorage.setItem('activity','not_yet_boarded');
    
    var userid = localStorage.getItem('userid');
    var driverid = localStorage.getItem("pickdriver_id");
    localStorage.setItem("logupdate",""+userid+"*"+driverid+"*not_boarded*User"+clientid+" has not yet boarded with Driver"+driverid+"");logupdate_v2();
    
    document.getElementById('journey_status_dialog').className = "animated fadeOut";
    setTimeout(function(){
    document.getElementById('journey_status_dialog').style.display = "none";  
    }, 3000);
    
    setTimeout(function(){
        show_driver_has_arrived_again();
    }, 60000);

}

function show_driver_has_arrived_again() {

document.getElementById('journey_status_dialog').style.display = "block";
document.getElementById('journey_status_dialog').className = "animated fadeIn"
document.getElementById('journey_status_dialog_window').className = "sdbox animated fadeInUp"
document.getElementById('journey_status_dialog_title').innerHTML = "Boarded yet?";
document.getElementById('journey_status_dialog_content').innerHTML = "<div>Can't find the taxi? You can chat with the driver or give him a call.</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_has_boarded(); }, 1000);'>Yes</div><br><div class='waves-effect waves-light jd_button' onclick='setTimeout(function(){ journey_not_yet_boarded(); }, 1000);'>Not yet</div>";
}

function call() {
    
var driverid = localStorage.getItem("pickdriver_id");
    
$.get( "https://250taxi.com/db/partner/taxi_id_get_phone.php?id_no="+driverid+"", function( data ) {
    
var userid = localStorage.getItem('userid');
var phonenumber = data;
    
var userid = localStorage.getItem('userid');
var driverid = localStorage.getItem("pickdriver_id");
localStorage.setItem("logupdate",""+userid+"*"+driverid+"*phone*User"+clientid+" calls phone  "+phonenumber+" of Driver"+driverid+"");logupdate_v2();

if (phonenumber == "no_number") {

var userid = localStorage.getItem('userid');
var driverid = localStorage.getItem("pickdriver_id");
localStorage.setItem("logupdate",""+userid+"*"+driverid+"*phone missing*No phone number found!");logupdate_v2();
    
}
else {
alert("Trying to call: "+phonenumber+"");
window.open("tel:"+phonenumber+"","_self");
}
  
});

}

$(document).ready(function () {
 
    $( "#chat_message_send_button" ).click(function() {
        chat_send_message();
    });

    $("#chat_message_input").keyup(function (e) {
        if (e.keyCode == 13) {
        chat_send_message();
        }
    });

});

function chat() {
    
localStorage.setItem("chat_window_status","open");
    
var userid = localStorage.getItem('userid');
var driverid = localStorage.getItem("pickdriver_id");
localStorage.setItem("logupdate",""+userid+"*"+driverid+"*chat*User"+userid+" started chat with Driver"+driverid+".");logupdate_v2();
    
    document.getElementById("chat_overlay").className = "animated fadeInUp"
    document.getElementById("chat_overlay").style.display = "block";
}
function close_chat() {
    
localStorage.setItem("chat_window_status","closed");
    
    document.getElementById("chat_overlay").className = "animated fadeOutDown"
    setTimeout(function(){
    document.getElementById("chat_overlay").style.display = "none";
    }, 800);
}

function chat_send_message() {
    var chat_message = document.getElementById("chat_message_input").value;
    
if (/^\s*$/.test(chat_message)) {
    console.log("Only whitespace. Message blocked.");
    chataudio_error.play();
    return;
}

            driverid = localStorage.getItem("pickdriver_id");
            clientid = localStorage.getItem("userid");

            $.get("https://250taxi.com/db/journey/chat.php?task=send_message&driverid=" + driverid + "&clientid=" + clientid + "&message=" + chat_message + "&origin=client", function (data) {
               chataudio.play(); 
            });

            document.getElementById("chat_message_input").value = "";

            $("#chat_load_messages").load("https://250taxi.com/db/journey/chat.php?task=show_messages&driverid=" + driverid + "&clientid=" + clientid + "", function (data) {
    
});
}

function journey_start_fare() {
    console.log("Let's go!");
    document.getElementById("journey_status_dialog").style.display = "none";
    document.getElementById("driveroverlay_show_details").style.display = "none";
    document.getElementById("journey_accepted_panel").style.display = "none";
    document.getElementById("journey_fare_display").style.display = "block";
    
    document.getElementById("journey_fare_display_destination_target").innerHTML = localStorage.getItem("destination");
    
    var journey_fare_check = setInterval(journey_fare_load, 15000);
    
    journey_mode_map();
}
function journey_fare_load() {
    
var journey_id = localStorage.getItem("journey_id");
var journey_id = "journey_"+journey_id+"";
var journey_id = window.btoa(journey_id);

$("#journey_fare_load").load("https://250taxi.com/db/journey/get_total_distance.php?journey_id=" + journey_id + "", function (data) {

document.getElementById("journey_fare_display_km_count").innerHTML = localStorage.getItem("journey_total_distance");

document.getElementById("journey_fare_display_fare_count").innerHTML = localStorage.getItem("journey_total_cost");

});

}

// driverLatLng previous_lat, previous_lng, current_lat, current_lng
function callDirectionApi(driverLatLng, marker){

    driverLatLng.previous_lat = marker.getPosition().lat();
    driverLatLng.previous_lng = marker.getPosition().lng();

    // taxiDatas[taxi_id].previous_lat = 13.097138;
    // taxiDatas[taxi_id].previous_lng = 80.200193;
    // alert(taxiDatas[taxi_id].previous_lat, taxiDatas[taxi_id].previous_lng);

    var polyline_array = [];
    //Direction service api call to find the route and steps of coordinates between starting and destination point
    directionsService.route({
    //previous lat lng
    origin: new google.maps.LatLng(driverLatLng.previous_lat,driverLatLng.previous_lng),
    //current lat lng
    destination: new google.maps.LatLng(
        driverLatLng.current_lat,
        driverLatLng.current_lng
        ),
    //current lat lng
    waypoints: [{
        stopover: false,
        location: new google.maps.LatLng(
            driverLatLng.current_lat,
            driverLatLng.current_lng
        )
    }],
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    console.log("google.maps.DirectionsStatus.OK",google.maps.DirectionsStatus.OK, status)
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var bounds = new google.maps.LatLngBounds();
      console.log(bounds);
      var legs = response.routes[0].legs;
      window.move_count = 0;
      console.log("findPolylineCoords before call");
      // polyline_array = findPolylineCoords(legs, polyline_array, bounds, marker);
      findPolylineCoords(legs, polyline_array, bounds, marker, driverLatLng);
    }
  });
    // return polyline_array;
}

function findPolylineCoords(legs, polyline_array, bounds, marker, driverLatLng){
    var polyline_array = [];
    for (i = 0; i < legs.length; i++) {
    var steps = legs[i].steps;
    for (j = 0; j < steps.length; j++) {
      var nextSegment = steps[j].path;
      for (k = 0; k < nextSegment.length; k++) {
        polyline_array.push(splitValues(nextSegment[k]));
        bounds.extend(nextSegment[k]);
        console.log(polyline_array);
      }
    }
  }
  window.move_count = 0;
  // return polyline_array;
  // console.log("now poly = ", taxi_id, window.polyline_array)

  // movement setup added
  animateMarker(marker, polyline_array, driverLatLng);

}

function splitValues(nextSegment){
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(nextSegment);
    return matches[1].split(",");
}

function animateMarker(markers, coords, driverLatLng)
{
    var target = 0;
    var km_h = km_h || 50;
    var delay = 100;

    function goToPoint()
    {   
        if (typeof moveMarkerTimeOut !== "undefined"){
            clearTimeout(moveMarkerTimeOut);
        }
        // co ordinate segmenting
        var step = (km_h * 1000 * delay) / 3600000; // in meters
        console.log(step + " step");
        var dest = new google.maps.LatLng(
        coords[target][0], coords[target][1]);
        console.log("coords[target][0], coords[target][1] " +
            coords[target][0] + " " + coords[target][1]);
       // console.log(taxiDatas[taxi_id],"aaaaaaaaaaaa", taxi_id)
        _previous_lat = driverLatLng.previous_lat;
        _previous_lng = driverLatLng.previous_lng;
        // alert(_previous_lat+" "+_previous_lng)
       // console.log("target",taxi_id)
        console.log(_previous_lat+ "  " + _previous_lng + " prev lat lng ");

        var source = new google.maps.LatLng(
        _previous_lat, _previous_lng);
        window.sour_dest.push(
            "sour lat lng " + _previous_lat+ ", "+
            _previous_lng + " dest lat lng " +
            coords[target][0] + ", " + coords[target][1]
        )
        var distance =
        google.maps.geometry.spherical.computeDistanceBetween(
        dest, source); // in meters
        if(distance > 0){
            window.dis_data.push(distance);
        }

        console.log("distance : " + distance);
        var numStep = distance / step;
        console.log("numStep :" + numStep);
        var i = 0;
        var deltaLat = 0.0;
        var deltaLng = 0.0;
        if(numStep != 0){
            deltaLat = (coords[target][0] - driverLatLng.previous_lat) / numStep;
            deltaLng = (coords[target][1] - driverLatLng.previous_lng) / numStep;
        }

        console.log("deltaLat "+ deltaLat + " deltaLng " + deltaLng);

        function moveMarker()
        {
            driverLatLng.previous_lat += deltaLat;
            driverLatLng.previous_lng += deltaLng;
            console.log(
                "driverLatLng.previous_lat: " + driverLatLng.previous_lat +
                "driverLatLng.previous_lng: " + driverLatLng.previous_lng
                );
            i += step;
            console.log(distance+ " distance");
            console.log(i+ " i");
            
            if (i < distance)
            {
                console.log("coming in distance");
                markers.setPosition(new google.maps.LatLng(driverLatLng.previous_lat, driverLatLng.previous_lng));
                moveMarkerTimeOut = setTimeout(moveMarker, delay);
            }
            else {
                console.log("coming in else");
                markers.setPosition(dest);
                target++;
                console.log("target : "+ target);
                if (target == coords.length){
                    target = 0;
                    console.log(222222222222222222222)
                    window.reached_destination[localStorage.getItem("pickdriver_id")] = true;
                }
                else{
                    goToPointTimeOut = setTimeout(goToPoint, delay);
                }
            }
        }
        moveMarker();
    }
    goToPoint();
}
