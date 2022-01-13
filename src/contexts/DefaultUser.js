import { createContext, useState } from "react";

export const DefaultUserContext = createContext();

export const ProvidedUser = ({ children }) => {
  const [user, setUser] = useState("tickle122");

  return (
    <DefaultUserContext.Provider value={{ user, setUser }}>
      {children}
    </DefaultUserContext.Provider>
  );
};
