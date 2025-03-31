const baseUrl = "http://localhost:8081";
export const generateFilename = () => {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:]/g, "")
    .split(".")[0];
  return `video_${timestamp}.mp4`;
};

export const stop = async () => {
  try {
    const response = await fetch(`${baseUrl}/stop`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const keep = async () => {
  try {
    const response = await fetch(`${baseUrl}/keep`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const start = async (name) => {
  try {
    const response = await fetch(`${baseUrl}/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
