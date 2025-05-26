export default function getSizes(
  avgHeight: number,
  height: number,
  width: number
) {
  // get pixel ratio
  const minHeight = avgHeight - Math.round((avgHeight * 20) / 100);
  const maxHeight = avgHeight + Math.round((avgHeight * 20) / 100);
  const minHeightRatio = minHeight / height;
  const maxHeightRatio = maxHeight / height;

  const minWidth = width * minHeightRatio;
  const maxWidth = width * maxHeightRatio;
  const avgWidth = Math.round(minWidth + maxWidth / 2);
  const sizes = { width: avgWidth.toString(), height: avgHeight.toString() };
  return sizes;
}
