$(document).ready( function() {
    
$( "#calltaxiui" ).click(function() {
    
  $( "#calltaxiui" ).fadeOut( "slow", function() {
    $( "#searchdrivers" ).fadeIn( "slow", function() {
        
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;

// console.log(passenger_lat);
// console.log(passenger_long);

$( "#driverlist_scanner" ).load( "http://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
});
        setInterval(getdriverslist, 15000);
  });
  });
    
});
    
});
function searchdrivers_x() {
    
document.getElementById("citynavigator").style.display = "none";
document.getElementById("searchdrivers").style.display = "none";
document.getElementById("driverlist").style.display = "none";

document.getElementById("citynavigator_start").style.display = "block";
document.getElementById("mydestination").style.display = "block";

$( "#calltaxiui" ).fadeIn( "slow", function() {});

}
function getdriverslist() {
    
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;

$( "#driverlist_scanner" ).load( "http://250taxi.com/db/partner/taxi_scanner.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
});
}
function getdriversskipdestination() {
    
localStorage.setItem("destination","Not specified");
localStorage.setItem("destination_type","user_input");
    
document.getElementById("mydestination").style.display = "none";
document.getElementById("citynavigator_start").style.display = "none";
    
  $( "#driverlist" ).fadeIn( "slow", function() {     
        });   
    
}
function getdrivers() {

var taxirequest_destination = document.getElementById('taxirequest_destination').value;
    
localStorage.setItem("taxirequest_destination",taxirequest_destination);
    
var taxirequest_destination_length = taxirequest_destination.length;
    
if (taxirequest_destination_length > 2) {
    
localStorage.setItem("destination",taxirequest_destination);
localStorage.setItem("destination_type","user_input");
    
document.getElementById("mydestination").style.display = "none";
document.getElementById("citynavigator_start").style.display = "none";

$( "#driverlist" ).fadeIn( "slow", function() {});

}
else {
    alert("Please enter a destination!");
    return;
}
   
}













function citynavigator() {
    
localStorage.setItem('activity','city_navigator');
    
$( "#citynavigator_category option:selected" ).text();
    
var passenger_lat = document.getElementById("lat").value;
var passenger_long = document.getElementById("long").value;
    
$( "#citynavigatorlist" ).load( "http://250taxi.com/db/partner/city_navigator.php?passenger_lat="+passenger_lat+"&passenger_long="+passenger_long+"", function() {
    
$('#citynavigator_category').find('option:eq(0)').prop('selected', true);
    
    $( ".religious" ).wrapAll( "<div class='drawer Religious'>");
    $( ".shopping" ).wrapAll( "<div class='drawer Shopping'>");
    $( ".hotels" ).wrapAll( "<div class='drawer Hotels'>");
    $( ".restaurants" ).wrapAll( "<div class='drawer Restaurants'>");
    $( ".police" ).wrapAll( "<div class='drawer Police'>");
    $( ".banks" ).wrapAll( "<div class='drawer Banks'>");
    $( ".forex" ).wrapAll( "<div class='drawer Forex'>");
    $( ".insurance" ).wrapAll( "<div class='drawer Insurance'>");
    $( ".petrol" ).wrapAll( "<div class='drawer Petrol'>");
    $( ".schools" ).wrapAll( "<div class='drawer Schools'>");
    $( ".hospitals" ).wrapAll( "<div class='drawer Hospitals'>");
    $( ".pharmacies" ).wrapAll( "<div class='drawer Pharmacies'>");
    $( ".sights" ).wrapAll( "<div class='drawer Sights'>");
    $( ".government" ).wrapAll( "<div class='drawer Government'>");
    $( ".clubs" ).wrapAll( "<div class='drawer Clubs'>");
    
    $( "#citynavigator_category" ).change(function() {
    var citynavigator_category = $( "#citynavigator_category option:selected" ).text();
    // alert (citynavigator_category);
        
    $('.drawer').hide();
    $('.' + citynavigator_category).fadeIn('slow');
});
    
});
    
    document.getElementById("citynavigator_start").style.display = "none";
    document.getElementById("mydestination").style.display = "none";
    
    $( "#citynavigator" ).fadeIn( "slow", function() {});
}


function goplaces() {
    
var places_name = localStorage.getItem("places_name");
    
localStorage.setItem("destination",places_name);
localStorage.setItem("destination_type","city_navigator");

document.getElementById("citynavigator").style.display = "none";
$( "#driverlist" ).fadeIn( "slow", function() {

});

}

function pickdriver() {
    localStorage.setItem('activity','driver_details');
    
    document.getElementById("driverlist").style.display = "none";
    document.getElementById("menubutton").style.display = "none";
    document.getElementById("locationfieldholder").style.display = "none";
    document.getElementById("locationbutton").style.display = "none";
    document.getElementById("searchdrivers").style.display = "none";
    
    $( "#driveroverlay" ).fadeIn( "slow", function() {
        
        var pickdriver_id = localStorage.getItem("pickdriver_id");
        
        
        $( "#driveroverlay_show_details" ).load( "http://250taxi.com/db/partner/taxi_comlink_driver_details.php?pickdriver_id="+pickdriver_id+"", function() {
journey_start_map();
});
        
        $( "#driveroverlay_journey_start" ).fadeIn( "slow", function() {});
    });
}

function pickdriver_request_start () { 
    document.getElementById("driveroverlay_back_to_list").style.display = "none";
    document.getElementById("driveroverlay_journey_start").style.pointerEvents = "none";
    setTimeout(function(){
    document.getElementById("driveroverlay_journey_start").className = "waves-effect waves-dark animated zoomOut";
    }, 700);
    setTimeout(function(){
        document.getElementById("driveroverlay_journey_start").style.display = "none";
        document.getElementById("driveroverlay_journey_cancel").style.display = "block";
        document.getElementById("driveroverlay_journey_cancel").className = "waves-effect waves-dark animated zoomIn"; 
    }, 2000);
    
    var pickdriver_id = localStorage.getItem("pickdriver_id");
    var username = localStorage.getItem("username");
    var destination = localStorage.getItem("destination");
    var destination_type = localStorage.getItem("destination_type");
    
    // alert(pickdriver_id);
    
    
    $.get( "http://250taxi.com/db/partner/taxi_comlink_journey.php?task=start&username="+username+"&pickdriver_id="+pickdriver_id+"&destination="+destination+"&destination_type="+destination_type+"",  function( data ) {
        
    });
    
    
}
function pickdriver_request_cancel () { 
     document.getElementById("driveroverlay_journey_cancel_dialog").style.display = "block";    
}
function pickdriver_request_cancel_confirmed () { 
     alert("Request for driver cancelled!");
    location.reload();
}