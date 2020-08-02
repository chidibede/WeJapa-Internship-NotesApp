const Note = require("../models/notes");
const fs = require('fs');

module.exports = update_requests = {

    updateNote: async (req,res) => {
        let noteIdPattern = "[a-zA-Z0-9]+";
        let pattern = new RegExp("/notes/" + noteIdPattern);
        if (pattern.test(req.url)) {
          pattern = new RegExp(noteIdPattern);
          let noteIdObj = pattern.exec(req.url);
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
    },

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
