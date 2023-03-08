const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("assets"));

// app.use(function (req, res, next) {
//   console.log("Middleware 1 called");
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("Middleware 2 called");
//   next();
// });

let contactList = [
  {
    personName: "Karan",
    number: "8168030662",
  },

  {
    personName: "Keshav",
    number: "153487913",
  },

  {
    personName: "Lalit",
    number: "879354312",
  },
];

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Error in fetching contacts");
      return;
    }

    return res.render("home", {
      title: "Contacts List",
      contact_list: contacts,
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Get an internship soon K" });
});

app.post("/create-contact", function (req, res) {
  // contactList.push({
  //   personName: req.body.personName,
  //   number: req.body.number,
  // });                     //We used to push data to contacts list variable above but now we push directly to database

  Contact.create(req.body); //it does not accept a callback function anymore

  return res.redirect("/");
});

app.get("/delete-contact/", function (req, res) {
  let idTobeDeleted = req.query.id;

  Contact.findByIdAndDelete(idTobeDeleted, function (err) {
    if (err) {
      console.log("Error in deleting the contact");
      return;
    }

    res.redirect;
  });

  return res.redirect("/");
});

app.listen(port, function (err) {
  if (err) {
    console.log("There is an error launching the site: ", err);
  }

  console.log("The express server is running on port: ", 8000);
});
