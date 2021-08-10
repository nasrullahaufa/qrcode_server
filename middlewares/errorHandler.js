function errorHandler(err, req, res, next){
  console.log(err.name, err.message)
    switch(err.name) {

        case 'BADUSERPASS':
            
            
            res.status(400).json({ error: err.message})
            break;
        case 'JsonWebTokenError':
            res.status(401).json({error:"You are not authorized to perform this action"})
            break
        case 'PASSLENGTH':
            res.status(400).json({error:"Password length at least 6 characters"})
            break
     

        default:
            const status = err.status || 500
            const message = err.message || 'Internal Server Error'
            res.status(status).json({ error: message })
    }
}

module.exports = errorHandler