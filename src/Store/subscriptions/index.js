import storage from "localforage";

export const persistAuth = ({ token, user , userGroups}) => {
  storage.setItem("user", user);
  storage.setItem("token", token);
  storage.setItem("loginUser", userGroups);

};
