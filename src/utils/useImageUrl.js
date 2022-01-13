import { useState, useEffect } from "react";
import { getUserByUsername } from "./api";

export const useImageUrl = (username) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let mounted = true;
    getUserByUsername(username)
      .then((userFromApi) => {
        if (mounted) {
          setImageUrl(userFromApi.avatar_url);
        }
      })
      .catch((err) => {
        setImageUrl(
          "https://images.pexels.com/photos/2093252/pexels-photo-2093252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        );
      });
    return function cleanup() {
      mounted = false;
    };
  }, [username]);

  return imageUrl;
};
