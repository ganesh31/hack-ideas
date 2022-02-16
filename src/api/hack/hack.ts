import axios from "axios";
import { Hack } from "../../types/hack";
import { HOSTNAME } from "../config";

export const getAllHacksAPI = async () => {
  const response = await axios.get<Hack[]>(`${HOSTNAME}/hacks`);

  if (response?.statusText?.toLowerCase() === "ok") {
    return response.data;
  }

  return null;
};

export const addHackAPI = async (payload: Omit<Hack, "id">) => {
  const response = await axios.post<Hack>(`${HOSTNAME}/hacks`, payload);
  if (response?.statusText?.toLowerCase() === "created") {
    return response.data;
  }
  return null;
};

export const updateHackAPI = async (hackId: number, userId: number) => {
  const { data } = await axios.get<Hack>(`${HOSTNAME}/hacks/${hackId}`);

  const likedByUser = data.likedBy.includes(userId);

  let payload = {};
  if (likedByUser) {
    payload = {
      ...data,
      likes: data.likes - 1,
      likedBy: data.likedBy.filter((id) => id !== userId),
    };
  } else {
    payload = {
      ...data,
      likes: data.likes + 1,
      likedBy: [...data.likedBy, userId],
    };
  }

  const response = await axios.put<Hack>(
    `${HOSTNAME}/hacks/${hackId}`,
    payload
  );

  return response;
};
