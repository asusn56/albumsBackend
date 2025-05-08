const AlbumType = require('../models/albumTypeModel');


const createAlbumType = async(req, res) => {
    try {
        const albumType = new AlbumType(req.body);
        await albumType.save();
        res.status(201).send(albumType);
    } catch (error) {
        res.status(500).send(error);
    }
};


const getAlbumTypes = async(req, res) => {
    try {
        const albumTypes = await AlbumType.find();
        res.status(200).send(albumTypes);
    } catch (error) {
        res.status(500).send(error);
    }
};


const getAlbumTypeById = async(req, res) => {
    try {
        const { id } = req.params;
        const albumType = await AlbumType.findById(id);

        if (!albumType) {
            return res.status(404).send({ error: 'Album type not found' });
        }

        res.status(200).send(albumType);
    } catch (error) {
        res.status(500).send(error);
    }
};
const updateAlbumType = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedAlbumType = await AlbumType.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAlbumType) {
            return res.status(404).send({ error: 'Album type not found' });
        }

        res.status(200).send(updatedAlbumType);
    } catch (error) {
        res.status(500).send(error);
    }
};


const deleteAlbumType = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedAlbumType = await AlbumType.findByIdAndDelete(id);

        if (!deletedAlbumType) {
            return res.status(404).send({ error: 'Album type not found' });
        }

        res.status(200).send({ message: 'Album type deleted successfully', data: deletedAlbumType });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createAlbumType,
    getAlbumTypes,
    getAlbumTypeById,
    updateAlbumType,
    deleteAlbumType
};