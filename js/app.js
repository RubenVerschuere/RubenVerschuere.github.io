const disclaimer = document.querySelector('.disclaimer');
const list = document.querySelector('.list');
const update = document.querySelector('.updated');
const rate = document.querySelector('.rate-amount');

let eur = [];
let gbd=[];
let usd=[];

window.addEventListener('load', e => {
    updateCurrencies();
    setInterval(function () {
        updateCurrencies()
    }, 5000);
    addEventListeners();
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    deferredPrompt.prompt();
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
});

function addEventListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(element => {
        element.addEventListener('click', function () {

        });
    });
}

updateCurrencies = async () => {
    updateLoader(true);
    const res = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
    const json = await res.json();
    console.log(json);
    let title = document.querySelector(".mdl-layout-title");
    title.innerHTML = json.chartName
    disclaimer.innerHTML = createSymbol(json);
    list.innerHTML = createCurrencie(json.bpi);
    update.innerHTML = new Date(json.time.updated).toLocaleTimeString();
    rate.innerHTML = `${json.bpi.EUR.symbol} ${json.bpi.EUR.rate}`
    checkArrays(json.bpi);
    setTimeout(function () {
        //console.log("updated: " + new Date().toLocaleDateString() + " / " + new Date().toLocaleTimeString());
        updateLoader(false);
    }, 1500);
}

checkArrays = (json) => {
    if (eur.length < 2) {
        eur.push(json.EUR.rate);
    } else {
        let eurRate = document.querySelector('.eurrate');
        eur.reverse();
        eur[1] = json.EUR.rate;
        if (eur[1] > eur[0]) {
            eurRate.classList.add('green');
        } else if (eur[1] < eur[0]) {
            eurRate.classList.add('red');
        }
    }
    console.log(eur);
    if (gbd.length < 2) {
        gbd.push(json.GBP.rate);
    } else {
        gbd.reverse();
        gbd[1] = json.GBP.rate;
        if (gbd[1] > gbd[0]) {
            let gbdrRate = document.querySelector('.gbdrate');
            gbdRate.classList.add('green');
        } else if (gbd[1] < gbd[0]) {
            let gbdRate = document.querySelector('.gbdrate');
            gbdRate.classList.add('red');
        }
    }
    if (usd.length < 2) {
        usd.push(json.USD.rate);
    } else {
        usd.reverse();
        usd[1] = json.USD.rate;
        if (usd[1] > usd[0]) {
            let usdRate = document.querySelector('.usdrate');
            usdRate.classList.add('green');
        } else if (usd[1] < usd[0]) {
            let usdRate = document.querySelector('.usdrate');
            usdRate.classList.add('red');
        }
    }
}

updateLoader = (on) => {
    let loader = document.querySelector(".mdl-progress");
    if (on) {
        loader.classList.add("mdl-progress__indeterminate");
    } else {
        loader.classList.remove("mdl-progress__indeterminate")
    }
}

createSymbol = (json) => {
    return `
        <div class="symbol">
        <div>

            <p>${json.disclaimer}</p>
           
     
         </div>
         <div>
            <p></p>
         </div>
        </div>
    `
}

createCurrencie = (json) => {
    return `
    <div class="cell mdl-cell mdl-cell--12-col ">
    <div class="cell-header">
      <div class="padding" style="display: flex; flex-direction: row; align-items: center;">
        <div style="color: #f9aa33;  font-size: 2em;">
        ${json.EUR.symbol}
        </div>
        <div style="display: flex; flex-direction: column; margin-left: 0.5em;">
          <div style="font-weight: bold;">${json.EUR.code}</div>
          <div>Bitcoin</div>
        </div>
      </div>
      <div class="padding eurrate"> ${json.EUR.symbol} ${json.EUR.rate}</div>
    </div>
    <div class="cell-content">
      <div class="padding">${json.EUR.description}</div>
      <div class="padding"></div>
    </div>

  </div>
  <div class="cell mdl-cell mdl-cell--12-col ">
  <div class="cell-header">
    <div class="padding" style="display: flex; flex-direction: row; align-items: center;">
      <div style="color: #f9aa33;  font-size: 2em;"">
      ${json.GBP.symbol}
      </div>
      <div style="display: flex; flex-direction: column; margin-left: 0.5em;">
        <div style="font-weight: bold;">${json.GBP.code}</div>
        <div>Bitcoin</div>
      </div>
    </div>
    <div class="padding gbdrate"> ${json.GBP.symbol} ${json.GBP.rate}</div>
  </div>
  <div class="cell-content">
    <div class="padding">${json.GBP.description}</div>
    <div class="padding"></div>
  </div>

</div>
<div class="cell mdl-cell mdl-cell--12-col ">
<div class="cell-header">
  <div class="padding" style="display: flex; flex-direction: row; align-items: center;">
    <div style="color: #f9aa33;  font-size: 2em;"">
    ${json.USD.symbol}
    </div>
    <div style="display: flex; flex-direction: column; margin-left: 0.5em;">
      <div style="font-weight: bold;">${json.USD.code}</div>
      <div>Bitcoin</div>
    </div>
  </div>
  <div class="padding usdrate"> ${json.USD.symbol} ${json.USD.rate}</div>
</div>
<div class="cell-content">
  <div class="padding">${json.USD.description}</div>
  <div class="padding"></div>
</div>
</div>
    `
}