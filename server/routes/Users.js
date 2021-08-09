const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");


router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    username,
    password,
    managerUsername,
  } = req.body;

  let isManager = false;
  if (managerUsername) {
    const manager = await Users.findOne({
      where: { username: managerUsername },
    });

    if (!manager) return res.json({ error: "Current manager doesn't exist" });
    else isManager = true;
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  
  try {
    await Users.create({
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      username,
      password: hashedPassword,
      manager_username: managerUsername,
    })

    await Users.update({ is_manager: isManager }, { where: { username: managerUsername } });

    res.json("User created successfully");
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") 
      return res.json({ error: "User with current username already exists" });
    res.json({ error: err.name });
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username } });

  if (!user) return res.json({ error: "User doesn't exist" }); 

  comparedPassword = await bcrypt.compare(password, user.password)
  
  if (!comparedPassword) return res.json({ error: "Wrong username and password combination" });

  const accessToken = sign(
    {
      id: user.dataValues.id,
      firstName: user.dataValues.first_name,
      lastName: user.dataValues.last_name,
      middleName: user.dataValues.middle_name,
      username,
      managerUsername: user.dataValues.manager_username,
      isManager: user.dataValues.is_manager,
    },
    process.env.JWT_TOKEN_KEY
  );

  res.json({
    token: accessToken,
    id: user.dataValues.id,
    firstName: user.dataValues.first_name,
    lastName: user.dataValues.last_name,
    middleName: user.dataValues.middle_name,
    username,
    managerUsername: user.dataValues.manager_username,
    isManager: user.dataValues.is_manager,
  });
});


router.get("/check", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
