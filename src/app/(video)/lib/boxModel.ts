export default function boxModel(
  outputCtx: CanvasRenderingContext2D,
  boxBounding: Array<number>,
  color: string,
  fontPadding: number
) {
  const [x, y, width, height] = boxBounding;
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
}
