export const decodeToken = (token: string) => {
  const { id } = JSON.parse(atob(token.split(".")[1]));
  return id;
};
