import  express from "express"
import { prismaclient } from "./prisma/prsimaclient.js"
import cors from "cors"

const app=express()
app.use(cors())
app.use(express.json())
//retrive all books
app.get("/books",async (req,res)=>{
    try{
        const books=await prismaclient.book.findMany({
            include:{
                reviews:true
            }
        })
        res.json({
            books
        })
    }catch(e){
        console.log(e)

    }
})
//retrive a specific book
app.get("/books/:id",async (req,res)=>{
    try{
        const id=parseInt(req.params.id)
        const book =await prismaclient.book.findFirst({
            where:{
                bookid:id
            }
        })
        res.send({book})


        res.json({book})
    }catch(e){
        console.log(e)
    }

})
//add a new book(done)
app.post("/addbook",async(req,res)=>{
    try {
        const { title, author, role ,adminId,imageUrl,description} = req.body;
        if(role==="user"){
            res.send("Admins only")
        }
        const newBook = await prismaclient.book.create({
            data: {
                title,
                author,
                adminId,
                imageUrl,
                description
            }
        });

        res.json({ id: newBook.bookid });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//retrive reviews for a book(done)
app.get("/reviews/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id)){
             res.status(400).json({ error: "Invalid book ID" }); 
        }
        
        const reviews=await prismaclient.review.findMany({
            where:{
                bookId:id
            }
        })

            if (!reviews) {
                res.send({ message: "No reviews found" }); 
            }
        
         res.json({reviews});
    }catch(e){
        console.log(e)

    }
})
//submit a new review(done)
app.post("/addreview/:id",async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
        const {content,rating,userId}=req.body
    if (!userId || !content || !rating == null) {
         res.status(400).json({ error: "bookid, content, and rating are required" });
    }
    
    const newReview = await prismaclient.review.create({
        data: {
            content,
            rating, 
            userId ,
            bookId:id
        },
    });
    if(!newReview){
        res.send("Review not added")
    }
    res.send({newReview})

    }catch(e){
        console.log(e)

    }
})
//retrive a user profile(done)
app.get("/user/:id",async(req,res)=>{
    const id=req.params.id
    const user=await prismaclient.user.findUnique({
        where:{id}
    })

    if (!user) {
         res.status(404).json({ error: "User not found" });
    }

    res.json({user});
})
//update user profile(done)
app.post("/userUpdate/:id",async(req,res)=>{
    const id=req.params.id
    const {username,role}=req.body

    const user=await prismaclient.user.update({
        where:{id:id},
        data:{
            username:username,
            role
        }
    })
    if(!user){
        res.status(401).send("User not Updated")
    }
    res.send({user})
})
//add a new user(done)
app.post("/createuser",async(req,res)=>{
    try{
        const {username,role}=req.body
        const user=await prismaclient.user.create({
            data:{
                username,
                password:"123",
                role
            }
        })
        if(!user){
            res.status(401).send("User not created")
        }
        res.json({user})

    }catch(e){
        console.log(e)

    }
})
app.listen(3002)