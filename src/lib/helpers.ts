import { API_URL } from "./constants";

export const verifyUserAccount = async (token: string, username: string) => {
  const response = await fetch(API_URL + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      username,
    }),
  });
  return await response.json();
};
