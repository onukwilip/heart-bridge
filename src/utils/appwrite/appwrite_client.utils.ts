import { Client } from "appwrite";

const client = new Client().setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || process.env.APPWRITE_PROJECT_ID || '')

export default client