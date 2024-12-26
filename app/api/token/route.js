import { StreamClient } from "@stream-io/node-sdk";

const streamClient = new StreamClient(
  process.env.NEXT_PUBLIC_STREAM_API_KEY,
  process.env.NEXT_PUBLIC_STREAM_API_SECRET
);

export async function GET(req) {
  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken("fikserr", expirationTime, issuedAt);
  return new Response(JSON.stringify(token), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
