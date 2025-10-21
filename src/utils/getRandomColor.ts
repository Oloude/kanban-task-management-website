const brightColors = [
  "#4A6CF7", // Bright Blue
  "#8B5CF6", // Vivid Purple
  "#22D3EE", // Sky Cyan
  "#EC4899", // Bright Pink
  "#FACC15", // Warm Yellow
  "#10B981", // Fresh Green
  "#FB923C", // Coral Orange
];

function getRandomColor() {
  const randomNumber = Math.floor(Math.random() * brightColors.length);

  return brightColors[randomNumber];
}

export default getRandomColor;
