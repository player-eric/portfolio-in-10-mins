function calculate_word_position_x(index, total) {
  space = document.getElementById("line_graph").getClientRects()[0].width;
  start_point = 0.1 * space;
  end_point = space;
  return start_point + (index * (end_point - start_point)) / total;
}
function calculate_word_position_y(ratio) {
  return (
    document.getElementById("line_graph").getClientRects()[0].height * ratio
  );
}
function mapping_attention(attention, dim_x, dim_y, threshold) {
  var max_attention = Number.NEGATIVE_INFINITY;
  //console.log(attention);
  for (i = 0; i < dim_x; i++) {
    for (j = 0; j < dim_y; j++) {
      if (attention[i][j] > max_attention) {
        max_attention = attention[i][j];
      }
    }
  }
  var mapped_attention = attention;
  for (i = 0; i < dim_x; i++) {
    for (j = 0; j < dim_y; j++) {
      if (
        mapped_attention[i][j] == 0 ||
        mapped_attention[i][j] < (threshold / 100) * max_attention
      ) {
        mapped_attention[i][j] = 0;
      } else {
        mapped_attention[i][j] =
          0.1 + (2.9 * mapped_attention[i][j]) / max_attention;
      }
    }
  }
  return mapped_attention;
}
function draw_words(words, type, anchor, y_ratio) {
  var positions = [];
  for (i = 0; i < words.length; i++) {
    d3.select("#line_graph")
      .append("circle")
      .attr("class", type + "_points")
      .attr("fill", "red")
      .attr("r", "3")
      .attr("cx", calculate_word_position_x(i, words.length))
      .attr(
        "cy",
        calculate_word_position_y(y_ratio + (type == "upper" ? 0.01 : -0.01))
      );

    d3.select("#line_graph")
      .append("text")
      .text(words[i])
      .attr("text-anchor", anchor)
      .attr("class", type + "_words")
      .attr("id", type + "_words_" + i)
      .attr("fill", word_color)
      .attr("x", calculate_word_position_x(i, words.length))
      .attr("y", calculate_word_position_y(y_ratio))
      .attr("font-size", "20px")
      .attr(
        "transform",
        "rotate(45," +
          calculate_word_position_x(i, words.length) +
          "," +
          calculate_word_position_y(y_ratio) +
          ")"
      );

    d3.select("#line_graph")
      .selectAll(".lower_words")
      .attr("onmouseover", "mouse_on_word(this.id)")
      .attr("onmouseout", "mouse_off_word(this.id)");

    positions.push([
      calculate_word_position_x(i, words.length),
      calculate_word_position_y(y_ratio + (type == "upper" ? 0.01 : -0.01))
    ]);
  }
  return positions;
}
function draw_lines(
  upper_positions,
  lower_positions,
  attention,
  color,
  head_num
) {
  for (i = 0; i < upper_positions.length; i++) {
    for (j = 0; j < lower_positions.length; j++) {
      d3.select("#line_graph")
        .append("line")
        .attr("id", "alignment_line_lowerword_" + j)
        .attr("class", "head_" + head_num + "_alignment_lines")
        .attr("x1", upper_positions[i][0])
        .attr("y1", upper_positions[i][1])
        .attr("x2", lower_positions[j][0])
        .attr("y2", lower_positions[j][1])
        .attr("stroke", color)
        .attr("stroke-width", attention[i][j]);
    }
  }
}
function destroy_all() {
  d3.select("#line_graph")
    .selectAll(".upper_words")
    .remove();
  d3.select("#line_graph")
    .selectAll(".lower_words")
    .remove();
  d3.select("#line_graph")
    .selectAll("line")
    .remove();
  d3.select("#line_graph")
    .selectAll(".upper_points")
    .remove();
  d3.select("#line_graph")
    .selectAll(".lower_points")
    .remove();
}
function redraw_points(type, y_ratio) {
  var positions = [];
  var points = d3.select("#line_graph").selectAll("." + type + "_points");
  points = points["_groups"];
  for (i = 0; i < points[0].length; i++) {
    d3.select(points[0][i])
      .attr("cx", calculate_word_position_x(i, points[0].length))
      .attr(
        "cy",
        calculate_word_position_y(y_ratio + (type == "upper" ? 0.01 : -0.01))
      );
    positions.push([
      calculate_word_position_x(i, points[0].length),
      calculate_word_position_y(y_ratio + (type == "upper" ? 0.01 : -0.01))
    ]);
  }
  return positions;
}
function redraw_words(type, y_ratio) {
  var words = d3.select("#line_graph").selectAll("." + type + "_words");
  words = words["_groups"];
  for (i = 0; i < words[0].length; i++) {
    d3.select(words[0][i])
      .attr(
        "transform",
        "rotate(45," +
          calculate_word_position_x(i, words[0].length) +
          "," +
          calculate_word_position_y(y_ratio) +
          ")"
      )
      .attr("x", calculate_word_position_x(i, words[0].length))
      .attr("y", calculate_word_position_y(y_ratio));
  }
}
function redraw_lines(upper_positions, lower_positions, head_num) {
  for (var head = 0; head < head_num; head++) {
    var lines = d3
      .select("#line_graph")
      .selectAll(".head_" + head + "_alignment_lines");
    lines = lines["_groups"];

    for (var i = 0; i < lines[0].length; i++) {
      var upper_index = Math.floor(i / lower_positions.length);
      var lower_index = i % lower_positions.length;
      d3.select(lines[0][i])
        .attr("x1", upper_positions[upper_index][0])
        .attr("y1", upper_positions[upper_index][1])
        .attr("x2", lower_positions[lower_index][0])
        .attr("y2", lower_positions[lower_index][1]);
    }
  }
}
function adjust_graph() {
  upper_positions = redraw_points("upper", 0.4);
  lower_positions = redraw_points("lower", 0.85);
  redraw_words("upper", 0.4);
  redraw_words("lower", 0.85);
  redraw_lines(upper_positions, lower_positions, 8);
}
function draw_histogram(attention, threshold) {
  attention_ = [];
  max_attention = Number.NEGATIVE_INFINITY;
  for (var i = 0; i < attention.length; i++) {
    if (attention[i] > max_attention) {
      max_attention = attention[i];
    }
  }
  for (var i = 0; i < attention.length; i++) {
    if (attention[i] >= (threshold / 100) * max_attention) {
      attention_.push(attention[i]);
    }
  }
  var trace = {
    x: attention_,
    type: "histogram"
  };
  var data = [trace];
  var layout = {
    title: "Distribution of Attention",
    xaxis: { title: "Attention" },
    yaxis: { title: "Count" }
  };
  Plotly.newPlot("histogram", data, layout);
  return max_attention;
}
function draw_all(
  threshold,
  layer,
  current_head,
  head_total,
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
    total_sentence = values.length;
    var value = values[current_index - 1];

    var upper_sentence = value.upper_sentence;
    var lower_sentence = value.lower_sentence;

    var attention = [];

    if (
      current_head == Number.POSITIVE_INFINITY ||
      current_head == "Number.POSITIVE_INFINITY"
    ) {
      for (var head_index = 0; head_index < head_total; head_index++) {
        var attention_matrix = value["layer_" + layer + "-head_" + head_index];

        draw_transformer_graph(
          threshold,
          head_index,
          upper_sentence,
          lower_sentence,
          attention_matrix
        );
        for (var p = 0; p < upper_sentence.length; p++) {
          for (var q = 0; q < lower_sentence.length; q++) {
            attention.push(attention_matrix[p][q]);
          }
        }
      }
    } else {
      var attention_matrix = value["layer_" + layer + "-head_" + current_head];
      draw_transformer_graph(
        threshold,
        current_head,
        upper_sentence,
        lower_sentence,
        attention_matrix
      );
      for (var p = 0; p < upper_sentence.length; p++) {
        for (var q = 0; q < lower_sentence.length; q++) {
          attention.push(attention_matrix[p][q]);
        }
      }
    }

    draw_histogram(attention, threshold);
  });
}

