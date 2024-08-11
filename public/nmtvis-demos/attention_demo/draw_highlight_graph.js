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

  draw_highlight_graph(0);
}
function draw_highlight_graph() {
  remove_previous_sentence();
  json_dir = "./attentions.json";

  d3.json(json_dir, function(values) {
    total_sentence = values.length;
    var value = values[current_index - 1];
    var upper_sentence = value.source_sentence;
    var lower_sentence = value.target_sentence;
    var attention = [];
    var attention_matrix = value.attention_matrix;
    for (var p = 0; p < upper_sentence.length; p++) {
      for (var q = 0; q < lower_sentence.length; q++) {
        attention.push(attention_matrix[q][p]);
      }
    }
    draw_histogram(attention, 0);

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
  });
}
function highlighten(word) {
  d3.json(json_dir, function(values) {
    var value = values[current_index - 1];

    var attention_matrix = value.attention_matrix;

    d3.select(word).attr("text-decoration", "underline");
    var words = d3
      .select("#highlight_graph")
      .select("text")
      .selectAll(".light");
    words = words["_groups"];

    for (i = 0; i < words[0].length; i++) {
      d3.select(words[0][i]).attr("fill-opacity", attention_matrix[word.id][i]);
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
