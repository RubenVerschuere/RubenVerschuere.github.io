window.addEventListener("load", function(e){
    if(navigator.onLine){
        UpdateOnlineStatus(true);
    }
    else {
        UpdateOnlineStatus(false)
    }
});



window.addEventListener("online", function(e){
    UpdateOnlineStatus(true);
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    'use strict';
    var data = {
      message: 'Online',
      timeout: 2000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
});

window.addEventListener("offline", function(e){
    UpdateOnlineStatus(false);
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    'use strict';
    var data = {
      message: 'Offline',
      timeout: 2000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
});

function UpdateOnlineStatus(online) {
    let online_detector = document.querySelector(".online-detector");
    if(online){
        online_detector.innerHTML = `<span class="green">Online</span>`
    }
    else {
        online_detector.innerHTML = `<span class="red">Offline</span>`
    }
}