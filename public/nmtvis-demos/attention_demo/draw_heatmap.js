function view_as_heatmap() {
  document.getElementById("slider").value = 0;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
  view_mode = "heatmap";
  d3.select("#line_graph")
    .style("width", 0)
    .style("height", 0);
  d3.select("#highlight_graph")
    .style("width", 0)
    .style("height", 0);
  document.getElementById("heatmap").style.display = "block";
  graph = document.getElementById("line_graph");

  draw_heatmap();
}

function draw_heatmap(threshold = 0) {
  d3.json(json_dir, function(values) {
    var value = values[current_index - 1];
    var source = value.source_sentence;
    var target = value.target_sentence;
    var attention = value.attention_matrix;

    attention_ = [];
    //console.log(attention);
    //console.log(target.length);
    max_attention = Number.NEGATIVE_INFINITY;
    for (var i = 0; i < source.length; i++) {
      for (var j = 0; j < target.length; j++) {
        //console.log(i, j);

        if (attention[j][i] >= max_attention) {
          max_attention = attention[j][i];
        }
      }
    }

    console.log(max_attention);
    for (var i = 0; i < source.length; i++) {
      for (var j = 0; j < target.length; j++) {
        if (attention[j][i] <= (threshold / 100) * max_attention) {
          attention[j][i] = 0;
        } else {
          attention_.push(attention[j][i]);
        }
      }
    }
    draw_histogram(attention_, threshold);
    var data = [
      {
        z: attention,
        x: source,
        y: target,
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
