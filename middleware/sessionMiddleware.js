import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import Web3 from 'web3';


const SECRET_KEY = process.env.SECRET_KEY;
const web3 = new Web3();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ status: 'error', message: 'token not provided' });
    }

    const decoded = jwt.verify(token.trim(), SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'user not found' });
    }

    const recoveredAddress = web3.eth.accounts.recover(user.token, user.signature);

    if (decoded.address.toLowerCase() !== recoveredAddress.toLowerCase()) {
      return res.status(401).json({
        status: 'error',
        message: 'invalid signature'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    switch (error.name) {
      case 'TokenExpiredError':
        return res.status(401).json({
          status: 'error',
          message: 'session expired'
        });

      case 'JsonWebTokenError':
        return res.status(401).json({
          status: 'error',
          message: 'invalid token'
        });

      default:
        console.error('Error verifying token:', error);
        return res.status(500).json({
          status: 'error',
          message: 'internal server error'
        });

    }
  }
};

export default verifyToken