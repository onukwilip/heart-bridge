import { Client } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
      process.env.APPWRITE_PROJECT_ID ||
      ""
  );

export default client;
