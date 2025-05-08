const mongoose = require('mongoose');
const ROLES = require('../config/roles')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value)
            },
            message: props => `${props.value} is not a valid username`
        }
    },
    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message: ({ value }) => {
                return `${value} Please enter valid email`
            }
        }
    },

    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER,
    }


})
module.exports = mongoose.model("User", userSchema);