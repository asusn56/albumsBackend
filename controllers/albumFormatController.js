const AlbumFormat = require("../models/albumFormatModel");

const createAlbumFormat = async(req, res) => {
    try {
        const albumFormat = new AlbumFormat(req.body);
        await albumFormat.save();
        res.status(201).send(albumFormat);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getAlbumFormats = async(req, res) => {
   
   

    try {
        const formats = await AlbumFormat.find()
            .populate("album", "title")
            .populate("albumType", "name")
            .populate({
                path: "album",
                populate: {
                    path: "artist",
                    select: "title"
                }
            });
        res.send(formats);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getAlbumFormatById = async(req, res) => {
    
    try {
        const albumId = req.query.albumId;
             
        

        const filter = albumId ? { album: albumId } : {};
        const format = await AlbumFormat.findById()
            .populate("album", "title")
            .populate("albumType", "name")
            .populate({
                path: "album",
                populate: {
                    path: "artist",
                    select: "title"
                }
            });
            
        if (!format) return res.status(404).send({ error: "Not found" });
        res.send(format);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateAlbumFormat = async(req, res) => {
    try {
        const format = await AlbumFormat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!format) return res.status(404).send({ error: "Not found" });
        res.send(format);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteAlbumFormat = async(req, res) => {
    try {
        const format = await AlbumFormat.findByIdAndDelete(req.params.id);
        if (!format) return res.status(404).send({ error: "Not found" });
        res.send({ message: "Deleted", data: format });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    createAlbumFormat,
    getAlbumFormats,
    getAlbumFormatById,
    updateAlbumFormat,
    deleteAlbumFormat
};