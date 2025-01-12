require('dotenv').config()
const secret = process.env.JWT_TOKEN

const jwt = require('jsonwebtoken')

const Users = require('../models/users')

const withAuth = (req, res, next) => {
    let token = req.headers['x-access-token']
    //resgatando token do header
    if(!token){
        res.status(401).json({error: 'No token verify'})
        //caso não tenha token retornará um erro
    }else{
        jwt.verify(token, secret, (err, decoded) => {
            //irá verificar o token resgatado do header, com a secret key, e retornará ou erro ou decoded
           if(err){
            res.status(401).json({error: 'Invalid token'})
            //após a verificação, se o token não for válido, retornará um erro
           }else{
            req.email = decoded.email
            //caso a verificação seja completa, a requisição do email irá ter o valor do decoded email atribuido
            Users.findOne({email: decoded.email}).then(user => {
                //irá procurar no mongo o usuário pelo email decodificado
                req.user = user
                //a requisição irá receber o usuário encontrado no banco
                 next()
            }).catch(err => {
                res.status(401).json({error: 'Erro ao autenticar usuário'})
                //caso ocorra algum erro ao autenticar o usuário, irá retornar o erro
            })
           }
        })
    }
}

module.exports = withAuth