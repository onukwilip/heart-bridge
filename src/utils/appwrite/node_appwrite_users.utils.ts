import { Users } from "node-appwrite";
import server_client from "./node_appwrite_client.utils";

const users = new Users(server_client);

export default users;
