const Article = require("../models/Article");

exports.create = async (req, res) => {
  const { text, title } = req.body;
  const username = req.user || "";

  const article = new Article({ title: title, text, createdBy: username });
  await article.save();

  const letters = ["r", "i", "m", "e", "s"];
  const frequencies = {};
  letters.forEach((l) => (frequencies[l] = 0));
  for (let c of text.toLowerCase()) {
    if (frequencies.hasOwnProperty(c)) frequencies[c]++;
  }

  res.send({ message: "Saved", frequencies });
};

exports.list = async (req, res) => {
  const articles = await Article.find().populate("createdBy", "username");
  res.send(articles);
};

exports.getById = async (req, res) => {
  const article = await Article.findById(req.params.id).populate(
    "createdBy",
    "username"
  );

  if (!article) {
    return res.status(404).send({ message: "Article not found" });
  }

  const letters = ["r", "i", "m", "e", "s"];
  const frequencies = {};
  letters.forEach((l) => (frequencies[l] = 0));

  for (let c of article.text.toLowerCase()) {
    if (frequencies.hasOwnProperty(c)) frequencies[c]++;
  }

  res.send({ ...article.toObject(), frequencies });
};
exports.update = async (req, res) => {
  const { title, text } = req.body;
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    { title, text },
    { new: true }
  );
  if (!updated) return res.status(404).send({ message: "Article not found" });
  res.send({ message: "Article updated", article: updated });
};

exports.remove = async (req, res) => {
  const deleted = await Article.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send({ message: "Article not found" });
  res.send({ message: "Article deleted" });
};
