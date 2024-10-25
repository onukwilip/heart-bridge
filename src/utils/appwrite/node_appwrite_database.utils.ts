import { Databases } from "node-appwrite";
import client from "./node_appwrite_client.utils";

const database = new Databases(client);

export default database;
