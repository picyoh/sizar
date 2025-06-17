export default function getSelectBox(
  start: { x: number; y: number },
  end: { x: number; y: number },
) {
  // Transform values
  const left = start.x;
  const top = start.y;
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  // Set box
  const box = {
    id: "select",
    type: "select",
    label: "selection",
    avgHeight: -1,
    confidence: 1,
    bounding: [left, top, width, height],
  };
  return [box];
}