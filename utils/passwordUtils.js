const bcrypt = require('bcryptjs');

// var encryptPasswordValue;
module.exports.encryptPassword = async (myPlaintextPassword) => {
    try {
        const hash = await bcrypt.hash(myPlaintextPassword,10)
        return hash;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports.checkPassword=async(loginPassword,userPassword)=>{
    const match = await bcrypt.compare(loginPassword, userPassword);
    return match?true:false;
}