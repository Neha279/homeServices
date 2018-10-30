'use strict';

const STANDARD_HOURS = 8; // Lets assume 8 is a standard time

function groupBy(objectArray, property, clientId) {
  	return objectArray.reduce(function (allocate, obj) {
  		var key = obj[property];
  		if (!allocate[key]) {
          allocate[key] = [];
        }
	    if(clientId.indexOf(obj[property])==-1){
	      clientId.push(obj[property]);
	    }
	    return allocate;
    }, {});
}

function getSum(arr, target){
  let results = [];
  for (let i=0; i<arr.length; i++) {
    for (let j=i+1; j<arr.length; j++) {
      if (arr[j].hours === target - arr[i].hours) {
        results.push(arr[i], arr[j]);
        break;
      }
    }
  }
  return results;
}
function insertData(inArr, outArray, property){ //collects all requests 
	var o = new Array();
	for(var i in inArr){
		if( inArr[i][property])
			{ o.push(inArr[i][property]); } 
	}
    outArray.push({"requests" : o});

}
function remove(a,b) {
	var t =  a.filter(function(objFromA) {
	  return !b.find(function(objFromB) {
	    return objFromA.requestId === objFromB.requestId
	  })
	});
	return t;
}
exports.allocateAndReport = function (requests) {
	var postdata = requests.body;
	console.log("BODY " , postdata);
    var butlers = new Array();
    var spreadClientIds = new Array ();

    if(postdata != null && postdata.length>0){
    	console.log("Lets group the all request : " , postdata.length);
    	try{
			var len = postdata.length;
			var o = new Array();
			groupBy(postdata, 'clientId', spreadClientIds); //group client ids
			for(var i =0; i<len;i++){
				var v = getSum(postdata, STANDARD_HOURS); //lets sum up base on standard hours
				insertData(v, butlers, 'requestId'); 
				postdata = remove(postdata,v);
				len = postdata.len;
			}
			insertData(postdata, butlers, 'requestId'); // rest all 

			return {butlers : butlers, spreadClientIds :spreadClientIds};  
		} catch(err){
		    console.log(err);
		    return { message: "Error on parsing data.." };
		}
	}
	return { message: "Invalid Data !" }; //we can improve the error handling by adding more checks & various http status--
};