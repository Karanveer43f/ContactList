const mongoose = require("mongoose"); // require the library

mongoose.connect("mongodb://0.0.0.0/contacts_list_db"); // connect to the database

const db = mongoose.connection; // create a variable from the connection for future use

db.on(
  "error",
  console.error.bind(console, "error occurred while connecting to database")
);

db.once("open", function () {
  console.log("Successfully connected to the database");
});
