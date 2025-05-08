const Album = require("../models/albumModel.js")


    const createAlbum = async(req, res) => {
        try {
            const album = new Album(req.body);
            await album.save();
            res.send(album);
        } catch (error) {
            res.status(500).send(error);
        }
    }

const getAlbums = async(req, res) => {
    try {
        const albums = await Album.find()
            .populate('artist', 'title')
            // .populate('genreId', 'name')
            .populate('albumType', 'name description')
            // .populate('albumAddedBy', 'name')
        res.send(albums);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAlbumById = async(req, res) => {
    try {
        
        const { id } = req.params
        const album = await Album.findById(id)
            .populate('artist', 'name')
            .populate('genre', 'name')
            .populate('albumType', 'name description')
            .populate('albumAddedBy', 'name')
            .populate({
                path: "albumFormat",
                populate: [
                  { path: "albumType", select: "name description" }
                ]})
       
        if (!album) {
            return res.status(404).send({ error: 'Album not found' });
        }

        res.send(album)
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateAlbum = async(req, res) => {
    try {
        const { id } = req.params

        const updatedAlbum = await Album.findByIdAndUpdate(
            id,
            req.body, { new: true }
        )

        if (!updatedAlbum) {
            return res.status(404).send({ error: 'Album not found' });
        }

        res.send(updatedAlbum);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteAlbum = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedAlbum = await Album.findByIdAndDelete(id);

        if (!deletedAlbum) {
            return res.status(404).send({ error: 'Album not found' })
        }

        res.send({ message: 'Album was removed', data: deletedAlbum })

    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum
}