import { useImageUrl } from "../../../utils/useImageUrl";

const UserImage = ({ username }) => {
  const imageUrl = useImageUrl(username);

  return (
    <img
      className="UserComment__img"
      src={imageUrl}
      alt="user's profile pic"
    ></img>
  );
};

export default UserImage;
