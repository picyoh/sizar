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
  // TODO: transform box to divs ??
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
    // Set font
    const fontSize = 12;
    const fontPadding = 1.5 * fontSize;
    
    // TODO: split to possibly change box model
    // Set stroke style
    outputCtx.strokeStyle = color;

    outputCtx.beginPath();
    // top left
    outputCtx.moveTo(x, y);
    // line to center - 1.5 fontSize
    outputCtx.lineTo(x + width / 2 - fontPadding, y);
    // move to center + 1.5 fontSize
    outputCtx.moveTo(x + width / 2 + fontPadding, y);
    // line to top right
    outputCtx.lineTo(x + width, y);
    // rightline
    outputCtx.lineTo(x + width, y + height);
    // bottom line
    outputCtx.lineTo(x, y + height);
    // line from bottom left to center - fontSize
    outputCtx.lineTo(x, y + height / 2 + fontPadding);
    // move to center + fontSize
    outputCtx.moveTo(x, y + height / 2 - fontPadding);
    // end left line
    outputCtx.lineTo(x, y);
    // Draw Box
    outputCtx.stroke();

    outputCtx.font = `${fontSize}px sans-serif`;
    // Set font color
    outputCtx.fillStyle = "white";
    // Draw label
    outputCtx.fillText(
      boxes[i].label,
      x + fontSize / 2 ,
      y + height - fontSize / 2
    );
    // Get sizes
    const sizes = getSizes(boxes[i].avgHeight, height, width);
    // Draw height label
    outputCtx.fillText(
      sizes.height,
      x - fontSize,
      y + height / 2 + fontSize / 4
    );
    // Check width length
    const isLengthOdd = sizes.width.length % 2 > 0;
    if (isLengthOdd) {
      // Draw width label
      outputCtx.fillText(
        sizes.width,
        // Adjust position
        x + width / 2 - 3 * fontSize / 4,
        y + fontSize / 2
      );
    } else {
      // Draw width label
      outputCtx.fillText(
        sizes.width,
        x + width / 2 - 9 * fontSize / 8,
        y + fontSize / 2
      );
    }
  }
}