function view_as_alignment_graph() {
  document.getElementById("slider").value = -3;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as0)";
  view_mode = "alignment";
  d3.select("#line_graph")
    .style("width", "100%")
    .style("height", "70%");
  d3.select("#highlight_graph")
    .style("width", 0)
    .style("height", 0);
  document.getElementById("heatmap").style.display = "none";
  head_selector = document.getElementById("head_selector");
  head_selector.innerHTML =
    '<option value="Number.POSITIVE_INFINITY">All</option><option value="0">0</option><option value="1">1</option><option value ="2"> 2</option ><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="avg">Average</option>';
}

function draw_transformer_graph(
  threshold,
  current_head,
  upper_sentence,
  lower_sentence,
  attention_matrix
) {
  var colors = [
    "#000000",
    "#9400D3",
    "#4B0082",
    "#0000FF",
    "#228B22",
    "#999900",
    "#FF7F00",
    "#FF0000"
  ];
  if (current_head == "avg") {
    color = "#000000";
  } else {
    color = colors[current_head];
  }
  mapped_attention = mapping_attention(
    attention_matrix,
    upper_sentence.length,
    lower_sentence.length,
    threshold
  );
  if (d3.selectAll(".upper_words")["_groups"][0].length == 0) {
    upper_positions = draw_words(upper_sentence, "upper", "end", 0.4);
    lower_positions = draw_words(lower_sentence, "lower", "front", 0.85);
  }
  draw_lines(
    upper_positions,
    lower_positions,
    mapped_attention,
    color,
    current_head
  );
}

