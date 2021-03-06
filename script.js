

AFRAME.registerComponent('cursor-listener', {
    init: function () {
      var lastIndex = -1;
      var COLORS = ['red', 'green', 'blue'];
      console.log("made it here", this.el);
      alert(`init ${this.el.id}`);
      this.el.addEventListener('click', function (evt) {
        lastIndex = (lastIndex + 1) % COLORS.length;
        this.setAttribute('material', 'color', COLORS[lastIndex]);
        console.log('I was clicked at: ', evt.detail.intersection.point);
        alert("I was clicked at", JSON.stringify(evt.detail));
      });
    }
  });



window.onload = () => {
    return navigator.geolocation.getCurrentPosition(function(position) {
        renderModel(position.coords);
    });
}


const renderModel = (location) => {

    let scene = document.querySelector('a-scene');

    let latitude = location.latitude;
    let longitude = location.longitude;
    alert(`loaded ${latitude}, ${longitude}`);
    console.log("loaded", latitude, longitude);


    let model = document.createElement('a-sphere');
    model.setAttribute("id", "sphere");
    model.setAttribute("cursor-listener", "true");
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    model.setAttribute("color","#4CC3D9");
    model.setAttribute("radius", "4");
    //model.setAttribute('gltf-model', './assets/magnemite/scene.gltf');
    //model.setAttribute('rotation', '0 180 0');
    //model.setAttribute('animation-mixer', '');
    //model.setAttribute('scale', '0.1 0.1 0.1');

    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    });

    scene.appendChild(model);
}


function nodeToString(node) {
  return node.tagName + " id=" + node.id + " class=" + node.className;
}

function printExpand(node, level) {
  console.log(Array(level).fill("  ").join("") + nodeToString(node));
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      printExpand(node.children[i], level + 1)
    }
  }
}

console.expand = (node) => printExpand(node, 0);

var sliders = document.querySelectorAll(".slider-item");
sliders.forEach(slider =>   
  slider.addEventListener("mouseover", function(e) {
    var bobCard = slider.querySelector(".bob-container span .bob-card") ;
    console.expand(bobCard);
  }));
