import axios from "axios";
import { User } from "../../types/user";
import { HOSTNAME } from "../config";

export async function isUserExists(empId: string) {
  const { data, status } = await axios.get<User[]>(
    `${HOSTNAME}/users?id=${empId}`
  );

  if (status === 200 && data.length === 1) {
    return data[0];
  } else {
    return null;
  }
}

export async function addNewUser(name: string) {
  const payload: Omit<User, "id"> = { name, hacks: [] };
  try {
    const response = await axios.post<User>(`${HOSTNAME}/users`, payload);
    console.log(response);

    if (response.statusText === "Created") {
      return response.data;
    }
    return null;
  } catch (error: any) {
    throw new Error(error);
  }
}
