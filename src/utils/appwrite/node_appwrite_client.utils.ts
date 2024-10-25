import { Client } from "node-appwrite";

const server_client = new Client()
  .setProject(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
      process.env.APPWRITE_PROJECT_ID ||
      ""
  )
  .setKey(process.env.APPWRITE_API_KEY || "");

export default server_client;
