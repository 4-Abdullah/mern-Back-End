const User = require('../model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async ( req, res) => {
    const { identifier, password } = req.body
    console.log("Incoming Request Body:", req.body);

    if(!identifier || !password) return res.status(400).json({"message": `identifier and password are required.`})
    const isEmail = identifier.includes('@')
    const foundUser = await User.findOne(isEmail?{ email: identifier } : { username: identifier }).exec();
      
    if(!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password)
    if(match){
        const roles = Object.values(foundUser.roles)
        // create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo": { 
                    "identifier": foundUser.email || foundUser.username,
                    "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        );
        const refreshToken = jwt.sign(
           {"identifier": foundUser.email || foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        // const result = await foundUser.save();
        res.cookie(
            'jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); // secure: true
        res.json({ accessToken });
    }else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin };