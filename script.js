
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {

    // 2 add current latitude and longitude to url with your api key
    const url = "https://api.geoapify.com/v1/geocode/reverse?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&format=json&apiKey=753bce6a201c4f8597d1babe97b8f15e";
    
    fetch(url)
    .then(resp => resp.json())
    .then(result => result.results[0])
   .then((results) =>{

    // 3 we have got the result you can console.log it to see
    // by analysing html you will see that for user I have userLat, userLong etc and for result its resultLat,resultLong
    // the change is between user and result hence passing it as key and the result object
    changeHTML(results,"user");
});
    
}

// 1  calling getLocation function directly when js loads
getLocation();

function changeHTML( results, key){

    //4 here we will change innerhtml for these attributes using results and key+attribbute remaining id
    
    document.getElementById(key+"ZoneName").innerHTML=results.timezone.name;
    document.getElementById(key+"Lat").innerHTML=results.lat;
    document.getElementById(key+"Long").innerHTML=results.lon;
    document.getElementById(key+"STD").innerHTML=results.timezone.offset_STD;
    document.getElementById(key+"STDSeconds").innerHTML=results.timezone.offset_STD_seconds;
    document.getElementById(key+"DST").innerHTML=results.timezone.offset_DST;
    document.getElementById(key+"DSTSeconds").innerHTML=results.timezone.offset_DST_seconds;
    document.getElementById(key+"Country").innerHTML=results.country;
    document.getElementById(key+"PostCode").innerHTML=results.postcode;
    document.getElementById(key+"City").innerHTML=results.city;
   
}

function getResultLocation(){

    // on clicking submit button we will call this function

    // take input text, error-container and result-container in js
    var input = document.getElementById("address").value;
    var errorDiv = document.getElementById("error-container");
    var resultDiv = document.getElementById("result-container");

    // set error and result visiblity hidden so we cant see it initially
    errorDiv.style.visibility="hidden";
    resultDiv.style.visibility="hidden";

    // if no input is provided
    if(!input){
        errorDiv.innerHTML="Please enter an address!";
        errorDiv.style.visibility="visible";
        return;
    }

    // fetch using address
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(input)}&apiKey=753bce6a201c4f8597d1babe97b8f15e`)
    .then(resp => resp.json())
    .then((geocodingResult) => {
        //change innerHTml
	   changeHTML(geocodingResult.features[0].properties,"result");
       // set result div to be visible
       resultDiv.style.visibility="visible";
       return;
    })
    .catch((error)=>{
        // no location found
    errorDiv.innerHTML="Time zone could not be found.";
    errorDiv.style.visibility="visible";
    return;
    });


}