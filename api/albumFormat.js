const express = require('express');
const {createAlbumFormat,getAlbumFormats,getAlbumFormatById, updateAlbumFormat, deleteAlbumFormat} = require('../controllers/albumFormatController')




const router = express.Router();
// router.get('/:albumId', async (req, res) => {
//     try {
//       const { albumId } = req.params;
//       const formats = await AlbumFormat.find({ albumId });
//       res.json(formats);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
router.get('/', getAlbumFormats);
// router.get('/:id', getAlbumFormatById);
router.post('/', createAlbumFormat);
router.get('/', getAlbumFormats);

router.put('/:id', updateAlbumFormat);
router.delete('/:id', deleteAlbumFormat);

module.exports = router;