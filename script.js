

const latitude = "43.668420";
const longitude = "-70.247750";


window.onload = () => {
    return navigator.geolocation.getCurrentPosition(function(position) {
        renderModel(position.coords);
    });
}


const renderModel = (location) => {

    let scene = document.querySelector('a-scene');

    let latitude = location.latitude;
    let longitude = location.longitude;
    alert("loaded", latitude, longitude);
    alert("loaded", latitude, longitude);


    let model = document.createElement('a-sphere');
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    model.setAttribute("color","#4CC3D9");
    model.setAttribute("radius", "1.25");
    //model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
    //model.setAttribute('rotation', '0 180 0');
    //model.setAttribute('animation-mixer', '');
    //model.setAttribute('scale', '0.1 0.1 0.1');

    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    });

    scene.appendChild(model);
}