function change_layer(layer) {
  if (view_mode == "alignment") {
    destroy_all();
    draw_all(
      0,
      layer,
      current_head,
      head_total,
      attention_type_upper,
      attention_type_lower
    );
  } else if (view_mode == "heatmap") {
    draw_heatmap(0, attention_type_upper, attention_type_lower);
  } else {
    draw_highlight_graph(0);
  }
  reset_threshold(0);
}

function change_threshold(threshold) {
  if (view_mode == "alignment") {
    destroy_all();
    draw_all(
      threshold,
      layer,
      current_head,
      head_total,
      attention_type_upper,
      attention_type_lower
    );
  } else if (view_mode == "heatmap") {
    draw_heatmap(threshold, attention_type_upper, attention_type_lower);
  } else {
    draw_highlight_graph(threshold);
  }
}

function change_head(current_head) {
  if (view_mode == "alignment") {
    destroy_all();
    draw_all(
      0,
      layer,
      current_head,
      head_total,
      attention_type_upper,
      attention_type_lower
    );
  } else if (view_mode == "heatmap") {
    draw_heatmap(0, attention_type_upper, attention_type_lower);
  } else {
    draw_highlight_graph(0);
  }
  reset_threshold();
}

function change_attention_type(tp) {
  if (tp == "source_to_source") {
    attention_type_upper = "source";
    attention_type_lower = "source";
  } else if (tp == "target_to_source") {
    attention_type_upper = "source";
    attention_type_lower = "target";
  } else if (tp == "target_to_target") {
    attention_type_upper = "target";
    attention_type_lower = "target";
  }
  if (view_mode == "alignment") {
    destroy_all();
    draw_all(
      0,
      layer,
      current_head,
      head_total,
      attention_type_upper,
      attention_type_lower
    );
  } else if (view_mode == "heatmap") {
    draw_heatmap(0, attention_type_upper, attention_type_lower);
  } else {
    draw_highlight_graph(0);
  }

  reset_threshold();
}
function reset_threshold() {
  document.getElementById("slider").value = 0;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
}
