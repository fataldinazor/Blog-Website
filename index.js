//jshint esversion:6

const express = require("express");
const path=require("path")
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose=require ("mongoose");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

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
const homeStartingContent = "Welcome to our unique blog platform, where voices find freedom in anonymity. Our site is a safe haven for individuals to share their daily life experiences without constraints. We understand the power of authenticity and the impact that everyday stories can have on our lives. Here, you can release your thoughts, feelings, and reflections without revealing your identity. Whether it's a moment of triumph, a lesson learned, or a simple joy, your story matters. Join our community of storytellers who embrace the beauty of vulnerability and the strength of shared experiences. Let your voice resonate as part of a collective journey, where every post adds depth and color to the tapestry of life. Welcome to a space where authenticity shines and where your stories can touch hearts without bounds.";
const aboutContent = "Welcome to the page of our anonymous storytelling platform. Here, we believe that everyone's story is a masterpiece waiting to be told. Our platform was born out of the idea that sharing our everyday experiences, even the seemingly ordinary ones, can create connections that transcend boundaries. We understand that life is a collection of moments, and each individual experience contributes to the rich tapestry of human existence. Our mission is to provide a space where people can share their thoughts, challenges, and joys without the pressure of judgment or expectations. Whether you're a passionate writer or someone looking to share a snippet of life, you'll find a community that welcomes and celebrates your narrative. Join us on this journey of human connection, where stories bridge gaps and remind us that, even in our anonymity, we are all part of something greater.";
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
