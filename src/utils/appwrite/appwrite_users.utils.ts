import { Users } from "node-appwrite";
import server_client from "./appwrite-server_client.utils";

const users = new Users(server_client);

export default users;
