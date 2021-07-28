const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    middle_name,
    username,
    password,
    manager_username,
  } = req.body;

  let is_manager = false;
  if (manager_username) {
    const manager = await Users.findOne({
      where: { username: manager_username },
    });

    if (!manager) res.json({ error: "Current manager doesn't exist" });
    else is_manager = true;
  }

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      first_name,
      last_name,
      middle_name,
      username,
      password: hash,
      manager_username,
    })
      .then(() => {
        Users.update({ is_manager }, { where: { username: manager_username } });

        res.json("User created successfully");
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.json({ error: "User with current username already exists" });
        }
        res.json({ error: err.name });
      });
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username } });

  if (!user) res.json({ error: "User doesn't exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong username and password combination" });

    const accessToken = sign(
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        username,
        manager_username: user.manager_username,
        is_manager: user.is_manager,
      },
      "secretstring"
    );
    res.json({
      token: accessToken,
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name,
      username,
      manager_username: user.manager_username,
      is_manager: user.is_manager,
    });
  });
});

router.get("/check", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
