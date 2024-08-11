function view_as_highlight_graph() {
  reset_threshold();
  view_mode = "highlight";
  d3.select("#line_graph")
    .style("width", 0)
    .style("height", 0);

  document.getElementById("heatmap").style.display = "none";
  d3.select("#highlight_graph")
    .style("width", "100%")
    .style("height", "70%");
  head_selector = document.getElementById("head_selector");
  head_selector.innerHTML =
    '<option value="0">0</option><option value="1">1</option><option value = "2">2</option ><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="avg">Average</option>';

  draw_highlight_graph(0);
}
function draw_highlight_graph() {
  remove_previous_sentence();
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
    total_sentence = values.length;
    var value = values[current_index - 1];
    var upper_sentence = value.upper_sentence;
    var lower_sentence = value.lower_sentence;
    var attention = [];
    current_head_ = current_head == Number.POSITIVE_INFINITY ? 0 : current_head;
    var attention_matrix = value["layer_" + layer + "-head_" + current_head_];
    for (var p = 0; p < upper_sentence.length; p++) {
      for (var q = 0; q < lower_sentence.length; q++) {
        attention.push(attention_matrix[p][q]);
      }
    }
    draw_histogram(attention, 0);

    if (attention_type_upper == "source" && attention_type_lower == "target") {
      d3.select("#highlight_graph")
        .select("text")
        .append("tspan")
        .attr("class", "light")
        .text(upper_sentence[0])
        .attr("x", "5%")
        .attr("y", "30%")
        .attr("font-weight", "bold")
        .attr("font-size", "35")
        .attr("id", "source_0")
        .attr("fill", "black");
      for (var i = 1; i < upper_sentence.length; i++) {
        d3.select("#highlight_graph")
          .select("text")
          .append("tspan")
          .attr("class", "light")
          .attr("dx", "1%")
          .attr("dy", "0")
          .attr("font-weight", "bold")
          .attr("font-size", "35")
          .attr("id", "source_" + i)
          .text(upper_sentence[i])
          .attr("fill", "black");
      }
      d3.select("#highlight_graph")
        .select("text")
        .append("tspan")
        .text(lower_sentence[0])
        .attr("x", "5%")
        .attr("y", "60%")
        .attr("font-weight", "bold")
        .attr("font-size", "35")
        .attr("id", "0")
        .attr("fill", "black")
        .attr("onmouseover", "highlighten(this)")
        .attr("onmouseout", "dehighlighten(this)");
      for (var i = 1; i < lower_sentence.length; i++) {
        d3.select("#highlight_graph")
          .select("text")
          .append("tspan")
          .attr("dx", "1%")
          .attr("dy", "0")
          .attr("font-weight", "bold")
          .attr("font-size", "35")
          .attr("id", i)
          .text(lower_sentence[i])
          .attr("fill", "black")
          .attr("onmouseover", "highlighten(this)")
          .attr("onmouseout", "dehighlighten(this)");
      }
    } else {
      sentence = upper_sentence;

      d3.select("#highlight_graph")
        .select("text")
        .append("tspan")
        .attr("class", "light")
        .text(sentence[0])
        .attr("x", "5%")
        .attr("y", "50%")
        .attr("font-weight", "bold")
        .attr("font-size", "35")
        .attr("id", "0")
        .attr("fill", "black")
        .attr("onmouseover", "highlighten(this)")
        .attr("onmouseout", "dehighlighten(this)");
      for (var i = 1; i < sentence.length; i++) {
        d3.select("#highlight_graph")
          .select("text")
          .append("tspan")
          .attr("class", "light")
          .attr("dx", "1%")
          .attr("dy", "0")
          .attr("font-weight", "bold")
          .attr("font-size", "35")
          .attr("id", i)
          .text(sentence[i])
          .attr("fill", "black")
          .attr("onmouseover", "highlighten(this)")
          .attr("onmouseout", "dehighlighten(this)");
      }
    }
  });
}
function highlighten(word) {
  d3.json(json_dir, function(values) {
    var value = values[current_index - 1];
    current_head_ = current_head == Number.POSITIVE_INFINITY ? 0 : current_head;
    var attention_matrix = value["layer_" + layer + "-head_" + current_head_];

    d3.select(word).attr("text-decoration", "underline");
    var words = d3
      .select("#highlight_graph")
      .select("text")
      .selectAll(".light");
    words = words["_groups"];

    for (i = 0; i < words[0].length; i++) {
      d3.select(words[0][i]).attr("fill-opacity", attention_matrix[i][word.id]);
    }
  });
}
function dehighlighten(word) {
  d3.select(word).attr("text-decoration", "");
  var words = d3
    .select("#highlight_graph")
    .select("text")
    .selectAll(".light");
  words = words["_groups"];
  for (i = 0; i < words[0].length; i++) {
    d3.select(words[0][i]).attr("fill-opacity", "100%");
  }
}
function remove_previous_sentence() {
  d3.select("#highlight_graph")
    .select("text")
    .selectAll("tspan")
    .remove();
}
function reset_threshold() {
  document.getElementById("slider").value = 0;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
}
