const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const Note = require("./models/notes");
const url = require("url");

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log("Error connecting to mongoDB");
    } else {
      console.log("Connected to MongoDB Successfully");
    }
  }
);

const server = http.createServer(async (req, res) => {
  let urlObj = url.parse(req.url, true);
  let urlpath = urlObj.pathname;
  switch (req.method) {
    case "GET":
      if (urlpath === "/") {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({ greeting: "Hello world" }));
        res.end();
      } else if (urlpath === "/notes" || urlpath === "/notes/") {
        await Note.find((error, data) => {
          if (error) {
            console.log("Error retrieving notes", error);
          } else {
            res.writeHead(200, { "content-type": "application/json" });
            res.write(JSON.stringify(data));
            res.end();
          }
        });
      } else {
        let noteIdPattern = "[a-zA-Z0-9]+";
        let pattern = new RegExp("/notes/" + noteIdPattern);
        if (pattern.test(urlpath)) {
          pattern = new RegExp(noteIdPattern);
          let noteIdObj = pattern.exec(urlpath);
          let id = noteIdObj.input.split("/")[2];
          await Note.findById(id, (error, data) => {
            if (error) {
              console.log("Error retrieving notes", error);
            } else {
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(data));
              res.end();
            }
          });
        }
      }
      break;

    case "POST":
      if (urlpath === "/") {
        res.writeHead(401, { "content-type": "application/json" });
        res.write(
          JSON.stringify({ error: "cannot have post method on this route" })
        );
        res.end();
      } else if (urlpath === "/notes") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          try {
            let postBody = JSON.parse(body);
            let notes = Note(postBody);
            await notes.save((error, data) => {
              if (error) {
                console.log("Error creating note", error);
              } else {
                let response = {
                  data: data,
                };
                res.writeHead(200, { "content-type": "application/json" });
                res.write(JSON.stringify(response));
                res.end();
              }
            });
          } catch (err) {
            console.log("Error " + err);
          }
        });
      } else {
        res.writeHead(401, { "content-type": "text/plain" });
        res.write(JSON.stringify({ error: "Invalid endpoint" }));
        res.end();
      }
      break;
    default:
      break;
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});
