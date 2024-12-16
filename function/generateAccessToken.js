import jwt from "jsonwebtoken"

const { SECRET_KEY } = process.env;

function generateAccessToken(id, address) {
  const payload = {
    id,
    address
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' })
}

export default generateAccessToken