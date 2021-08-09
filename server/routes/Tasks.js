const express = require("express");
const router = express.Router();
const Op = require("Sequelize").Op;
const { Tasks, Users } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

const { camelize } = require("../utils/camelize");
const { onlyUnique } = require("../utils/unique");

router.get("/", validateToken, async (req, res) => {
  // Pagination and sort by updated order
  const size = parseInt(req.query.size);
  const page = parseInt(req.query.page);

  const offset = (page - 1) * size;
  const limit = size;

  const tasksListAndCount = await Tasks.findAndCountAll({
    order: [["updated_at", "DESC"]],
    limit,
    offset,
  });
  const tasksList = tasksListAndCount.rows;
  const tasksCount = tasksListAndCount.count;

  // Getting responsible's usernames for Tasks
  const resUserIds = [];
  tasksList.forEach((task) => resUserIds.push(task.dataValues.res_user_id));

  const resUserUniqueIds = resUserIds.filter(onlyUnique);

  const resUsernames = new Map();

  await Users.findAll({
    where: {
      id: {
        [Op.in]: resUserUniqueIds,
      },
    },
  }).then((result) => {
    result.forEach((user) => {
      resUsernames.set(user.dataValues.id, user.dataValues.username);
    });
  });

  // Writing responsible's usernames in tasksList
  for (let i in tasksList) {
    const task = tasksList[i].dataValues;

    // Transfer lower_case attr's to camelCase
    for (let key in task) {
      const camelKey = camelize(key);

      if (camelKey !== key) {
        task[camelKey] = task[key];
        delete task[key];
      }
    }

    tasksList[i].dataValues.resUsername = resUsernames.get(
      tasksList[i].dataValues.resUserId
    );
  }

  res.json({ tasksList, tasksCount });
});

router.post("/", validateToken, async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    endsAt: req.body.endsAt,
    priority: req.body.priority,
    status: req.body.status,
  };
  task.creatorUserId = req.user.id;

  try {
    const isResUserExists = await Users.findOne({
      where: {
        username: req.body.resUsername,
        manager_username: req.user.username,
      },
    });

    task.resUserId = isResUserExists.id;

    await Tasks.create({
      title: task.title,
      description: task.description,
      ends_at: task.endsAt,
      priority: task.priority,
      status: task.status,
      creator_user_id: task.creatorUserId,
      res_user_id: task.resUserId,
    }).then((taskFromDb) => {
      task.id = taskFromDb.id;
      task.createdAt = taskFromDb.created_at;
      task.updatedAt = taskFromDb.updated_at;

      task.resUsername = isResUserExists.username;
      res.json(task);
    });
  } catch (err) {
    if (err.name === "TypeError")
      return res.json({ error: "User not found or not your employee" });
    res.json({ error: err.name });
  }
});

router.put("/", validateToken, async (req, res) => {
  const { title, description, endsAt, priority, status, resUsername } =
    req.body.data;
  const id = req.body.id;

  try {
    const resUser = await Users.findOne({
      where: {
        username: resUsername,
        manager_username: req.user.username,
      },
    });

    await Tasks.update(
      {
        title,
        description,
        ends_at: endsAt,
        priority,
        status,
        res_user_id: resUser.dataValues.id,
      },
      { where: { id } }
    );

    const updatedTask = await Tasks.findOne({ where: { id } });

    updatedTask.dataValues.resUsername = resUsername;

    // Transfer lower_case attr's to camelCase
    for (let key in updatedTask.dataValues) {
      const camelKey = camelize(key);

      if (camelKey !== key) {
        updatedTask.dataValues[camelKey] = updatedTask.dataValues[key];
        delete updatedTask.dataValues[key];
      }
    }

    res.json(updatedTask);
  } catch (err) {
    if (err.name === "TypeError")
      return res.json({ error: "User not found or not your employee" });
    res.json({ error: err.name });
  }
});

router.put("/:id", validateToken, async (req, res) => {
  const { id, status } = req.body;

  try {
    await Tasks.update({ status }, { where: { id } });

    const updateStatus = await Tasks.findOne({ where: { id } });

    res.json(updateStatus.status);
  } catch (err) {
    res.json({ error: err.name });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const task_id = req.params.id;

  try {
    await Tasks.destroy({
      where: { id: task_id },
    });

    res.json({ data: "Task deleted successfully" });
  } catch (err) {
    res.json({ error: err.name });
  }
});

module.exports = router;
