import BattleHistory from "../models/BattleHistoryModel.js";
import jwt from 'jsonwebtoken';
import User from "../models/UserModel.js";
import Web3 from "web3";

const web3 = new Web3();
const SECRET_KEY = process.env.SECRET_KEY;

export const saveBattleOnDb = async (payload) => {
  const { accessToken, winner, playerPokemon, computerPokemon, logs } = payload;
  try{
    const decoded = jwt.verify(accessToken.trim(), SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error ('user not found');
    }

    const recoveredAddress = web3.eth.accounts.recover(user.token, user.signature);


    if (decoded.address.toLowerCase() !== recoveredAddress.toLowerCase()) {
      throw new Error ('invalid signature');
    }

    const newBattle = new BattleHistory({
      user: user.address,
      winner,
      pokemonPlayer: playerPokemon,
      pokemonComputer: computerPokemon,
      logs: logs
    });

    await newBattle.save();
  } catch (error) {
    console.error(`error save battle on db: ${error.message}`)
  }
}