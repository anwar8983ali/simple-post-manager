

const express=require("express");

const app=express();

const port = process.env.PORT || 8080;

const path=require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const { v4: uuidv4 } = require('uuid');// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed

let posts=[{id:uuidv4() ,username:"apnaCollege",content:"I love doing coding"},
{id:uuidv4(),username:"anwar8083ali",content:"I love to do things freely"},
 {id:uuidv4(),username:"harry",content:"Love to teach technical subjects"}
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id); // IDs are strings, so use strict ===
    res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let newContent=req.body.content;
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
     let { id } = req.params;
     posts =posts.filter((p)=>id!==p.id);
     res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("app is listening at port:",port);
})
