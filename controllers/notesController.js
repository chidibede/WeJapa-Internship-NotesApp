const Note = require("../models/notes");

module.exports = requests = {
    home: (res) => {
        res.writeHead(200, { "content-type": "application/json" });
        res.write(JSON.stringify({ greeting: "Hello world" }));
        res.end();
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
    }
}