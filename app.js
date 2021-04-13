const baseUrl = "https://restcountries.eu/rest/v2/all";
const search = document.querySelector("#search");
const matches = document.querySelector("#matches");
let output = "";
let cities = []; //new Promise(resolve, reject);

const getMatchingCities = async (searchTerm) => {      
   
  let locations = await fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error)); 

  
   locations = locations.filter(item => {
                    const regex = new RegExp(`^${searchTerm}`,'gi');
                    return item.name.match(regex) || item.capital.match(regex);
                });  
    
   
   if(searchTerm.length === 0){
       locations = [];       
   }
   
   bindMatches(locations)
};

function bindMatches(resultMatches) {
    const outputHtml = resultMatches.map(result => {
                       return `<div class="card card-header bg-warning mb-1 text-left">
                                <h5><span class="text-info text-left">${result.capital === '' ? 'Capital not found': result.capital} - </span>
                                    <span class="text-muted">(${result.name}</span><span class="text-muted">)</span></h5>
                                <h5><span class="text-info">
                                        Currency:
                                    </span>
                                    <span class="text-secondary">${result.currencies[0].name} (</span><span class="text-secondary">${result.currencies[0].symbol})</span>                                    
                                </h5><strong><span class="text-info mr-2">Population:</span><span class="text-muted">${result.population}</span></strong>
                                <img src=${result.flag} class="mt-2" height="50px" width="65x" alt='No flag avaiable' />                                
                               </div>`;
    }).join('');

    matches.innerHTML = outputHtml;
}
search.addEventListener("input", (e) => getMatchingCities(e.target.value));
