interface Box {
  type: string;
  label: string;
  avgHeight: number;
  confidence: number;
  bounding: Array<number>;
}

export default function drawLabels(
  outputCtx: CanvasRenderingContext2D,
  box: Box,
  fontSize: number,
  widthStr: string,
  heightStr: string
) {
  const [x, y, width, height] = box.bounding;
  // Draw label
  outputCtx.fillText(box.label, x + fontSize / 2, y + height - fontSize / 2);

  // Draw height label
  outputCtx.fillText(heightStr, x - fontSize, y + height / 2 + fontSize / 4);

  // Check width length
  const isLengthOdd = widthStr.length % 2 > 0;
  if (isLengthOdd) {
    // Draw width label
    outputCtx.fillText(
      widthStr,
      // Adjust position
      x + width / 2 - (3 * fontSize) / 4,
      y + fontSize / 2
    );
  } else {
    // Draw width label
    outputCtx.fillText(
      widthStr,
      x + width / 2 - (9 * fontSize) / 8,
      y + fontSize / 2
    );
  }
}
