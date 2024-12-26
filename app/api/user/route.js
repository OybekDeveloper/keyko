import { StreamClient } from "@stream-io/node-sdk";

const streamClient = new StreamClient(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.NEXT_PUBLIC_STREAM_API_SECRET
);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const nameUser = body?.name;

    if (!nameUser) {
      return new Response(
        JSON.stringify({ error: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(nameUser, expirationTime, issuedAt);

    return new Response(
      JSON.stringify({ token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating token:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
