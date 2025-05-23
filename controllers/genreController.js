const Genre = require('../models/genreModel');


const getGenres = async(req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).send(genres);
    } catch (error) {
        res.status(500).send(error);
    }
};


const getGenreById = async(req, res) => {
    try {
        const { id } = req.params;
        const genre = await Genre.findById(id);

        if (!genre) {
            return res.status(404).send({ error: 'Genre not found' });
        }

        res.status(200).send(genre);
    } catch (error) {
        res.status(500).send(error);
    }
};

const createGenre = async(req, res) => {
    try {
        const genre = new Genre(req.body);
        await genre.save();
        res.status(201).send(genre);
    } catch (error) {
        res.status(500).send(error);
    }
};





const updateGenre = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedGenre = await Genre.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedGenre) {
            return res.status(404).send({ error: 'Genre not found' });
        }

        res.status(200).send(updatedGenre);
    } catch (error) {
        res.status(500).send(error);
    }
};


const deleteGenre = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedGenre = await Genre.findByIdAndDelete(id);

        if (!deletedGenre) {
            return res.status(404).send({ error: 'Genre not found' });
        }

        res.status(200).send({ message: 'Genre was removed', data: deletedGenre });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre
};