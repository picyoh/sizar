import { CiText } from "react-icons/ci";
import getSizes from "./getSizes";

interface Box {
  type: string;
  label: string;
  avgHeight: number;
  confidence: number;
  bounding: Array<number>;
}

export function drawBoxes(
  outputCtx: CanvasRenderingContext2D,
  boxes: Array<Box>
) {
  for (let i = 0; i < boxes.length; i++) {
    // Get sizes
    const [x, y, width, height] = boxes[i].bounding;
    // Set a color by types
    let color = "black";
    switch (boxes[i].type) {
      case "select":
        color = "red";
        break;
      case "object":
        color = "green";
        break;
      case "surface":
        color = "blue";
        break;
      default:
        console.error("can't get color, wrong box type");
        break;
    }
    // TODO: split to possibly change box model
    // Set stroke style
    outputCtx.strokeStyle = color;
    // init Path
    outputCtx.beginPath();
    // move to top left
    outputCtx.moveTo(x, y);
    // line to 1/3
    outputCtx.lineTo(x + width / 3, y);
    // move to 2/3
    outputCtx.moveTo(x + (2 * width) / 3, y);
    // line to top end
    outputCtx.lineTo(x + width, y);
    // rightline
    outputCtx.lineTo(x + width, y + height);
    // bottom line
    outputCtx.lineTo(x, y + height);
    // left line first third
    outputCtx.lineTo(x, y +  height / 2);
    // move to 2/3
    outputCtx.moveTo(x, y + 4 * height / 10);
    // end left line
    outputCtx.lineTo(x, y);
    // Draw Box
    outputCtx.stroke();

    // Set font
    outputCtx.font = "12px sans-serif";
    // Set font color
    outputCtx.fillStyle = "white";
    // Draw label
    outputCtx.fillText(boxes[i].label, x, y + 12);
    // Get sizes
    const sizes = getSizes(boxes[i].avgHeight, height, width);
    // Draw height
    outputCtx.fillText(sizes.height, x, y + height / 2);
    // Draw width
    outputCtx.fillText(sizes.width, x + width / 2, y)

  }
}
