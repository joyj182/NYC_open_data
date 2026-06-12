let data, info, mapObj;

function showMap(lat,lon){
  let location = [lat, lon];
  //Line below needed to create the map object once.
  if(!mapObj){
      mapObj = L.map("map");
  } 
  let map = mapObj.setView(location, 18);// [lat, lon], zoom

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);// places marker on map
}


async function init(){   
  let link = "arrest.json";
  info = await fetch(link);
  data = await info.json();
  
  let output = document.getElementById("output");
  let build = "";

  for(let i = 0; i < data.length; i+=1){
    let arrest = data[i];
    build += `<div class="fitted card">
                <h1>${arrest.ofns_desc }</h1>
                <h3>${arrest.arrest_key}</h3>
                <hr>
                <p>Gender: ${arrest.perp_sex}</p>
                <p>Race: ${arrest.perp_race} </p>
                <p>Age: ${arrest.age_group}</p>
                <hr>
                <p>${arrest.law_code}</p>`
              if(arrest.latitude && arrest.longitude){
                    build += `<input type="button" value="Map" onclick="showMap( ${arrest.latitude}, ${arrest.longitude} )">`;
                  };   
          build+= `</div>`;
  }
  output.innerHTML = build;
}


function filterByGenderRace(){
  let output = document.getElementById("output");
  let g = document.getElementById("gender").value;
  let r = document.getElementById("race").value;
  let result = document.getElementById("result");
  
  let build = "";
  let ct = 0;

  for(let i = 0; i < data.length; i+=1){
    let arrest = data[i];
    if(arrest.perp_sex == g && arrest.perp_race == r){
      build += `<div class="fitted card">
                <h1>${arrest.ofns_desc}</h1>
                <h3>${arrest.arrest_key}</h3>
                <hr>
                <p>Gender: ${arrest.perp_sex}</p>
                <p>Race: ${arrest.perp_race} </p>
                <p>Age: ${arrest.age_group}</p>
                <hr>
                <p>${arrest.law_code}</p>` ; 
                if(arrest.latitude && arrest.longitude){
                    build += `<input type="button" value="Map" onclick="showMap( ${arrest.latitude}, ${arrest.longitude} )">`;
                  };   
          build+= `</div>`;
      ct += 1;        
    }
  }
  result.innerHTML = `${ct} Results found.`;
  output.innerHTML = build; 
}

function filterByAge(){
    let age = document.getElementById("age").value;
    let result = document.getElementById("result");
  
    let build = "";
    let ct = 0;

    for(let i = 0; i < data.length; i+=1){
    let arrest = data[i];
    if(arrest.age_group == age){
      build += `<div class="fitted card">
                <h1>${arrest.ofns_desc}</h1>
                <h3>${arrest.arrest_key}</h3>
                <hr>
                <p>Gender: ${arrest.perp_sex}</p>
                <p>Race: ${arrest.perp_race} </p>
                <p>Age: ${arrest.age_group}</p>
                <hr>
                <p>${arrest.law_code}</p>` 
                if(arrest.latitude && arrest.longitude){
                    build += `<input type="button" value="Map" onclick="showMap( ${arrest.latitude}, ${arrest.longitude} )">`;
                  };   
          build+= `</div>`;; 
      ct += 1;        
    }
  }
  result.innerHTML = `${ct} Results found.`;
  output.innerHTML = build; 
}


function filterByOffense(){
    let of = document.getElementById("offense").value;
    let result = document.getElementById("result");
  
    let build = "";
    let ct = 0;

    for(let i = 0; i < data.length; i+=1){
    let arrest = data[i];
    if(arrest.ofns_desc == of){
      build += `<div class="fitted card">
                <h1>${arrest.ofns_desc}</h1>
                <h3>${arrest.arrest_key}</h3>
                <hr>
                <p>Gender: ${arrest.perp_sex}</p>
                <p>Race: ${arrest.perp_race} </p>
                <p>Age: ${arrest.age_group}</p>
                <hr>
                <p>${arrest.law_code}</p>` 
                if(arrest.latitude && arrest.longitude){
                    build += `<input type="button" value="Map" onclick="showMap( ${arrest.latitude}, ${arrest.longitude} )">`;
                  };   
          build+= `</div>`;; 
      ct += 1;        
    }
  }
  result.innerHTML = `${ct} Results found.`;
  output.innerHTML = build; 
}

function updateChart() {

    let chartType = document.getElementById("chartType").value;

    let columns = [
        ["<18", boroughData["<18"]],
        ["18-24", boroughData["18-24"]],
        ["25-44", boroughData["25-44"]],
        ["45-64", boroughData["45-64"]]
    ];

    document.getElementById("analysisText").innerHTML =
        "This chart compares arrest counts by age group. The 18-24 age group currently has the highest arrest count in this sample dataset.";

    chart.destroy();

    chart = c3.generate({
        bindto: "#chart",

        data: {
            columns: columns,
            type: chartType
        },

        donut: {
            title: "Arrests"
        }
    });
}




