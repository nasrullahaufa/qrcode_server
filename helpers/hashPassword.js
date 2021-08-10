const bcrypt = require('bcryptjs')

function hashPassword(plainPassword){
    return bcrypt.hashSync(plainPassword, 8)
}

module.exports = hashPassword