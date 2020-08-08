const Note = require("../models/notes");
const fs = require("fs");
const url = require('url');
const lookup = require("mime-types").lookup;
const nodeStatic = require('node-static');

let fileServer = new nodeStatic.Server('./public');


module.exports = requests = {
  home: (req, res) => {
    let parsedURL = url.parse(req.url, true);
    //remove the leading and trailing slashes
    let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
    /**
     *  /
     *  /index.html
     *
     *  /main.css
     *  /main.js
     */
    if (path == "") {
      path = "index.html";
    }

    let file =  fileServer.root + '/' + path;
    //async read file function uses callback
    fs.readFile(file, function (err, content) {
      if (err) {
        console.log(`File Not Found ${file}`);
        res.writeHead(404);
        res.end();
      } else {
        //specify the content type in the response
        console.log(`Returning ${path}`);
        res.setHeader("X-Content-Type-Options", "nosniff");
        let mime = lookup(path);
        res.writeHead(200, { "Content-type": mime });
        res.end(content);
      }
    });
  },

  allNotes: async (res) => {
    await Note.find({}, "-_id -__v", (error, data) => {
      if (error) {
        console.log("Error retrieving notes", error);
      } else {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
      }
    });
  },

  oneNote: async (req, res) => {
    let noteIdPattern = "[a-zA-Z0-9]+";
    let pattern = new RegExp("/notes/" + noteIdPattern);
    if (pattern.test(req.url)) {
      pattern = new RegExp(noteIdPattern);
      let noteIdObj = pattern.exec(req.url);
      let id = noteIdObj.input.split("/")[2];
      await Note.findById(id, "-_id -__v", (error, data) => {
        if (error) {
          console.log("Error retrieving notes", error);
        } else {
          res.writeHead(200, { "content-type": "application/json" });
          res.write(JSON.stringify(data));
          res.end();
        }
      });
    }
  },

  createNote: async (req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      let postBody = JSON.parse(body);
      let notes = Note(postBody);
      await notes.save((error, data) => {
        if (error) {
          console.log("Error creating note", error);
        } else {
          let response = {
            data: data,
          };
          let noteTitle = data.title.replace(/\s+/g, "_");
          console.log(noteTitle);
          res.writeHead(200, { "content-type": "application/json" });
          res.write(JSON.stringify(response));
          res.end();

          if (fs.existsSync("notes_folder")) {
            fs.writeFile(
              "notes_folder/" + noteTitle + ".txt",
              data.content,
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          } else {
            fs.mkdirSync("notes_folder");
            fs.writeFile(
              "notes_folder/" + noteTitle + ".txt",
              data.content,
              (err) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
      });
    });
  },
};
