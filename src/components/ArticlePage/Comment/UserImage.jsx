import { useImageUrl } from "../../../utils/useImageUrl";

const UserImage = ({ username }) => {
  const imageUrl = useImageUrl(username);
  return (
    <>
      {imageUrl.length === 0 ? (
        <div className="ppPlaceholder__div"></div>
      ) : (
        <img
          className="UserComment__img"
          src={imageUrl}
          alt="user profile pic"
        ></img>
      )}
    </>
  );
};

export default UserImage;
