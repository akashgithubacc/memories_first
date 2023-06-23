import jwt_decode from "jwt-decode";

export const CreateOrGetUser = async (res) => {
  const credential = res?.credential;

  const decode = jwt_decode(credential);

  const { name, email, picture, sub } = decode;

  const result = {
    name: name,
    email: email,
    profile: picture,
  };

  return {
    result: result,
    sub: sub,
  };
};
