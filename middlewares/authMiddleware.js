const process = require('process')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {


    const token = req.header('Authorization')?.replace('Bearer ', '')
   

    if (!token) {
        return res.status(401).json({ message: 'Access denied.' })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
       
        // req.user = { ...decoded, _id: decoded.id };

        next()
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = authMiddleware