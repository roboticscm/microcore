import { sha256 } from "js-sha256";
const encodePassword = (password) => {
  return sha256(password);
};
const restError = (error, status = 401, errorDetail) => {
  console.error(errorDetail || error);
  return {
    status,
    body: {
      error,
      errorDetail
    }
  };
};
const restOk = (bodyObj, status = 200) => {
  return {
    status,
    body: {
      ...bodyObj
    }
  };
};
export { restOk as a, encodePassword as e, restError as r };
