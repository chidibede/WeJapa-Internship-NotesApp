const Note = require("../models/notes");
const fs = require("fs");

module.exports = sort_notes = {
  sortNoteByPersonal: async (req, res) => {
    await Note.find(
      { categories: req.url.split("/")[3] },
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
  },

  sortNoteByStudy: async (req, res) => {
    await Note.find(
      { categories: req.url.split("/")[3] },
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
  },

  sortNoteByWork: async (req, res) => {
    await Note.find(
        { categories: (req.url).split("/")[3] },
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
  },

  sortNoteByOthers: async (req, res) => {
    await Note.find(
        { categories: (req.url).split("/")[3] },
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
  },
};
