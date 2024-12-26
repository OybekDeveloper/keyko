import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/lib/utils";
import { Client, Account, Databases, Storage } from "appwrite";

export const client = new Client()
  .setProject("https://cloud.appwrite.io/v1")
  .setEndpoint(APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID } from "appwrite";
