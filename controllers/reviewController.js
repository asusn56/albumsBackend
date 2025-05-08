const Review = require('../models/reviewModel');


const getAllReviews = async(req, res) => {
    try {
        const reviews = await Review.find()
            .populate('album', 'title')
            .populate('user', 'username email');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get reviews' });
    }
};


const getReviewsByAlbum = async(req, res) => {
    try {
        const albumId = req.params.albumId;
        const reviews = await Review.find({ album: albumId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });

        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};


// const createReview = async(req, res) => {
//     try {
//         const { album, rating, comment } = req.body;
//         const userId = req.user._id;

//         const existing = await Review.findOne({ album, user: userId });
//         if (existing) {
//             return res.status(400).json({ error: 'You already reviewed this album' });
//         }

//         const review = await Review.create({
//             album,
//             user: userId,
//             rating,
//             comment
//         });

//         res.status(201).json(review);
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to create review' });
//     }
// };

const createReview = async (req, res) => {
    try {
        const { album, rating, comment, user } = req.body;
        const userId = user || (req.user && req.user._id);

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const existing = await Review.findOne({ album, user: userId });
        if (existing) {
            return res.status(400).json({ error: 'You already reviewed this album' });
        }

        const review = await Review.create({
            album,
            user: userId,
            rating,
            comment,
        });

        res.status(201).json(review);
    } catch (err) {
        console.error(err); // log error for debugging
        res.status(500).json({ error: 'Failed to create review' });
    }
};


const deleteReview = async(req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);

        if (!review) return res.status(404).json({ error: 'Review not found' });


        if (String(review.user) !== String(req.user._id) && req.user.role !== 'Admin') {
            return res.status(403).json({ error: 'Not authorized to delete this review' });
        }

        await review.deleteOne();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};

module.exports = {
    getAllReviews,
    getReviewsByAlbum,
    createReview,
    deleteReview,
};