import Web3 from "web3";
import generateId from "../function/generatorId.js";
import User from "../models/UserModel.js";
import generateAccessToken from "../function/generateAccessToken.js";


const web3 = new Web3();

class AuthController {
  createNonceUser = async (req, res) => {
    try {
      const nonce = generateId();

      res.status(200).json({
        status: 'ok',
        nonce,
        error: ''
      });

    } catch (error) {
      console.error('Error generating nonce:', error);
      res.status(500).json({
        status: 'error',
        nonce: '',
        error: 'error generating nonce'
      });
    }
  }

  loginUser = async (req, res) => {
    const { address, token, signature } = req.body;

    try {
      const recoveredAddress = web3.eth.accounts.recover(token, signature);

      if (address.toLowerCase() !== recoveredAddress.toLowerCase()) {
        return res.status(401).json({
          status: 'error',
          message: 'invalid signature',
          accessToken: ''
        });
      }

      let user = await User.findOne({ address });

      if (!user) {
        user = new User({
          address,
          token,
          signature,
        });
      } else {
        user.token = token;
        user.signature = signature;
      }

      await user.save();

      const accessToken = generateAccessToken(user._id, user.address);

      res.status(200).json({
        status: 'ok',
        message: 'login succesfull',
        accessToken
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
        status: 'error',
        message: 'error during login',
        accessToken: ''
      });
    }
  }
}

export default new AuthController
