const disclaimer = document.querySelector('.disclaimer');
const list = document.querySelector('.list');
const update = document.querySelector('.updated');
const rate = document.querySelector('.rate-amount');

let eur = [];
let gbd = [];
let usd = [];

window.addEventListener('load', e => {
    updateCurrencies();
    setInterval(function () {
        updateCurrencies()
    }, 5000);
});


function addEventListeners(json) {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(element => {
      
        element.addEventListener("click", function () {
            cells.forEach(elementToDelete => {
                elementToDelete.classList.remove('active');
            });
            let currency = {
                'currency': element.dataset.currency
            }
            localStorage.setItem('currency', JSON.stringify(currency));
            rate.innerHTML = `${json[element.dataset.currency].symbol} ${json[element.dataset.currency].rate}`
            element.classList.add('active');
        });
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
    update.innerHTML = new Date(json.time.updated).toLocaleTimeString();
  
    checkArrays(json.bpi);
    addEventListeners(json.bpi);
    if (checkLocalStorage()) {
        let currency = JSON.parse(localStorage.getItem('currency'));
        rate.innerHTML = `${json.bpi[currency.currency].symbol} ${json.bpi[currency.currency].rate}`
    } else {
        rate.innerHTML = `${json.bpi.EUR.symbol} ${json.bpi.EUR.rate}`
    }
    setTimeout(function () {
        updateLoader(false);
    }, 1500);
}

checkLocalStorage = () => {
    if (localStorage.getItem("currency") === null) {
        let dom = document.getElementById("EUR");
        dom.classList.add('active');
        return false;
    } else {
        let currency = JSON.parse(localStorage.getItem('currency'));
        let dom = document.getElementById(currency.currency);
        dom.classList.add('active');
        return true;
    }
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
    if (gbd.length < 2) {
        gbd.push(json.GBP.rate);
    } else {
        gbd.reverse();
        gbd[1] = json.GBP.rate;
        if (gbd[1] > gbd[0]) {
            let gbdRate = document.querySelector('.gbdrate');
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

            <small>${json.disclaimer}</small>
           
     
         </div>
         <div>
            <p></p>
         </div>
        </div>
    `
}

createCurrencie = (json) => {
    return `
    <div class="cell mdl-cell mdl-cell--12-col " id="${json.EUR.code}" data-currency="${json.EUR.code}">
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
  <div class="cell mdl-cell mdl-cell--12-col " id="${json.GBP.code}" data-currency="${json.GBP.code}">
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
<div class="cell mdl-cell mdl-cell--12-col"  id="${json.USD.code}" data-currency="${json.USD.code}" >
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