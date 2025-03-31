export const drawRect = (detections, ctx, config) => {
  // Loop through each prediction
  const { camera, mirror } = config;
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const {
      bbox: [x, y, width, height],
      class: text,
      // score,
    } = prediction;

    // Set styling
    // const color = Math.floor(Math.random() * 16777215).toString(16);
    // const acc = Math.round(score * 100);
    const lime = "#32CD32";
    const white = "#FFFFFF";
    ctx.strokeStyle = lime;
    ctx.font = "16px Monospace";

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = lime;
    ctx.borderStyle = white;
    if (camera == "single") {
      if (mirror) {
        ctx.fillText(`${text}`, 1280 - x - width + 5, y + 18);
        ctx.lineWidth = 3;
        // ctx.scale(-1, 1);
        ctx.rect(1280 - x - width, y, width, height);
      } else {
        ctx.fillText(`${text}`, x + 5, y + 18);
        ctx.lineWidth = 3;
        // ctx.scale(-1, 1);
        ctx.rect(x, y, width, height);
      }
    } else {
      if (mirror) {
        if (y < 360) {
          ctx.fillText(`${text}`, 1280 - x - width + 5, y + 18);
          ctx.lineWidth = 3;
          // ctx.scale(-1, 1);
          ctx.rect(1280 - x - width, y, width, height);
        } else {
          ctx.fillText(`${text}`, x + 5, y + 18);
          ctx.lineWidth = 3;
          // ctx.scale(-1, 1);
          ctx.rect(x, y, width, height);
        }
      } else {
        if (y < 360) {
          ctx.fillText(`${text}`, x + 5, y + 18);
          ctx.lineWidth = 3;
          // ctx.scale(-1, 1);
          ctx.rect(x, y, width, height);
        } else {
          ctx.fillText(`${text}`, 1280 - x - width + 5, y + 18);
          ctx.lineWidth = 3;
          // ctx.scale(-1, 1);
          ctx.rect(1280 - x - width, y, width, height);
        }
      }
    }

    ctx.stroke();
  });
};
