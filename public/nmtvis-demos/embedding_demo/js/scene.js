let container;
let camera;
let controls;
let renderer;
let scene;
let mesh;
var mouse = { x: 0, y: 0 };
var highlighted = null;

function init() {
  container = document.querySelector("#scene-container");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(background_color);

  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();

  create_words();
  renderer.setAnimationLoop(() => {
    update();
    render();
  });

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  window.addEventListener("resize", onWindowResize);
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    70,
    container.clientWidth / container.clientHeight,
    1,
    10000
  );

  camera.position.set(120, 120, 120);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}

function createLights() {
  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 5);

  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(0, 1500, 200);

  scene.add(ambientLight, mainLight);
}

function createMeshes() {
  createaxis();
  creategrid();
}

function createaxis() {
  axesHelper = new THREE.AxesHelper(5000);
  scene.add(axesHelper);
}

function creategrid() {
  xy = new THREE.GridHelper(200, 10, grid_color, grid_color);
  xy.rotateX(-Math.PI / 2);
  xy.position.y = 0;
  xy.material.opacity = 0.25;
  xy.material.transparent = true;
  scene.add(xy);

  yz = new THREE.GridHelper(200, 10, grid_color, grid_color);
  yz.rotateZ(-Math.PI / 2);
  yz.position.y = 0;
  yz.material.opacity = 0.25;
  yz.material.transparent = true;
  scene.add(yz);

  xz = new THREE.GridHelper(200, 10, grid_color, grid_color);
  xz.position.y = 0;
  xz.material.opacity = 0.25;
  xz.material.transparent = true;
  scene.add(xz);
}
function createword(x, y, z, name) {
  var geometry = new THREE.SphereBufferGeometry(
    0.86,
    50,
    50,
    0,
    Math.PI * 2,
    0,
    Math.PI
  );
  var material = new THREE.MeshStandardMaterial({ color: normal_color });
  var word = new THREE.Mesh(geometry, material);
  word.position.x = x;
  word.position.y = y;
  word.position.z = z;
  word.name = name;
  scene.add(word);
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
}

function update() {}
function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}
function highlight(x, y) {
  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  is_mesh = false;
  var index;
  for (index = 0; index < intersects.length; index++) {
    if (
      intersects[index].object.type == "Mesh" &&
      intersects[index].object.name
    ) {
      is_mesh = true;
      break;
    }
  }
  if (is_mesh == true) {
    var change_color_flag = true;
    var name = intersects[index].object.name;
    if (selected_mesh != null && selected_mesh.name == name) {
      return;
    }
    if (painted_neighbor.includes(intersects[index].object)) {
      change_color_flag = false;
    }
    if (highlighted != intersects[index] && highlighted) {
      highlighted.object.material.color.setHex(normal_color);
      highlighted = null;
    }
    if (change_color_flag) {
      intersects[index].object.material.color.setHex(highlight_color);
      highlighted = intersects[index];
    }

    wordelement = document.getElementById("word");
    d3.select("#word")
      .attr(
        "style",
        "color: " +
          word_color +
          "; display: block; top:" +
          (y - 20) +
          "px; left:" +
          (x + 5) +
          "px"
      )
      .text(name);
  } else {
    if (highlighted) {
      highlighted.object.material.color.setHex(normal_color);
      highlighted = null;
    }
    d3.select("#word").attr("style", "display: none");
  }
}

function onDocumentMouseMove(event) {
  offset =
    window.scrollX +
    document.querySelector("#scene-container").getBoundingClientRect().left;
  mouse.x =
    ((event.clientX - offset) / ((window.innerWidth * 2 * 0.985) / 3)) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  highlight(event.clientX, event.clientY);
}

function create_words() {
  d3.json(json_dir, function (values) {
    keys = Object.keys(values);
    for (var i = 0; i < keys.length; i++) {
      var embedding = values[keys[i]][0];
      var word = keys[i];
      createword(
        embedding[0] * 100,
        embedding[1] * 100,
        embedding[2] * 100,
        word
      );
    }
  });
}

function change_background() {
  scene.background = new THREE.Color(background_color);
}

function repaint_grid_and_all_words() {
  scene.traverse(function (child) {
    if (child.type == "Mesh") {
      child.material.color.setHex(normal_color);
    }
  });
  scene.remove(axesHelper);
  if (axis_exists) {
    createaxis();
  }
  scene.remove(xy);
  scene.remove(yz);
  scene.remove(xz);
  if (grid_exists) {
    creategrid();
  }
}

function repaint_all() {
  change_background();
  repaint_grid_and_all_words();
}

function view_in_light_mode() {
  word_color = 0x000000;
  grid_color = 0xff0000;
  background_color = 0xfffaef;
  normal_color = 0x001890;
  highlight_color = 0xe32636;
  repaint_all();
}
function view_in_dark_mode() {
  word_color = "white";
  grid_color = "white";
  background_color = 0x000000;
  normal_color = 0xffe54e;
  highlight_color = 0xe32636;
  repaint_all();
}

function show_or_hide_grid() {
  grid_exists = !grid_exists;
  if (grid_exists) {
    scene.remove(xy);
    scene.remove(yz);
    scene.remove(xz);
    creategrid();
  } else {
    scene.remove(xy);
    scene.remove(yz);
    scene.remove(xz);
  }
}

function show_or_hide_axis() {
  axis_exists = !axis_exists;
  if (axis_exists) {
    scene.remove(axesHelper);
    createaxis();
  } else {
    scene.remove(axesHelper);
  }
}

function show_axis() {}
function hide_axis() {}

init();
