import speakeasy from "speakeasy";
const verifyCode = (secret, token) => {
  const result = speakeasy.totp.verify({
    secret,
    token,
    encoding: "ascii"
  });
  console.log("result ", result);
  return result;
};
const post = async ({ request }) => {
  const body = await request.json();
  return {
    body: {
      valid: verifyCode(body.secret, body.token)
    }
  };
};
export { post };
