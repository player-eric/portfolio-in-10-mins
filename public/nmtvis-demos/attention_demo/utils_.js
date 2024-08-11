function dec_index() {
  n = Number(document.getElementById("sentence_num").value);
  if (n - 1 <= 0) {
    document.getElementById("sentence_num").value = total_sentence;
    current_index = total_sentence;
  } else {
    document.getElementById("sentence_num").value = n - 1;
    current_index -= 1;
  }
  if (view_mode == "heatmap") {
    draw_heatmap();
    document.getElementById("slider").value = 0;
    document.getElementById("threshold").innerHTML =
      "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
  } else if (view_mode == "alignment") {
    d3.json(json_dir, function(values) {
      var value = values[current_index - 1];
      var source = value.source;
      var target = value.target;
      var alignment = value.alignment;
      refresh_all(source, target, alignment);
    });
    document.getElementById("slider").value = 0;
    document.getElementById("threshold").innerHTML =
      "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
  } else {
    draw_highlight_graph(0);
  }
}
function inc_index() {
  n = Number(document.getElementById("sentence_num").value);
  if (n + 1 > total_sentence) {
    document.getElementById("sentence_num").value = 1;
    current_index = 1;
  } else {
    document.getElementById("sentence_num").value = n + 1;
    current_index += 1;
  }
  if (view_mode == "heatmap") {
    draw_heatmap();
    document.getElementById("slider").value = 0;
    document.getElementById("threshold").innerHTML =
      "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
  } else if (view_mode == "alignment") {
    d3.json(json_dir, function(values) {
      var value = values[current_index - 1];
      var source = value.source;
      var target = value.target;
      var alignment = value.alignment;
      refresh_all(source, target, alignment);
    });
    document.getElementById("slider").value = 0;
    document.getElementById("threshold").innerHTML =
      "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
  } else {
    draw_highlight_graph(0);
  }
}

function change_color() {
  value2color = {
    "1": "#000000",
    "2": "#ffa500",
    "3": "#08df08",
    "4": "#009fff",
    "5": "#ffc0cb",
    "6": "#dd0000"
  };
  word_color = value2color[document.getElementById("colorselector_word").value];
  line_color = value2color[document.getElementById("colorselector_line").value];

  d3.select("#line_graph")
    .selectAll("text")
    .attr("fill", word_color);

  d3.select("#line_graph")
    .selectAll(".alignment_lines")
    .attr("stroke", line_color);
}

function mouse_on_word(source_name) {
  source_index = Number(source_name.match(/[0-9]+/g)[0]);
  max_index =
    Number(d3.select("#line_graph").selectAll("line")["_groups"][0].length) /
    Number(
      d3.select("#line_graph").selectAll(".source_points")["_groups"][0].length
    );
  for (i = 0; i < max_index; i++) {
    if (i != source_index) {
      d3.select("#line_graph")
        .selectAll("#alignment_line_target_" + i)
        .attr("visibility", "hidden");
    }
  }
  return max_index;
}

function mouse_off_word(source_name) {
  source_index = Number(source_name.match(/[0-9]+/g)[0]);
  max_index =
    Number(d3.select("#line_graph").selectAll("line")["_groups"][0].length) /
    Number(
      d3.select("#line_graph").selectAll(".source_points")["_groups"][0].length
    );
  for (i = 0; i < max_index; i++) {
    if (i != source_index) {
      d3.select("#line_graph")
        .selectAll("#alignment_line_target_" + i)
        .attr("visibility", "visible");
    }
  }
  return max_index;
}
