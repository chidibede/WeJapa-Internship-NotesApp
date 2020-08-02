const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const url = require("url");
const fs = require("fs");
const requests = require('./controllers/notesController')
const update_requests = require('./controllers/updateNotesController')
const Note = require("./models/notes");

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
        requests.home(res)
      } else if (urlpath === "/notes" || urlpath === "/notes/") {
        requests.allNotes(res)
      } else if (urlpath === "/notes/sortByCategories/Personal") {
        await Note.find( 
          { categories: urlpath.split("/")[3] },
         "-_id -__v",
          (error, data) => {
            if (error) {
              console.log("Error retrieving notes", error);
            } else {
              let noteTitleArray = [];
              data.forEach((item) => {
                noteTitleArray.push(item.title.replace(/\s+/g, "_"));
              });

              if (!fs.existsSync("notes_folder/Personal")) {
                fs.mkdirSync("notes_folder/Personal");
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Personal/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              } else {
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Personal/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              }

              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(data));
              res.end();
            }
          }
        );
      } else if (urlpath === "/notes/sortByCategories/Study") {
        await Note.find(
          { categories: urlpath.split("/")[3] },
          "-_id -__v",
          (error, data) => {
            if (error) {
              console.log("Error retrieving notes", error);
            } else {
              let noteTitleArray = [];
              data.forEach((item) => {
                noteTitleArray.push(item.title.replace(/\s+/g, "_"));
              });

              if (!fs.existsSync("notes_folder/Study")) {
                fs.mkdirSync("notes_folder/Study");
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Study/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              } else {
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Study/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              }

              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(data));
              res.end();
            }
          }
        );
      } else if (urlpath === "/notes/sortByCategories/Work") {
        await Note.find(
          { categories: urlpath.split("/")[3] },
          "-_id -__v",
          (error, data) => {
            if (error) {
              console.log("Error retrieving notes", error);
            } else {
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(data));
              res.end();
            }
          }
        );
      } else if (urlpath === "/notes/sortByCategories/Work") {
        await Note.find(
          { categories: urlpath.split("/")[3] },
          "-_id -__v",
          (error, data) => {
            if (error) {
              console.log("Error retrieving notes", error);
            } else {
              let noteTitleArray = [];
              data.forEach((item) => {
                noteTitleArray.push(item.title.replace(/\s+/g, "_"));
              });

              if (!fs.existsSync("notes_folder/Work")) {
                fs.mkdirSync("notes_folder/Work");
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Work/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              } else {
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Work/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              }

              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(data));
              res.end();
            }
          }
        );
      } else if (urlpath === "/notes/sortByCategories/Others") {
        await Note.find(
          { categories: urlpath.split("/")[3] },
          "-_id -__v",
          (error, data) => {
            if (error) {
              console.log("Error retrieving notes", error);
            } else {
              let noteTitleArray = [];
              data.forEach((item) => {
                noteTitleArray.push(item.title.replace(/\s+/g, "_"));
              });

              if (!fs.existsSync("notes_folder/Others")) {
                fs.mkdirSync("notes_folder/Others");
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Others/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              } else {
                for (let i = 0; i < noteTitleArray.length; i++) {
                  fs.rename(
                    "notes_folder/" + noteTitleArray[i] + ".txt",
                    "notes_folder/Others/" + noteTitleArray[i] + ".txt",
                    (err) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("file sorted successfully");
                      }
                    }
                  );
                }
              }

              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(data));
              res.end();
            }
          }
        );
      } else {
        requests.oneNote(req, res)
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
        requests.createNote(req, res)
      } else {
        res.writeHead(401, { "content-type": "text/plain" });
        res.write(JSON.stringify({ error: "Invalid endpoint" }));
        res.end();
      }
      break;

    case "PUT":
      if (urlpath === "/") {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({ greeting: "Hello world" }));
        res.end();
      } else {
        update_requests.updateNote(req, res)
      }
      break;

    case "DELETE":
      if (urlpath === "/") {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({ greeting: "Hello world" }));
        res.end();
      } else {
        update_requests.deleteNote(req, res)
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
