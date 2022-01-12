import { useEffect, useState } from "react";
import { getUserByUsername } from "../../../utils/api";

const UserImage = ({ username }) => {
  const [imageUrl, setImageUrl] = useState("");

  const noProfilePic =
    "https://images.pexels.com/photos/2093252/pexels-photo-2093252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

  useEffect(() => {
    getUserByUsername(username).then((userFromApi) => {
      setImageUrl(userFromApi.avatar_url);
    });
  }, [username]);

  return (
    <img
      className="UserComment__img"
      src={imageUrl.length > 0 ? imageUrl : noProfilePic}
      alt="user's profile pic"
    ></img>
  );
};

export default UserImage;
