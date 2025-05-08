const express = require('express');
const {createAlbumType, getAlbumTypes, getAlbumTypeById, updateAlbumType, deleteAlbumType} = require('../controllers/albumTypeController');

const router = express.Router();

router.post('/', createAlbumType);
router.get('/', getAlbumTypes);
router.get('/:id', getAlbumTypeById);
router.put('/:id', updateAlbumType);
router.delete('/:id', deleteAlbumType);

module.exports = router;