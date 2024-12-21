import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await axios.get(
      `https://image.pollinations.ai/prompt/${prompt}`,
      { responseType: "arraybuffer" }
    );
    return new NextResponse(response.data, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    console.log(error)
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
