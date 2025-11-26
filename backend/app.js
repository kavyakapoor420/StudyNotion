const express=require('express')
const mongoose=require('mongoose')


const app=express()

app.get('/',async(req,res)=>{
    res.send('hello from root route')
})

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})