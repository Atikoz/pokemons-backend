import Pokemon from "../models/PokemonModel.js"
import PokemonType from "../models/PokemonTypeModel.js";

class DataController {
  getAllPokemons = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || null;
      const limit = parseInt(req.query.limit) || null;

      if (!page || !limit) {
        const allPokemons = await Pokemon.find();
        return res.status(200).json({
          status: 'ok',
          data: allPokemons,
          pagination: null,
        });
      }

      const skip = (page - 1) * limit;

      const totalPokemons = await Pokemon.countDocuments();
      const totalPages = Math.ceil(totalPokemons / limit);

      const allPokemons = await Pokemon.find().skip(skip).limit(limit);

      res.status(200).json({
        status: 'ok',
        data: allPokemons,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: totalPokemons,
          itemsPerPage: limit,
        },
      })
    } catch (error) {
      console.error('error geting pokemons: ', error.message);
      res.status(500).json({
        status: 'error',
        data: [],
        pagination: null
      });
    }
  }

  getTypes = async (req, res) => {
    try {
      const typePokemons = await PokemonType.find();

      res.status(200).json({
        status: 'ok',
        data: typePokemons
      });
    } catch (error) {
      console.error('error geting type pokemons: ', error.message);
      res.status(500).json({
        status: 'error',
        data: []
      });
    }
  }
}

export default new DataController