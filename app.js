const express = require("express");

const app = express();

//register view engine

app.set("view engine", "ejs");



//listen for requests

app.listen(3000);

app.get("/", (req, res) => {
    //res.send(`<p>Home Page</p>`);
    /* res.sendFile("./views/index.html", {
        root: __dirname
    }); */

    const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet"},
        {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet"},
        {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet"},
    ];

    res.render("index", { title: "Home" , blogs});
});

app.get("/about", (req, res) => {
    //res.send(`<p>Home Page</p>`);
    /* res.sendFile("./views/about.html", {
        root: __dirname
    }); */
    res.render("about", { title: "About" });
});

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