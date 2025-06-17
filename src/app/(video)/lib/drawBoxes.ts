import boxModel from "./boxModel";
import drawLabels from "./drawLabels";
import getSizes from "./getSizes";

// TODO: check how to globalise interface
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
  //console.log(boxes)
  for (let i = 0; i < boxes.length; i++) {
    const [x, y, width, height] = boxes[i].bounding;
    // Set a color by confidence
    let color = "black";
    switch (boxes[i].type) {
      case "select":
        color = `rgba(255, 255, 255, ${boxes[i].confidence})`;
        break;
      case "object":
        color = `rgba(0, 255, 0, ${boxes[i].confidence})`;
        break;
      case "surface":
        color = `rgba(0, 0, 255, ${boxes[i].confidence})`;
        break;
      default:
        console.error("can't get color, wrong box type");
        break;
    }
    // Set font
    const fontSize = 12;
    const fontPadding = 1.5 * fontSize;
    outputCtx.font = `${fontSize}px sans-serif`;
    outputCtx.fillStyle = "white";

    // Draw box model
    boxModel(outputCtx, boxes[i].bounding, color, fontPadding);

    // Get approximate sizes
    let sizes = { width: "", height: "" };
    if (boxes[i].avgHeight === -1) {
      // Select case
      sizes = { width: " ... ", height: "  ..." };
    } else {
      // Other cases
      sizes = getSizes(boxes[i].avgHeight, height, width);
    }
    // Draw Labels
    drawLabels(outputCtx, boxes[i], fontSize, sizes.width, sizes.height);
  }
}
