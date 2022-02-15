import axios from "axios";
import { Tag } from "../../types/tag";
import { HOSTNAME } from "../config";

export const getAllTags = async (): Promise<Tag[] | null> => {
  const response = await axios.get<Tag[]>(`${HOSTNAME}/tags`);
  console.log("response");
  if (response?.statusText?.toLowerCase() === "ok") {
    return response.data;
  }

  return null;
};
