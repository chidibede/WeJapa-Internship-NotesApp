const Note = require("../models/notes");
const fs = require('fs');

module.exports = delete_requests = {

    deleteNote: async (req, res) => {
        let noteIdPattern = "[a-zA-Z0-9]+";
        let pattern = new RegExp("/notes/" + noteIdPattern);
        if (pattern.test(req.url)) {
          pattern = new RegExp(noteIdPattern);
          let noteIdObj = pattern.exec(req.url);
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
    
}
