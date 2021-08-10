const bcrypt = require('bcryptjs')

function checkPassword(plainPassword, encryptedPassword){
    return bcrypt.compareSync(plainPassword, encryptedPassword)
}

module.exports = checkPassword