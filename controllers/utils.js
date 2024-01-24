const jwt = require("jsonwebtoken")

const secretKey = "dfsgdffdsd";


const generateToken = (payload) => {

    try {
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })
        console.log(token);
        return token;
        
    } catch (error) {
        
    }
};



const verifyToken = () => {
    
}

module.exports={generateToken}