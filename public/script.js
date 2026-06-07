

async function getWeather() {
    const search = document.getElementById("searchbar").value;

    const city=search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();

    if (!city) {
        alert("Please enter a city");
        return;
    }

    const response = await fetch(`/weather/${city}`);
    const data = await response.json();

    // for hidden
    document.querySelector(".main").style.display = "flex";
    document.querySelector(".footer").style.display = "flex";

    // console.log(data);
    

    document.getElementById("cityname").innerHTML = data.location.name;
    document.getElementById("ctemp").innerHTML = data.current.temp_c;
    document.getElementById("min-max").innerHTML = Math.round(parseInt(data.forecast.forecastday[0].day.maxtemp_c))+" / "+Math.round(parseInt(data.forecast.forecastday[0].day.mintemp_c));
    document.getElementById("feels-like").innerHTML = "Feels like "+ Math.round(parseInt(data.current.feelslike_c))+ "°C";
    document.getElementById("conditions").innerHTML = data.current.condition.text;
    document.getElementById("brimg").innerHTML =`<img src="${data.current.condition.icon}" alt="weather icon">`;
    document.getElementById("cod").innerHTML = data.current.cloud +" %";
    document.getElementById("crd").innerHTML = data.current.chance_of_rain +" %";
    
    /////
    const days = [
        "Sunday    ",
        "Monday    ",
        "Tuesday   ",
        "Wednesday ",
        "Thursday  ",
        "Friday    ",
        "Saturday  "
    ];
    let dayo=data.forecast;
    for(let i=0; i<=6;i++){
        const dateStr = data.forecast.forecastday[i].date;

        const dateObj = new Date(dateStr);

        document.getElementById(`day${i}`).innerHTML =days[dateObj.getDay()];
        
        document.getElementById(`rain${i}`).innerHTML=dayo.forecastday[i].day.daily_chance_of_rain+ "%";
        document.getElementById(`minmax${i}`).innerHTML=Math.round(parseInt(dayo.forecastday[i].day.maxtemp_c))+" / "+Math.round(parseInt(dayo.forecastday[i].day.mintemp_c));
        
    }

    console.log(dayo.forecastday[1].day);
    



    ////////

    function getAQIText(index) {
        if (index === 1) return "Good 😊";
        if (index === 2) return "Moderate 🙂";
        if (index === 3) return "Unhealthy for sensitive groups 😷";
        if (index === 4) return "Unhealthy 🤢";
        if (index === 5) return "Very Unhealthy ☠️";
        return "Unknown";
    }
    const aqi = data.current.air_quality["us-epa-index"];
    document.getElementById("aqi").innerText = getAQIText(aqi);
    

    document.getElementById("humidity").innerHTML = data.current.humidity +" %";
    document.getElementById("wind").innerHTML = data.current.wind_kph +" km/h";
    
    let uvi=parseInt(data.current.uv)
    let uvIndex="";
    if(uvi>=11){
        uvIndex="Extreme"
    }
    else if(uvi>=8){
        uvIndex="Very High"
    }
    else if(uvi>=6){
        uvIndex="High"
    }
    else if(uvi>=3){
        uvIndex="Moderate"
    }
    else {
        uvIndex="Low"
    }
    
    document.getElementById("uv").innerHTML = uvIndex;
    document.getElementById("pressure").innerHTML = data.current.pressure_mb +"mb";
    let vis=parseInt(data.current.vis_km);
    let visib="";
    if(vis>=10){
        visib="Excellent"
    }
    else if(vis>=5){
        visib="Good"
    }
    else if(vis>=2){
        visib="Moderate"
    }
    else if(vis>=1){
        visib="Poot"
    }
    else if(vis>=0.2){
        visib="Very Poor"
    }
    else{
        visib="Extremely Poor"
    }
    document.getElementById("visiblity").innerHTML = visib ;
    document.getElementById("dew").innerHTML = data.current.dewpoint_c +"°C";

    


    document.getElementById("sunrise").innerHTML = data.forecast.forecastday[0].astro.sunrise;
    document.getElementById("sunset").innerHTML = data.forecast.forecastday[0].astro.sunset;
    document.getElementById("moonrise").innerHTML = data.forecast.forecastday[0].astro.moonrise;
    document.getElementById("moonset").innerHTML = data.forecast.forecastday[0].astro.moonset;



    document.getElementById("updated").innerHTML =" "+ data.location.localtime;
}