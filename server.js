const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
    //console.log("Request made");
    //console.log(req.url, req.method);

    //lodash

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log("Hello");
    });

    greet();

    //Set content header type
    //res.setHeader("Content-type", "text/plain");
    res.setHeader("Content-type", "text/html");

    let path = "./views/";

    switch(req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-bla":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            break;
        default:
            path += "404.html";  
            res.statusCode = 404;  
    }

    /* res.write("<p>Hello, ninjas</p>");
    res.write("<p>Hello again, ninjas</p>");
    res.end(); */

    //Send an HTML file

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            
            res.end(data);
        }
    });
});

server.listen(3000, "localhost", () => {
    console.log("Listening for requests on port 3000");
});