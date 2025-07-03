const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const handleNewUser = async (req, res) => {
    const { email, username, password } = req.body;
    console.log("Incoming Request Body:", req.body);
    if(!username || !password) return res.status(400).json({'message': `Username and password are required.`});

    const duplicate =await User.findOne({ username: username }).exec();
    if(duplicate) return res.sendStatus(409);
    try{
        // const roles = Object.values(foundUser.roles)

        // encrypt the password
        const hashedpwd = await bcrypt.hash(password, 10);
const accessToken = jwt.sign(
                        { 
                            "UserInfo": { 
                                "email": email, 
                                "username": username,
                                // "roles" : roles
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '60s'}
                    );
        // create and store the new user
        const result = await User.create({
            'email': email,
            'username': username, 
            'password': hashedpwd,
            'accessToken': accessToken
        })

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created`});
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

module.exports = { handleNewUser }