function view_as_heatmap() {
  reset_threshold();
  view_mode = "heatmap";
  d3.select("#line_graph")
    .style("width", 0)
    .style("height", 0);
  d3.select("#highlight_graph")
    .style("width", 0)
    .style("height", 0);
  document.getElementById("heatmap").style.display = "block";
  head_selector = document.getElementById("head_selector");
  head_selector.innerHTML =
    '<option value="0">0</option><option value="1">1</option><option value = "2">2</option ><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="avg">Average</option>';

  draw_heatmap(0, attention_type_upper, attention_type_lower);
}

function draw_heatmap(
  threshold = 0,
  attention_type_upper,
  attention_type_lower
) {
  if (attention_type_upper == "source" && attention_type_lower == "source") {
    json_dir = "./encoder_self_attention.json";
  } else if (
    attention_type_upper == "source" &&
    attention_type_lower == "target"
  ) {
    json_dir = "./decoder_encoder_attention.json";
  } else if (
    attention_type_upper == "target" &&
    attention_type_lower == "target"
  ) {
    json_dir = "./decoder_self_attention.json";
  }
  d3.json(json_dir, function(values) {
    var value = values[current_index - 1];

    var x_axis = value.lower_sentence;
    var y_axis = value.upper_sentence;

    current_head_ = current_head == Number.POSITIVE_INFINITY ? 0 : current_head;
    matrix = value["layer_" + layer + "-head_" + current_head_];
    attention = [];
    for (var i = 0; i < y_axis.length; i++) {
      for (var j = 0; j < x_axis.length; j++) {
        attention.push(matrix[i][j]);
      }
    }
    max_attention = draw_histogram(attention, threshold);

    for (var i = 0; i < y_axis.length; i++) {
      for (var j = 0; j < x_axis.length; j++) {
        if (matrix[i][j] <= (threshold / 100) * max_attention) {
          matrix[i][j] = 0;
        }
      }
    }

    var data = [
      {
        z: matrix,
        x: x_axis,
        y: y_axis,
        type: "heatmap",
        hoverongaps: false,
        colorscale: "Jet"
      }
    ];

    var layout = {
      autosize: true,
      width: 600,
      height: 600,
      title: "Attention Heatmap"
    };

    Plotly.newPlot("heatmap", data, layout);
  });
}
function reset_threshold() {
  document.getElementById("slider").value = 0;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
}
