const Artist = require("../models/ArtistModel.js")

const createArtist = async(req, res) => {
    try {
        const artist = new Artist(req.body);
        await artist.save();
        res.send(artist);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getArtists = async(req, res) => {
    try {
        const artists = await Artist.find();
        // .populate('artistId', 'name')
        // .populate('genreId', 'name')
        // .populate('albumType', 'name')
        // .populate('albumAddedBy', 'name')
        res.send(artists);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getArtistById = async(req, res) => {
    try {
        const { id } = req.params
        const album = await Artist.findById(id)
            // .populate('artistId', 'name')
            // .populate('genreId', 'name')
            // .populate('albumType', 'name')
            // .populate('albumAddedBy', 'name')

        if (!album) {
            return res.status(404).send({ error: 'Artist not found' });
        }

        res.send(album)
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateArtist = async(req, res) => {
    try {
        const { id } = req.params

        const updatedArtist = await Artist.findByIdAndUpdate(
            id,
            req.body, { new: true }
        )

        if (!updatedArtist) {
            return res.status(404).send({ error: 'Artist not found' });
        }

        res.send(updatedArtist);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteArtist = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedArtist = await Artist.findByIdAndDelete(id);

        if (!deletedArtist) {
            return res.status(404).send({ error: 'Artist not found' })
        }

        res.send({ message: 'Artist was removed', data: deletedArtist })

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
}