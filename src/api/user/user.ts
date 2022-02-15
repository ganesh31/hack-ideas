import axios from "axios";
import { User } from "../../types/user";
import { HOSTNAME } from "../config";

export async function isUserExists(empId: string) {
  const { data, status } = await axios.get<User[]>(
    `${HOSTNAME}users?id=${empId}`
  );

  if (status === 200 && data.length === 1) {
    return data[0];
  } else {
    return null;
  }
}
