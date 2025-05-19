interface Box {
  type: string;
  classId: string;
  confidence: number;
  bounding: Array<number>;
}

export function drawBoxes(
  outputCtx: CanvasRenderingContext2D,
  boxes: Array<Box>
) {

  console.log(boxes);
  for (let i = 0; i < boxes.length; i++) {
    // Get sizes
    const [x, y, width, height] = boxes[i].bounding;
    // Set a color by types
    const color = boxes[i].type === "object" ? "green" : "red";
    outputCtx.strokeStyle = color;
    // Draw Box
    outputCtx.strokeRect(x, y, width, height);
    // Set font
    outputCtx.font = "12px sans-serif";
    // Draw label
    outputCtx.fillStyle = "white";
    outputCtx.fillText(boxes[i].classId, x, y + 12);
  }
}
