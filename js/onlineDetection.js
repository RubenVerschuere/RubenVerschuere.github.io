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
});

window.addEventListener("offline", function(e){
    UpdateOnlineStatus(false);
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