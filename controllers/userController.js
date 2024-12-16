import BattleHistory from "../models/BattleHistoryModel.js";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

class UserController {
  getHistoryBattles = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decoded = jwt.verify(token.trim(), SECRET_KEY);

      let historyBattles = await BattleHistory.find({ user: decoded.address }).sort({ data: -1 });;

      historyBattles.sort((a, b) => new Date(b.data) - new Date(a.data))

      res.status(200).json({
        status: 'ok',
        data: historyBattles
      });
    } catch (error) {
      console.error('error geting history battle: ', error.message);
      res.status(500).json({
        status: 'error',
        data: []
      });
    }
  }
}

export default new UserController