"use server";
import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { DATABASE_ID } from "../utils";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);

  const session = await cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getData(collectionId) {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  const databases = new Databases(client);

  const databaseId = DATABASE_ID;

  // Appwrite ma'lumotlarini olish
  const result = await databases.listDocuments(databaseId, collectionId);
  return result;
}
