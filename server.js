require('dotenv').config();
require('./db')

const cors = require("cors");
const express = require("express");
const process = require("process");
    


const app = express();

app.use(cors());
app.use(express.json());

const albumsApi = require("./api/albums");
const artistsApi = require("./api/artists");
const genreApi = require('./api/genre');
const albumTypesApi = require('./api/albumTypes');
const albumFormatApi = require('./api/albumFormat');
const reviewsApi = require('./api/reviews');
const usersApi = require('./api/users');
const cartApi = require('./api/cart');
app.use("/api/albums", albumsApi);
app.use('/api/album-formats', albumFormatApi);
app.use('/api/artists', artistsApi);
app.use('/api/genres', genreApi);
app.use('/api/album-types', albumTypesApi);
app.use('/api/reviews', reviewsApi);
app.use('/api/users', usersApi);
app.use('/api/cart', cartApi);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));