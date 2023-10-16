const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./schemas/user-Schema");
const history = require("./schemas/history-Schema");

mongoose
  .connect("mongodb://127.0.0.1:27017/vchat")
  .then(() => console.log("Connection Established!"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000/", "http://localhost:3000"],
  })
);

app.get("/app/showAllUsers", (req, res) => {
  user
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showUser/:id", (req, res) => {
  user
    .findOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/showAllMeetData", (req, res) => {
  history
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.get("/app/getAllMeetData", (req, res) => {
  history
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.post("/app/addUser", (req, res) => {
  let newuser = new user({
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  newuser
    .save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.post("/app/addMeetData", (req, res) => {
  let newhistory = new history({
    id: req.body.id,
    meetid: req.body.roomid,
    meetname: req.body.meetname,
    userid: req.body.userSId,
    meettime: req.body.currentTime,
  });
  newhistory
    .save()
    .then((history) => {
      res.status(201).send(history);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/updateUser/:id", (req, res) => {
  let updateuser = {};
  if (req.body.firstname != undefined) {
    updateuser.firstname = req.body.firstname;
  }
  if (req.body.lastname != undefined) {
    updateuser.lastname = req.body.lastname;
  }
  if (req.body.email != undefined) {
    updateuser.email = req.body.email;
  }
  if (req.body.password != undefined) {
    updateuser.password = req.body.password;
  }
  user
    .updateOne({ id: req.params.id }, { $set: updateuser })
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.put("/app/addMeetData/:meetname/:meetid", async (req, res) => {
  let imeet = 0;
  const uid = req.body.uid;

  await history
    .findOne({ meetid: req.params.meetid, meetname: req.params.meetname })
    .then((meet) => {
      imeet = meet;
    })
    .catch((err) => {
      res.status(500).send();
      console.log(err);
    });

  if (imeet === null) {
    res.status(501).send();
  } else {
    let updateMeet = {};
    let flag = true;

    let usid = imeet.userid;

    if (usid === undefined) {
      usid = "";
    } else {
      usid = usid.split(",");
    }

    for (let i = 0; i < usid.length; i++) {
      if (usid[i] === uid) {
        flag = false;
      }
    }
    if (flag) {
      usid = usid + "," + uid.toString();
      //updateMeet.selling = imeet.mems + 1;
    } else {
      usid = usid + "";
    }

    updateMeet.userid = usid;

    history
      .updateOne(
        { meetid: req.params.meetid } && { meetname: req.params.meetname },
        { $set: updateMeet }
      )
      .then((updatedMeet) => {
        res.status(200).send(updatedMeet);
      })
      .catch((err) => {
        res.status(500).send(err);
        console.log(err);
      });
  }
});

app.delete("/app/deleteUser/:id", (req, res) => {
  user
    .deleteOne({ id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

app.listen(4000, () => console.log("Listening on port 4000..."));
