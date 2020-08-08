const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const url = require("url");
const fs = require("fs");
const requests = require("./controllers/notesController");
const update_requests = require("./controllers/updateNotesController");
const delete_requests = require("./controllers/deleteNotesController");
const sort_notes = require("./controllers/sortNotes");
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
        requests.home(res);
      } else if (urlpath === "/notes" || urlpath === "/notes/") {
        requests.allNotes(res);
      } else if (urlpath === "/notes/sortByCategories/Personal") {
        sort_notes.sortNoteByPersonal(req, res);
      } else if (urlpath === "/notes/sortByCategories/Study") {
        sort_notes.sortNoteByStudy(req, res);
      } else if (urlpath === "/notes/sortByCategories/Work") {
        sort_notes.sortNoteByWork(req, res);
      } else if (urlpath === "/notes/sortByCategories/Others") {
        sort_notes.sortNoteByOthers(req, res);
      } else {
        requests.oneNote(req, res);
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
        requests.createNote(req, res);
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
        update_requests.updateNote(req, res);
      }
      break;

    case "DELETE":
      if (urlpath === "/") {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({ greeting: "Hello world" }));
        res.end();
      } else {
        delete_requests.deleteNote(req, res);
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
