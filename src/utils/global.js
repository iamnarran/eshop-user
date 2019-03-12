import ls from "local-storage";

const isLoggedIn = () => {
  const user = ls.get("user");
  const now = new Date().getTime();

  return user && !(user.expiresIn > now);
};

export default {
  isLoggedIn
};
