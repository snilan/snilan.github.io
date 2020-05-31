

const latitude = "43.668420";
const longitude = "-70.247750";


window.onload = () => {
    return navigator.geolocation.getCurrentPosition(function(position) {

        renderModel(position.coords);
    });
}


const renderModel = (location) => {

    let scene = document.querySelector('a-scene');

    let latitude = location.lat;
    let longitude = location.lng;

    let model = document.createElement('a-entity');
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
    model.setAttribute('rotation', '0 180 0');
    model.setAttribute('animation-mixer', '');
    model.setAttribute('scale', '0.5 0.5 0.5');

    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    });

    scene.appendChild(model);
}