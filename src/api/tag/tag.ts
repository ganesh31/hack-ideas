import axios from "axios";
import { Tag } from "../../types/tag";
import { HOSTNAME } from "../config";

export const getAllTagsAPI = async (): Promise<Tag[] | null> => {
  const response = await axios.get<Tag[]>(`${HOSTNAME}/tags`);
  if (response?.statusText?.toLowerCase() === "ok") {
    return response.data;
  }

  return null;
};
