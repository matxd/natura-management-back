export const decodeToken = (token: string) => {
  const { id } = JSON.parse(Buffer.from(token.split(".")[1], 'base64').toString());
  return id;
};
