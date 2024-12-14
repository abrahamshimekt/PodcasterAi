export async function POST(request: Request): Promise<Response> {
  const { text, modelUrl } = await request.json();

  if (!modelUrl) {
    throw new Error("Missing 'model url' field in the request body");
  }

  if (!text) {
    throw new Error("Missing 'input' field in the request body");
  }

  if (!process.env.HUGGING_FACE_ACCESS_TOKEN) {
    throw new Error("Missing 'Hugging Face Access Token'");
  }

  const response = await fetch(modelUrl, {
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: text }),
  });

  const audioData = await response.arrayBuffer();

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return new Response(audioData, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}
