//File: recall.js
//Author: Patrick Seet
//Demo Project

//Fetch recall information using Year ID 
function parseRecall(JSONObj){

	var JObj = JSON.parse(JSONObj.responseText);

  if(JObj.recallHolder.length == 0 ){
        $('#recallTable').append('<tr><td>No recall records for this vehicle.</td></tr>');
  }
  else {
        for( var i = 0; i < JObj.recallHolder.length; i++){
              if(JObj.recallHolder[i].recallNumber != ""){
                $('#recallTable').append('<tr><td><span style="font-weight:bold">Recall Number: ' + JObj.recallHolder[i].recallNumber + '</span></td></tr>');
                $('#recallTable').append('<tr><td>Component Description: ' + JObj.recallHolder[i].componentDescription + '</td></tr>');
                $('#recallTable').append('<tr><td>Manufacturer Recall Number: ' + JObj.recallHolder[i].manufacturerRecallNumber + '</td></tr>');
                $('#recallTable').append('<tr><td>Manufacture Date: ' + JObj.recallHolder[i].manufacturedFrom + " to " + JObj.recallHolder[i].manufacturedTo + '</td></tr>');
                $('#recallTable').append('<tr><td>Number Of Vehicles Affected: ' + JObj.recallHolder[i].numberOfVehiclesAffected + '</td></tr>');
                $('#recallTable').append('<tr><td>Owner Notification Date: ' + JObj.recallHolder[i].ownerNotificationDate + '</td></tr>');
                $('#recallTable').append('<tr><td>Defect Description: ' + JObj.recallHolder[i].defectDescription + '</td></tr>');

        }
    }
  }
}

function fetchRecall(endPoint, callback) {

  var recallXhr = new XMLHttpRequest();

  //CORS request
  if ("withCredentials" in recallXhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    recallXhr.open('GET', endPoint, true);
  } 
  else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    recallXhr = new XDomainRequest();
    recallXhr.open('GET', endPoint);
  } 
  else {
    // CORS not supported.
    recallXhr = null;
    alert("Cross-Origin Resource Sharing is not supported");
  }

  //handle failure  
  recallXhr.onerror = function() {
    alert('Failed request.');
  };

  //Stores function() when state changes, if 4 and 200 then call callback
  recallXhr.onreadystatechange = function(){

    //4 = operation complete  
    if(recallXhr.readyState == 4){
      //200 = status ok
      if(recallXhr.status == 200){
        callback(recallXhr);
        }   
      }
  };
  recallXhr.send();
}

function getRecall() {
		
	fetchRecall(Car.RecallUrl, parseRecall);

}
