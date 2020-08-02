const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const Note = require("./models/notes");
const url = require("url");
const fs = require("fs");
const notes = require("./models/notes");

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
        await Note.find({}, "-_id -__v", (error, data) => {
          if (error) {
            console.log("Error retrieving notes", error);
          } else {
            res.writeHead(200, { "content-type": "application/json" });
            res.write(JSON.stringify(data));
            res.end();
          }
        });
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
        let noteIdPattern = "[a-zA-Z0-9]+";
        let pattern = new RegExp("/notes/" + noteIdPattern);
        if (pattern.test(urlpath)) {
          pattern = new RegExp(noteIdPattern);
          let noteIdObj = pattern.exec(urlpath);
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
        let noteIdPattern = "[a-zA-Z0-9]+";
        let pattern = new RegExp("/notes/" + noteIdPattern);
        if (pattern.test(urlpath)) {
          pattern = new RegExp(noteIdPattern);
          let noteIdObj = pattern.exec(urlpath);
          let id = noteIdObj.input.split("/")[2];
          let filter = { _id: id };
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });

          req.on("end", async () => {
            let update = JSON.parse(body);
            await Note.findOneAndUpdate(
              filter,
              update,
              { useFindAndModify: false },
              (error, data) => {
                if (error) {
                  console.log("Error creating note", error);
                } else {
                  let response = {
                    updatedData: update,
                    oldData: data,
                  };
                  res.writeHead(200, { "content-type": "application/json" });
                  res.write(JSON.stringify(response));
                  res.end();
                }
              }
            );
          });
        }
      }
      break;

    case "DELETE":
      if (urlpath === "/") {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({ greeting: "Hello world" }));
        res.end();
      } else {
        let noteIdPattern = "[a-zA-Z0-9]+";
        let pattern = new RegExp("/notes/" + noteIdPattern);
        if (pattern.test(urlpath)) {
          pattern = new RegExp(noteIdPattern);
          let noteIdObj = pattern.exec(urlpath);
          let id = noteIdObj.input.split("/")[2];

          await Note.findByIdAndDelete(id, (error, data) => {
            if (error) {
              console.log("Error creating note", error);
            } else {
              let response = {
                message: "Deleted Successfully",
                oldData: data,
              };
              res.writeHead(200, { "content-type": "application/json" });
              res.write(JSON.stringify(response));
              res.end();
            }
          });
        }
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
