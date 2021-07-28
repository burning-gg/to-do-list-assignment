const express = require("express");
const router = express.Router();
const Op = require("Sequelize").Op;
const { Tasks, Users } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const tasksList = await Tasks.findAll(/*{
    where: {
      [Op.or]: [
        { creatorUserId: { [Op.eq]: req.user.id } },
        { resUserId: { [Op.eq]: req.user.id } },
      ],
    },
  }*/);

  // Getting responsive's usernames for Tasks
  const resUserPromises = [];
  await tasksList.forEach((task) => {
    const user = Users.findOne({ where: { id: task.resUserId } });

    resUserPromises.push(user);
  });

  const resUsernames = [];
  Promise.all(resUserPromises).then((responses) => {
    responses.forEach((response) => {
      resUsernames.push(response.dataValues.username);
    });

    for (let i in tasksList) {
      tasksList[i].dataValues.res_username = resUsernames[i];
    }

    res.json({ tasksList });
  });
});

// router.get("/:id", validateToken, async (req, res) => {
//   const task_id = req.params.id;
//   await Tasks.findOne({ where: { id: task_id } })
//     .then((result) => {
//       console.log(result);
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json({ error: err.name });
//     });
// });

router.post("/", validateToken, async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    ends_at: req.body.ends_at,
    priority: req.body.priority,
    status: req.body.status,
  };
  task.creatorUserId = req.user.id;

  await Users.findOne({
    where: {
      username: req.body.res_username,
      manager_username: req.user.username,
    },
  })
    .then((result) => {
      task.resUserId = result.id;

      Tasks.create(task).then((postFromDb) => {
        task.created_at = postFromDb.created_at;
        task.updated_at = postFromDb.updated_at;

        task.res_username = result.username;
        res.json(task);
      });
    })
    .catch((err) => {
      if (err.name === "TypeError")
        res.json({ error: "User not found or not your employee" });
      else res.json({ error: err.name });
    });
});

router.put("/", validateToken, async (req, res) => {
  const { title, description, ends_at, priority, status, res_username } =
    req.body.data;
  const id = req.body.id;
  // console.log(req.body.data);
  // console.log(req.body);

  await Users.findOne({
    where: {
      username: res_username,
      manager_username: req.user.username,
    },
  })
    .then((result) => {
      Tasks.update(
        {
          title,
          description,
          ends_at,
          priority,
          status,
          resUserId: result.dataValues.id,
        },
        { where: { id } }
      ).then(() => {
        Tasks.findOne({ where: { id } }).then((result) => {
          result.dataValues.res_username = res_username;
          res.json(result);
        });
      });
    })
    .catch((err) => {
      if (err.name === "TypeError")
        res.json({ error: "User not found or not your employee" });
      else res.json({ error: err.name });
    });
});

router.put("/:id", validateToken, async (req, res) => {
  const { id, status } = req.body;

  await Tasks.update({ status }, { where: { id } })
    .then(() => {
      Tasks.findOne({ where: { id } }).then((result) => res.json(result));
    })
    .catch((err) => res.json({ error: err.name }));
});

router.delete("/:id", validateToken, async (req, res) => {
  const task_id = req.params.id;
  await Tasks.destroy({
    where: { id: task_id },
  })
    .then(() => {
      res.json({ data: "Task deleted successfully" });
    })
    .catch((err) => {
      res.json({ error: err.name });
    });
});

module.exports = router;
