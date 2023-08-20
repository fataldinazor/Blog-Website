//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose=require ("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://pushpeshjoshi141:KMfxyxj2Hw8vKZ2N@fataldinazor.luag4gu.mongodb.net/blogDB?retryWrites=true&w=majority", {  
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database");
})
.catch((err) => {
  console.error("Database connection error:", err);
});

const blogSchema=({
  title: String,
  post: String
})
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const Compose=mongoose.model("Compose",blogSchema);

const post1=new Compose({
  title: "Day1",
  post: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
})
const post2=new Compose({
  title:"Day2",
  post:"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
})

const post3=new Compose({
  title:"Day3",
  post:"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
})

let posts=[{}];

let postTemp=[post1,post2,post3];

app.get('/', (req,res)=>{
  // if(posts.length==0){
  //   posts=postTemp;
  // }else{
  //   try{
  //     posts = await Compose.find({});

  //   }catch(err){
  //     console.log(err);
  //   };
  // }
  // console.log(posts);

  Compose.find()
  .then(function(foundposts){

    if (posts.length===0)
    {
      posts=postTemp;    //put the elements in the database if it is empty
          //redirects for rendering the data of the database which is not empty now beacuse of above insertMany
    }else{

      posts=foundposts;
    }


   res.render('home.ejs',{
    content:homeStartingContent, 
    posts:posts});
 
  });




}); 

app.get('/about',(req,res)=>{
  res.render('about.ejs',{content:aboutContent});
})

app.get('/contact',(req,res)=>{
  res.render('contact.ejs',{content:contactContent});
})

app.get('/compose',(req,res)=>{
  res.render('compose.ejs');
})

app.get('/post/:day',(req,res,err)=>{

  const requestedTitle=_.lowerCase(req.params.day);

  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title)

    if(storedTitle===requestedTitle){
      // console.log("Match Found");
      res.render("post.ejs",{
      postTitle: post.title,
      postBody:  post.post
     })
    }
  })
})

app.post('/compose',(req,res)=>{
  
  
  const post=new Compose({
    title: req.body.title,
    post: req.body.cnt
  });

  post.save();
  res.redirect("/");
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
