const express = require("express");
const auth = require("../middleware/auth");
const AuthController = require("../controllers/AuthController");
const ArticleController = require("../controllers/ArticleController");
const router = express.Router();
router.get("/articles/:id", ArticleController.getById);
router.put("/articles/:id", auth, ArticleController.update);
router.delete("/articles/:id", ArticleController.remove);

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/users", auth, AuthController.getUsers);

router.post("/articles", auth, ArticleController.create);
router.get("/articles", ArticleController.list);

module.exports = router;
