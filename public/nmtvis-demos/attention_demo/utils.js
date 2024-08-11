function dec_index() {
  reset_threshold();
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
  } else if (view_mode == "alignment") {
    destroy_all();
    draw_all(
      0,
      layer,
      current_head,
      head_total,
      attention_type_upper,
      attention_type_lower
    );
  } else {
    draw_highlight_graph();
  }
  set_source_and_target(current_index);
}
function inc_index() {
  reset_threshold();
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
  } else if (view_mode == "alignment") {
    destroy_all();
    draw_all(
      0,
      layer,
      current_head,
      head_total,
      attention_type_upper,
      attention_type_lower
    );
  } else {
    draw_highlight_graph();
  }
  set_source_and_target(current_index);
}
function reset_threshold() {
  document.getElementById("slider").value = 0;
  document.getElementById("threshold").innerHTML =
    "Threshold=(0%)*max_attention (Assume attention below threshold as 0)";
}

function mouse_on_word(source_name) {
  all_lines = d3.select("#line_graph").selectAll("line")["_groups"][0];
  for (var i = 0; i < all_lines.length; i++) {
    keep_num = Number(source_name.match(/[0-9]+/g)[0]);
    if (Number(all_lines[i].id.match(/[0-9]+/g)[0]) != keep_num) {
      d3.select(all_lines[i]).attr("visibility", "hidden");
    }
  }
}

function mouse_off_word(source_name) {
  all_lines = d3.select("#line_graph").selectAll("line")["_groups"][0];
  for (var i = 0; i < all_lines.length; i++) {
    keep_num = Number(source_name.match(/[0-9]+/g)[0]);
    if (Number(all_lines[i].id.match(/[0-9]+/g)[0]) != keep_num) {
      d3.select(all_lines[i]).attr("visibility", "visible");
    }
  }
}

function set_source_and_target(current_index) {
  json_dir = "./decoder_encoder_attention.json";
  d3.json(json_dir, function(values) {
    var value = values[current_index - 1];
    d3.select("#source_sentence").html(value.upper_sentence);
    d3.select("#target_sentence").html(value.lower_sentence);
  });
}
