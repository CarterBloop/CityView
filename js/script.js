
const url = window.location; 
const urlObject = new URL(url);
const s = urlObject.searchParams.get('search');
document.getElementById("theButton1").disabled = false;
document.getElementById("theButton2").disabled = false;

const getWidth = () => {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
}
const getHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
}

var zoomincrease = 0;
function zoomIn(){
    zoomincrease = zoomincrease + 1;
    loadMap();
}
function zoomOut(){
    
    zoomincrease = zoomincrease - 1;
    loadMap();
}
function loadMap() {
    var latt = 30;
    var lonn = 0;
    console.log(s) 
    console.log(`https://api.geoapify.com/v1/geocode/autocomplete?text=${s}&format=json&apiKey=a9c01d1041154d1792d278da82d3d403`);
    if(urlObject.searchParams.has('search')) {
        document.getElementById("theButton1").disabled = true;
        document.getElementById("theButton2").disabled = true;
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${s}&format=json&apiKey=a9c01d1041154d1792d278da82d3d403`)
        .then(response => response.json())
        .then(result => {
        latt = result.results[0].lat;
        lonn = result.results[0].lon;
        var cityname = result.results[0].formatted;
        console.log(cityname);
        var t = result.results[0].result_type;
        console.log(latt);
        console.log(lonn);
        console.log(t);
        var geoapp = 'https://maps.geoapify.com/v1/staticmap?style=osm-carto';
        var width = '&width='
        var w = Math.floor(getWidth());
        var height = '&height=400'
        var lonlat = '&center=lonlat:';
        var a = ',';
        var z = 3;
        if(t == "country")
        {
            z = 2;
        }
        if(t == "state")
        {
            z = 4;
        }
        if(t == "county")
        {
            z = 6;
        }
        if(t == "city")
        {
            z = 10;
        }
        if(t == "postcode")
        {
            z = 9;
        }
        if(t == "district")
        {
            z = 11;
        }
        if(t == "suburb")
        {
            z = 11;
        }
        if(t == "street")
        {
            z = 15;
        }
        if(t == "building")
        {
            z = 16;
        }
        if(t == "amenity")
        {
            z = 12;
        } 
        z = z + zoomincrease;
        console.log(z);
        var zoom = '&zoom=';
        var api = '&apiKey=a9c01d1041154d1792d278da82d3d403';

        var mapurl = geoapp + width + w + height + lonlat + lonn + a + latt + zoom + z + api;

        document.getElementById("my-map").src = mapurl;
        document.getElementById("cityname").innerHTML = cityname;
        document.getElementById("theButton1").disabled = false;
        document.getElementById("theButton2").disabled = false;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${lonn}&units=imperial&appid=fa9cc6640e23bd89f77ddc2d2989daaf`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            var temp = result.main.temp;
            console.log(temp);
            document.getElementById("temp").innerHTML = "Temperature: " +temp + "°F";
            var weatherid = result.weather[0].icon;
            var weatherurl = "https://openweathermap.org/img/wn/" + weatherid +"@2x.png"
            console.log(weatherurl);
            document.getElementById("weather").src = weatherurl;
        });
        });
    }
    else 
    {
        var image_x = document.getElementById('my-map');
        image_x.parentNode.removeChild(image_x);
    }
}

loadMap();






