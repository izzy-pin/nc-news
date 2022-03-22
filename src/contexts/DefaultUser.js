import { createContext, useState } from "react";

export const DefaultUserContext = createContext();
export const ProvidedUser = ({ children }) => {
  const [user, setUser] = useState({
    username: "cooljmessy",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
    name: "Peter Messy",
  });

  return (
    <DefaultUserContext.Provider value={{ user, setUser }}>
      {children}
    </DefaultUserContext.Provider>
  );
};
