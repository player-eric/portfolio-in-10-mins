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

function mapping_attention(attention, threshold) {
  var max_attention = Number.NEGATIVE_INFINITY;
  for (i = 0; i < attention.length; i++) {
    for (j = 0; j < attention[i].length; j++) {
      if (attention[i][j] > max_attention) {
        max_attention = attention[i][j];
      }
    }
  }

  var mapped_attention = attention;
  for (i = 0; i < mapped_attention.length; i++) {
    for (j = 0; j < mapped_attention[i].length; j++) {
      if (
        mapped_attention[i][j] == 0 ||
        mapped_attention[i][j] < (threshold / 100) * max_attention
      ) {
        mapped_attention[i][j] = 0;
      } else {
        mapped_attention[i][j] =
          0.1 + (1.9 * mapped_attention[i][j]) / max_attention;
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
        calculate_word_position_y(y_ratio + (type == "source" ? 0.01 : -0.01))
      );

    d3.select("#line_graph")
      .append("text")
      .text(words[i])
      .attr("text-anchor", anchor)
      .attr("class", type + "_words")
      .attr("id", type + "_words_" + i)
      .attr("fill", word_color)
      .attr("font-size", "22px")
      .attr("x", calculate_word_position_x(i, words.length))
      .attr("y", calculate_word_position_y(y_ratio))
      .attr(
        "transform",
        "rotate(45," +
          calculate_word_position_x(i, words.length) +
          "," +
          calculate_word_position_y(y_ratio) +
          ")"
      );

    d3.select("#line_graph")
      .selectAll(".target_words")
      .attr("onmouseover", "mouse_on_word(this.id)")
      .attr("onmouseout", "mouse_off_word(this.id)");

    positions.push([
      calculate_word_position_x(i, words.length),
      calculate_word_position_y(y_ratio + (type == "source" ? 0.01 : -0.01))
    ]);
  }
  return positions;
}
function draw_lines(source_positions, target_positions, attention, color) {
  for (i = 0; i < source_positions.length; i++) {
    for (j = 0; j < target_positions.length; j++) {
      d3.select("#line_graph")
        .append("line")
        .attr("id", "alignment_line_target_" + j)
        .attr("class", "alignment_lines")
        .attr("x1", source_positions[i][0])
        .attr("y1", source_positions[i][1])
        .attr("x2", target_positions[j][0])
        .attr("y2", target_positions[j][1])
        .attr("stroke", color)
        .attr("stroke-width", attention[j][i]);
    }
  }
}
function destroy_all() {
  d3.select("#line_graph")
    .selectAll(".source_words")
    .remove();
  d3.select("#line_graph")
    .selectAll(".target_words")
    .remove();
  d3.select("#line_graph")
    .selectAll(".alignment_lines")
    .remove();
  d3.select("#line_graph")
    .selectAll(".source_points")
    .remove();
  d3.select("#line_graph")
    .selectAll(".target_points")
    .remove();
}
function draw_alignment_graph(
  source,
  target,
  alignment,
  threshold,
  source_ratio,
  target_ratio,
  color
) {
  mapped_attention = mapping_attention(alignment, threshold);
  source_positions = draw_words(source, "source", "end", source_ratio);
  target_positions = draw_words(target, "target", "front", target_ratio);
  draw_lines(source_positions, target_positions, mapped_attention, color);
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
        calculate_word_position_y(y_ratio + (type == "source" ? 0.01 : -0.01))
      );
    positions.push([
      calculate_word_position_x(i, points[0].length),
      calculate_word_position_y(y_ratio + (type == "source" ? 0.01 : -0.01))
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
function redraw_lines(source_positions, target_positions) {
  var lines = d3.select("#line_graph").selectAll(".alignment_lines");
  lines = lines["_groups"];

  for (i = 0; i < lines[0].length; i++) {
    var source_index = Math.floor(i / target_positions.length);
    var target_index = i % target_positions.length;
    d3.select(lines[0][i])
      .attr("x1", source_positions[source_index][0])
      .attr("y1", source_positions[source_index][1])
      .attr("x2", target_positions[target_index][0])
      .attr("y2", target_positions[target_index][1]);
  }
}
function adjust_graph() {
  source_positions = redraw_points("source", 0.4);
  target_positions = redraw_points("target", 0.85);
  redraw_words("source", 0.4);
  redraw_words("target", 0.85);
  redraw_lines(source_positions, target_positions);
}

function draw_histogram(attention, threshold) {
  attention__ = [];
  max_attention = Number.NEGATIVE_INFINITY;

  for (var i = 0; i < attention.length; i++) {
    if (attention[i] > max_attention) {
      max_attention = attention[i];
    }
  }

  for (var i = 0; i < attention.length; i++) {
    if (attention[i] >= (threshold / 100) * max_attention) {
      attention__.push(attention[i][j]);
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

function draw_all(threshold) {
  d3.json(json_dir, function(values) {
    total_sentence = values.length;
    var value = values[current_index - 1];
    var source = value.source_sentence;
    var target = value.target_sentence;
    var attention = value.attention_matrix;

    draw_alignment_graph(
      source,
      target,
      attention,
      threshold,
      0.4,
      0.85,
      line_color
    );
    attention_ = [];
    for (var i = 0; i < attention.length; i++) {
      for (var j = 0; j < attention[i].length; j++) {
        attention_.push(attention[i][j]);
      }
    }
    draw_histogram(attention_, threshold);

    source_sentence = "";
    for (i = 0; i < source.length; i++) {
      source_sentence += source[i] + " ";
    }
    target_sentence = "";
    for (i = 0; i < target.length; i++) {
      target_sentence += target[i] + " ";
    }
    d3.select("#source_sentence").html(source_sentence);
    d3.select("#target_sentence").html(target_sentence);
  });
}

function refresh_all(threshold = 0) {
  console.log(threshold);
  destroy_all();
  draw_all(threshold);
}

function view_as_alignment_graph() {
  document.getElementById("slider").value = 0;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
  view_mode = "alignment";
  d3.select("#line_graph")
    .style("width", "100%")
    .style("height", "70%");
  d3.select("#highlight_graph")
    .style("width", 0)
    .style("height", 0);
  document.getElementById("heatmap").style.display = "none";
  d3.json(json_dir, function(values) {
    var value = values[current_index - 1];
    var source = value.source_sentence;
    var target = value.target_sentence;

    var alignment = value.attention_matrix;
    refresh_all((threshold = 0));
  });
  document.getElementById("slider").value = -3;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
}
