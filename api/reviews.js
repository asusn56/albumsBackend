const express = require('express');
const router = express.Router();
const { getAllReviews, getReviewsByAlbum, createReview, deleteReview,} = require('../controllers/reviewController');



router.get('/', getAllReviews);


router.get('/album/:albumId', getReviewsByAlbum);

router.post('/', createReview);

router.delete('/:id', deleteReview);

module.exports = router;