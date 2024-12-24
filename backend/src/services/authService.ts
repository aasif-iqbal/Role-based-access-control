import jwt from 'jsonwebtoken';
/**
 * Generates the JWT
 *
 * @param payload {Object} - Payload to be added in the JWT
 * @return {String} - Generated JWT
 */
const generateAuthToken = (payload: object) => {

  return jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });  
};

const verifyAuthToken = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
}

const decodeAuthToken = (token: string) => {
  return jwt.decode(token);
}

export {
  generateAuthToken,
  verifyAuthToken,
  decodeAuthToken
}

