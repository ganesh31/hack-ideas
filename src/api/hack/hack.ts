import axios from "axios";
import { Hack } from "../../types/hack";
import { HOSTNAME } from "../config";

export const getAllHacks = async () => {
  const response = await axios.get<Hack[]>(`${HOSTNAME}/hacks`);

  if (response?.statusText?.toLowerCase() === "ok") {
    return response.data;
  }

  return null;
};

export const addHack = async (payload: Omit<Hack, "id">) => {
  const response = await axios.post<Hack>(`${HOSTNAME}/hacks`, payload);
  if (response?.statusText?.toLowerCase() === "created") {
    return response.data;
  }
  return null;
};
