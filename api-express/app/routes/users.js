var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const {promisify} = require("util")
const withAuth = require('../middlewares/auth')
const bcrypt = require('bcrypt')
require('dotenv').config()
const secretKey = process.env.JWT_TOKEN

const User = require('../models/users')

//rota de registro
router.post('/register', async (req, res) => {
  try {
    let {name, email, password} = req.body
    let user = new User({name, email, password})
    await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: 'Email já cadastrado, por favor, faça login.'})
  }
})

//rota do login
router.post('/login', async(req, res) => {
  const {email, password} = req.body
  //irá pegar o email e senha do body

  try {
    let userLogin = await User.findOne({email})
    //a varíavel irá armazenar o usuário encontrado a partir do email
    if(!userLogin){
      res.status(404).json({error: 'Email incorreto.'})
      //caso esse usuário não exista, irá retornar um erro"
    }else{
        const isCorrectPassword = await promisify(userLogin.isCorrectPassword).bind(userLogin)
          //variável recebe o método de verificação de senha referente ao usuário
          //promisify: converte uma função callback para permitir o uso de promises
          //bind: refere-se ao contexto atual
        if(!(await isCorrectPassword(password))){
          return res.status(404).json({error: "Senha incorreta"})
          //caso a senha esteja incorreta, retorna um erro
        }else{
          const token = jwt.sign({email}, secretKey, {expiresIn: "30D"})
          //caso esteja certa, o usuário terá um token relacionado ao seu email que expira em 30 dias
          return res.status(200).json({userLogin, token})
          //retorna o usuário e o token do usuário
        }
      
    }
  } catch (error) {
    res.status(500).json({error: 'erro ao logar usuário, por favor, tente novamente.'})
    //caso ocorra algum erro interno no servidor
  }
})


//rota para editar o usuário
router.put("/edit/:id", withAuth, async(req, res) => {
    const {id} = req.params
    const {name, email, password} = req.body
    const user = await User.findById(id)
    
    try {
      if(isOwner(req.user, user)){
        console.log('req.user', req.user)
        console.log('user', user)
        const updateData = {name, email, password}

        if(!user){
          res.status(404).json("Usuário não encontrado")
        }


        if(password){
          const newPassword = await bcrypt.hash(password, 10)
          updateData.password = newPassword
        }
        
        const newUserUpdate = await User.findByIdAndUpdate({_id: id}, {$set: updateData}, {new: true, runValidators: true})

        res.status(200).json({newUserUpdate})
        console.log(newUserUpdate)
      }else{
        res.status(403).json({error: 'Acesso negado.'})
      }
    } catch (error) {
      res.status(500).json({error: "Erro ao atualizar usuário"})
    }
})

//rota para deletar o usuário
router.delete("/edit/:id", withAuth, async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id)
    try {
      if(!user){
        res.status(404).json("Usuário não encontrado")
      }else{
      if(isOwner(req.user, user)){
        const userDelete = await User.findByIdAndDelete({_id: id})
        console.log(userDelete)
        res.status(200).json(userDelete)
      }else{
        res.status(403).json({error: "Acesso negado."})
      }
    }
    } catch (error) {
      res.status(500).json({error: "Erro interno ao deletar usuário, tente novamente."})
    }
})

//método de verificação do id do usuário com o token e do id passado como parâmetro
const isOwner = (userToken, user) => {
  if(JSON.stringify(userToken._id) == JSON.stringify(user._id)){
    return true
  }else{
    return false
  }
}

module.exports = router;
