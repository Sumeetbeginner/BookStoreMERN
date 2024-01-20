import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router()
 
router.post('/', async (req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message : 'Send all required fields'
            })
        }

        const newBook = {
            title: req.body.title,
            author : req.body.author,
            publishYear: req.body.publishYear,
        }

        const book = await Book.create(newBook)
        return res.status(200).send(book)
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

router.get('/', async (req, res) => {
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count:books.length,
            data:books
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message : error.message})
    }
})  

//Get Book by id
router.get('/:id', async (req, res) => {
    try{
       const {id} = req.params;
       const book = await Book.findById(id)
       return res.status(200).json(book) 

    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message : error.message})
    }
})

//Update a Book
router.put('/:id', async (req, res)=>{
    try{

        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message : 'Send all required fields'
            })
        }

        const {id} = req.params
        const result = await Book.findByIdAndUpdate(id,req.body) 

        if(!result){
            return res.status(404).send({message : 'Book Not Found'})
        }
        else{
            return res.status(200).send({message: 'Book Updated Successfully'})
        }

    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message : error.message})
    }
})

//Delete a Book
router.delete('/:id', async (req,res) =>{

    try{

       const {id} = req.params;
       const result = await Book.findByIdAndDelete(id)

       if(!result){
        return res.status(404).send({message:'Book not Found'})
       }
       else{
        return res.status(200).send({message : 'Book Deleted Successfully'})
       }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).send({message : error.message})
    }

})

export default router