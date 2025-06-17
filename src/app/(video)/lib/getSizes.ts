export default function getSizes(
  avgHeight: number,
  height: number,
  width: number
) {
  // TODO: adjust to calc size from a ref
  // approximate a pixel size  
  const minHeight = avgHeight - Math.round((avgHeight * 20) / 100);
  const maxHeight = avgHeight + Math.round((avgHeight * 20) / 100);
  // Get min and max pixel ratios
  const minHeightRatio = minHeight / height;
  const maxHeightRatio = maxHeight / height;
  // Get approximate width
  const minWidth = width * minHeightRatio;
  const maxWidth = width * maxHeightRatio;
  const avgWidth = Math.round(minWidth + maxWidth / 2);
  // Return sizes
  return { width: avgWidth.toString(), height: avgHeight.toString() };
}
