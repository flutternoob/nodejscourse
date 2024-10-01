const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

//connect to Mongodb

const dbUri = "mongodb+srv://netninja:test1234@nodetuts.zbdf9.mongodb.net/?retryWrites=true&w=majority&appName=nodetuts";
mongoose.connect(dbUri)
    .then((result) => {
        //console.log("Connected to db")
        app.listen(3000);
    })
    .catch((err) => console.log(err));

//register view engine

app.set("view engine", "ejs");

//listen for requests

//app.listen(3000);

//middleware and static files

app.use(express.static("public"));

/* app.use((req, res, next) => {
    console.log("New request made:");
    console.log("Host: ", req.hostname);
    //console.log("Path: ". req.path);
    console.log("Method: ", req.method);
    next();
}); */

/* app.use((req, res, next) => {
    console.log("In the next middleware:");
    next();
}); */

app.use(morgan("dev"));

//mongoose and mongo sandbox routes

/* app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "new blog 2",
        snippet: "about my new blog",
        body: "more about my new blog"
    });

    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
}) */

/* app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}); */

/* app.get("/single-blog", (req, res) => {
    Blog.findById("")
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}); */

app.get("/", (req, res) => {
    //res.send(`<p>Home Page</p>`);
    /* res.sendFile("./views/index.html", {
        root: __dirname
    }); */

    /* const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet"},
        {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet"},
        {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet"},
    ];

    res.render("index", { title: "Home" , blogs}); */

    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    //res.send(`<p>Home Page</p>`);
    /* res.sendFile("./views/about.html", {
        root: __dirname
    }); */
    res.render("about", { title: "About" });
});

//blog routes

app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "All Blogs" , blogs: result})
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get("/blogs/create/", (req, res) => {
    res.render("create", { title: "Create a new blog" });
});

//redirects

/* app.get("/about-us", (req, res) => {
    res.render("about"); 
}); */

//404 page, place at the very bottom of the routing script

app.use((req, res) => {
    /* res.sendFile(
        "./views/404.html", {
        root: __dirname
    }); */

    /* res.status(404).sendFile(
        "./views/404.html", {
        root: __dirname
    }); */
    res.status(404).render("404", { title: "Error" });
});