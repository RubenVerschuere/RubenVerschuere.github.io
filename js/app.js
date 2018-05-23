const disclaimer = document.querySelector('.disclaimer');
const list = document.querySelector('.list');

window.addEventListener('load', e => {
    updateCurrencies();
    setInterval(function(){
         updateCurrencies() 
    }, 10000);
    addEventListeners();
});

function addEventListeners() {
    let refresh = document.querySelector(".refresh");
    refresh.addEventListener("click", function(e){
        updateCurrencies();
    });
}

updateCurrencies = async () => {
    updateLoader(true);
    const res = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
    const json = await res.json();
    let title = document.querySelector(".mdl-layout-title");
    title.innerHTML = json.chartName
    disclaimer.innerHTML = createSymbol(json);
    list.innerHTML = createCurrencie(json.bpi);
    setTimeout(function(){
        //console.log("updated: " + new Date().toLocaleDateString() + " / " + new Date().toLocaleTimeString());
        updateLoader(false);
    }, 1500);
}

updateLoader = (on) => {
    let loader = document.querySelector(".mdl-progress");
    if(on) {
        loader.classList.add("mdl-progress__indeterminate");
    }
    else {
        loader.classList.remove("mdl-progress__indeterminate")
    }
}

createSymbol = (json) => {
      return `
        <div class="symbol">
        <div>
         <a> 
            <p>${json.disclaimer}</p>
            <p>Last updated: ${new Date(json.time.updated).toLocaleDateString()} / ${new Date(json.time.updated).toLocaleTimeString()}</p>
         </a>
         </div>
         <div>
            <p></p>
         </div>
        </div>
    `
}

createCurrencie = (json) => {
    return `
    <div class="symbol bg">
    <div>
     <a> 
        <p>${json.EUR.code}</p>
        <p> ${json.EUR.symbol} ${json.EUR.rate}</p>
        <p>${json.GBP.code} </p>
       <p> ${json.GBP.symbol} ${json.GBP.rate} </p>
        <p>${json.USD.code} </p>
        <p>${json.USD.symbol} ${json.USD.rate}</p>
     </a>
     </div>
    </div>
    `
}