if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}

if(navigator.onLine) {
    const onlineTag = document.getElementById("online_tag");
    onlineTag.textContent = "Online Version";
}

navigator.serviceWorker.ready.then(() => {
    console.log("service worker ready");
});

setTimeout(getImages, 100);

function getImages() {
    console.log("getImages");
    fetch(`https://picsum.photos/v2/list?page=2`).then(result =>
        result.json().then(json => {
            json.forEach(image => {
                const base_url = image.download_url.split(/(.*\/id\/\d{1,5}\/)/)[1];
                const img = document.createElement("img");
                img.src = base_url + "355/200";
                img.alt = base_url;
                const srcDOM = document.getElementById("images");
                srcDOM.appendChild(img);
            });
        })
    );
}