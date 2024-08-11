function resize_graph() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  d3.select("#scene-container").attr(
    "style",
    "width:" + (w * 2 * 0.985) / 3 + "px; " + "height:" + h + "px;"
  );
}
function resize_left_area() {
  var w = document.getElementById("left_area").offsetWidth;
  var h = window.innerHeight;
  d3.select("#search_input").attr("style", "width: " + w * 0.98 + "px;");

  d3.select("#search_list").attr(
    "style",
    "height: " +
      h * 0.6 +
      "px; width: " +
      w * 0.98 +
      "px; overflow: auto;font:16px; background-color:#FBE8E8;color:black;font-family:sans-serif;"
  );
}
function resize_right_area() {
  var w = document.getElementById("right_area").offsetWidth;
  var h = window.innerHeight;
  d3.select("#neighbors_list").attr(
    "style",
    "height: " +
      h * 0.7 +
      "px; width: " +
      w * 0.92 +
      "px; overflow: auto;font:16px; background-color:#EEFFE7 ;color:black;font-family:sans-serif;"
  );
}

function deselect_word() {
  d3.select(selected_list_item).attr("style", "cursor: pointer;");
  selected_mesh.material.color.setHex(normal_color);
  selected_list_item = null;
  selected_mesh = null;
  controls.target = new THREE.Vector3(0, 0, 0);
  camera.position.set(120, 120, 120);
  camera.lookAt(0, 0, 0);
  d3.select("#selected_word").attr("style", "display: none");
  d3.select("#clear_select_button").attr("disabled", "");
  de_paint_neighbors();
  wordlist_.clear();
}

function select_word(element) {
  if (selected_list_item != null) {
    d3.select(selected_list_item).attr("style", "cursor: pointer;");
    if (selected_list_item == element) {
      if (selected_mesh != null) {
        selected_mesh.material.color.setHex(normal_color);
      }
      deselect_word();
      return;
    }
  }
  d3.select(element).attr(
    "style",
    "list-style-position: inside;border: 1px solid black; cursor: pointer;"
  );
  selected_list_item = element;
  highlight_exists = true;
  word = element.innerHTML;
  scene.traverse(function (child) {
    if (child.name == word) {
      x = child.position.x;
      y = child.position.y;
      z = child.position.z;
      if (selected_mesh != null) {
        selected_mesh.material.color.setHex(normal_color);
      }
      selected_mesh = child;
    }
  });
  selected_mesh.material.color.setHex(0xff0800);

  var x_ = x <= 0 ? x - 10 : x + 10;
  var y_ = y <= 0 ? y - 10 : y + 10;
  var z_ = z <= 0 ? z - 10 : z + 10;
  camera.position.set(x_, y_, z_);
  camera.lookAt(x, y, z);
  controls.target = new THREE.Vector3(x, y, z);
  var vector = new THREE.Vector3();
  selected_mesh.updateMatrixWorld();
  vector.setFromMatrixPosition(selected_mesh.matrixWorld);
  vector.project(camera);

  x = window.innerWidth / 2;
  y = window.innerHeight / 2;
  d3.select("#selected_word")
    .attr(
      "style",
      "color: " +
        word_color +
        "; display: block; top:" +
        (y - 25) +
        "px; left:" +
        (x + 15) +
        "px"
    )
    .text(word);
  d3.select("#clear_select_button").attr("disabled", null);
  update_neighbor_list(neighbors_num, distance_type);
}
function initialize_word_list(wordlist) {
  d3.json(json_dir, function (values) {
    keys = Object.keys(values);
    d3.select("#word_count").html("Total:" + keys.length);
    for (var i = 0; i < keys.length; i++) {
      wordlist.add({ name: keys[i] });
    }
  });
}

function update_neighbor_list(neighbors_num, distance_type) {
  wordlist_.clear();
  var selected = selected_list_item.innerHTML;

  if (distance_type == "cosine") {
    neighbor_indice = 1;
    distance_indice = 2;
  } else {
    neighbor_indice = 3;
    distance_indice = 4;
  }
  de_paint_neighbors();
  d3.json(json_dir, function (values) {
    neighbors = values[selected][neighbor_indice];
    distance = values[selected][distance_indice];
    for (var i = 0; i < neighbors_num; i++) {
      wordlist_.add({
        name:
          "&nbsp" +
          neighbors[i] +
          "   " +
          Math.round(distance[i] * 100000) / 100000,
      });
      paint_word(neighbors[i]);
    }
  });
}

function paint_word(to_paint) {
  scene.traverse(function (child) {
    if (child.name == to_paint) {
      child.material.color.setHex(highlight_color);
      painted_neighbor.push(child);
    }
  });
}

function de_paint_neighbors() {
  if (painted_neighbor.length != 0) {
    for (var i = 0; i < painted_neighbor.length; i++) {
      painted_neighbor[i].material.color.setHex(normal_color);
    }
    painted_neighbor = [];
  }
}
