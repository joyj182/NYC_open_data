let data, info;

async function init(){   
  let link = "arrest.json";
  info = await fetch(link);
  data = await info.json();
  
  let output = document.getElementById("output");
  let build = "";

  for(let i = 0; i < data.length; i+=1){
    let arrest = data[i];
    build += `<div class="fitted card">
                <h1> ${arrest.ofns_desc }</h1>
                <h3>${arrest.arrest_key}</h3>
                <hr>
                <p>${arrest.perp_sex}</p>
                <p>${arrest.perp_race} </p>
                <p> ${arrest.age_group}</p>
                <hr>
                <p>${arrest.law_code}</p>
              </div>` ;   
  }
  output.innerHTML = build;
}
