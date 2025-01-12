var express = require('express');
var router = express.Router();
const Notes = require('../models/notes')
const withAuth = require('../middlewares/auth');
const notes = require('../models/notes');

//criar uma nova nota vinculada ao token do usuário
router.post('/', withAuth,  async(req, res) => {
    let {title, body} = req.body
    try {
        let notes = new Notes({title, body, author: req.user._id})
        await notes.save()
        res.json({'nota criada com sucesso': notes})
    } catch (error) {
        res.status(500).json({error: 'Erro ao criar nota, tente novamente.'})
    }
})

//editar a nota
router.put('/:id', withAuth, async(req, res) => {
    let id = req.params.id
    let {title, body} = req.body
     try {
        let note = await Notes.findById(id)
        if(isOwner(req.user, note)){
            let putNote = await Notes.findOneAndUpdate({_id: id}, {$set: {title, body}},{upsert: true, new: true})
            console.log(putNote)
            res.status(200).json( {putNote} );
        }else{
            res.status(401).json({error: "Atualização negada."})
        }
     } catch (error) {
         res.status(500).json({error: "Erro interno no servidor, tente novamente."})
     }
})

//deletar a nota
router.delete('/:id', withAuth, async(req, res) => {
    let id = req.params.id
     try {
        let deleteNote = await Notes.findById(id)
        if(isOwner(req.user, deleteNote)){
            let deletedNote = await Notes.findOneAndDelete({_id: id})
            res.status(200).json({deletedNote})
        }else{
            res.status(401).json({error: "Acesso negado."})
        }
     } catch (error) {
         res.status(500).json({error: "Erro interno no servidor, tente novamente."})
     }
})

//procurar alguma nota específica
router.get('/search', withAuth,  async(req, res) => {
    let {query} = req.query
        try {
        let note = await Notes.find(
            {
                author: req.user._id,
                $or: [
                    { title: { $regex: new RegExp('^' + query, 'i') } },
                    { body: { $regex: new RegExp('^' + query, 'i') } }
                ]
            },
            {
                title: 1,
                body: 1
            }
        )
        res.status(200).json({note})
        console.log(note)
       } catch (error) {
            res.status(500).json({error: "problema interno ao tentar procurar a nota, por favor, tente novamente."})
        }
})

//pegar uma nota específica relacionada ao id
router.get('/:id', withAuth, async(req, res) => {

    try {
        let {id} = req.params
        let note = await Notes.findById(id)
        if(isOwner(req.user, note)){
            res.json({note})
        }else{
            res.status(500).json({error: "Acesso negado."})
        }
    } catch (error) {
        res.status(400).json({error: "problema ao baixar a nota."})
    }
})

//pegar todas as notas referente ao id do autor
router.get('/', withAuth, async(req, res) => {
    try {
        let allNotes = await Notes.find({author: req.user._id})
        res.status(200).json({allNotes})
    } catch (error) {
        res.status(500).json({error: "problema interno ao tentar baixar a nota, por favor, tente novamente."})
    }
})


//método de verificação do id do usuário vinculado ao token e ao id do autor da nota
const isOwner = (user, note) => {
    if(JSON.stringify(user._id) == JSON.stringify(note.author._id)){
        return true
    }else{
        return false
    }
}

module.exports = router