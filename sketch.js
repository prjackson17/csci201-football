// Parker Jackson
// Football Field - CS201 project
// Last Updated: 12/12/2023

let can_width = 400;
let can_length = 700;

let scale_ratio = 5;

let border_width = 15;
let line_width = 5;

let field_width = 53;
let field_length = 120;

let up_left_corner_x =
  (can_width - scale_ratio * field_width - 2 * border_width) / 2;
let up_left_corner_y =
  (can_length - scale_ratio * field_length - 2 * border_width) / 2;

let footballDiameter = 20;
let footballX = up_left_corner_x + (scale_ratio * field_width) / 2;
let footballY = up_left_corner_y + (scale_ratio * field_length) / 2;

function setup() {
  createCanvas(can_width, can_length);
  noCursor();
}

function draw() {
  background(1, 100, 50);
  createField();
  drawFootball();

  // Check if the cursor is in the end zone
  if (
    up_left_corner_x + border_width <= mouseX &&
    mouseX <= up_left_corner_x + border_width + field_width * scale_ratio
  ) {
    // Check red end zone
    if (
      up_left_corner_y + border_width <= mouseY &&
      mouseY <=
        up_left_corner_y + border_width + 10 * scale_ratio - line_width / 2
    ) {
      background(200, 0, 0); // Red end zone
      fill(0); // black text
      textSize(60);
      text("Touchdown \nRed!", can_width / 8, can_length / 4);
      noLoop();
      return;
    } else if (
      // Check blue end zone
      up_left_corner_y +
        border_width +
        field_length * scale_ratio -
        (10 * scale_ratio + line_width / 2) <=
        mouseY &&
      mouseY <= up_left_corner_y + border_width + field_length * scale_ratio
    ) {
      background(0, 0, 200); // Blue end zone
      fill(0); // black text
      textSize(60);
      text("Touchdown \nBlue!", can_width / 8, can_length / 4);
      noLoop();
      return;
    }
  }
}

function createField() {
  // Create outer border
  fill(255);
  rect(
    up_left_corner_x,
    up_left_corner_y,
    scale_ratio * field_width + 2 * border_width,
    scale_ratio * field_length + 2 * border_width
  );

  // Fill in field inside border "grass"
  fill(1, 125, 50);
  rect(
    up_left_corner_x + border_width,
    up_left_corner_y + border_width,
    scale_ratio * field_width,
    scale_ratio * field_length
  );

  // Create yard lines, every 10 yards
  for (let i = 1; i < field_length / 10; i++) {
    let lineY = up_left_corner_y + border_width + i * 10 * scale_ratio;
    fill(255);
    rect(
      up_left_corner_x + border_width,
      lineY - line_width / 2,
      scale_ratio * field_width,
      line_width
    );
  }

  // Color end zones
  fill(200, 0, 0); // Red
  rect(
    up_left_corner_x + border_width,
    up_left_corner_y + border_width,
    field_width * scale_ratio,
    10 * scale_ratio - line_width / 2
  );

  fill(0, 0, 200); // Blue
  rect(
    up_left_corner_x + border_width,
    up_left_corner_y +
      border_width +
      field_length * scale_ratio +
      line_width / 2 -
      10 * scale_ratio,
    field_width * scale_ratio,
    10 * scale_ratio - line_width / 2
  );
}

function drawFootball() {
  // Check if the cursor is within the entire field (including borders)
  if (
    mouseX >= up_left_corner_x &&
    mouseX <= up_left_corner_x + scale_ratio * field_width + 2 * border_width &&
    mouseY >= up_left_corner_y &&
    mouseY <= up_left_corner_y + scale_ratio * field_length + 2 * border_width
  ) {
    // Draw the football at the current mouse position
    fill(139, 69, 19); // Football color
    ellipse(footballX, footballY, footballDiameter, footballDiameter);

    // Update the football position to follow the cursor
    footballX = mouseX;
    footballY = mouseY;
  }
}
