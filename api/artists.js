const express = require('express');

const { getArtists, getArtistById, createArtist, updateArtist, deleteArtist } = require('../controllers/artistController');

const router = express.Router();

router.get('/', getArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

module.exports = router;