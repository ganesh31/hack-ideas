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
