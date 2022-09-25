import { JwtPayload, sign, verify } from 'jsonwebtoken';

interface UserIdJwtPayload extends JwtPayload {
  id: string;
}

const { TOKEN_SECRET } = process.env;

export const generateToken = (id: string, expirationTime = 3600) =>
  sign({ id }, TOKEN_SECRET, { expiresIn: expirationTime });

export const verifyToken = (token: string) => {
  try {
    const { id } = <UserIdJwtPayload>verify(token, TOKEN_SECRET);
    return id;
  } catch (error) {
    return null;
  }
};
