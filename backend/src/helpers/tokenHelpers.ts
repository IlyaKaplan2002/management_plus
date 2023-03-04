import { JwtPayload, sign, verify } from 'jsonwebtoken';

interface UserIdJwtPayload extends JwtPayload {
  id: string;
}

const { TOKEN_SECRET } = process.env;

export const generateToken = (id: string, expirationTime = 5184000) =>
  sign({ id }, TOKEN_SECRET, { expiresIn: expirationTime });

export const verifyToken = (
  token: string,
): { id: string | null; error: string | null } => {
  try {
    const { id } = <UserIdJwtPayload>verify(token, TOKEN_SECRET);
    return { id, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};
