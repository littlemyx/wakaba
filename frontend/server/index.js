import express from "express";
import { engine } from "express-handlebars";

const app = express();
const port = 3000;

app.engine(
  "handlebars",
  engine({
    partialsDir: ["../views/components/"],
    helpers: {
      section: function (name, options) {
        if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
      formatDate: function (date) {
        console.log(date);
        return new Date(date).toLocaleString();
      },
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "../views");

app.get("/", async (req, res) => {
  const response = await fetch(`http://localhost:3001/boards`);
  const data = await response.json();
  console.log(data);
  res.render("pages/home", { boards: data });
});

app.get("/components/:slug", (req, res) => {
  res.render(`components/${req.params.slug}`, {
    layout: false,
    text: "Hello world",
  });
});

app.get("/board/:boardId", async (req, res) => {
  const { boardId } = req.params;
  console.log(boardId);
  const response = await fetch(`http://localhost:3001/board/${boardId}`);
  console.log(response);
  const { boardName, threads } = await response.json();
  console.log(`threads: ${threads}`);
  res.render(`pages/board`, {
    threads,
    boardId,
    boardName,
  });
});

app.get("/board/:boardId/thread/:threadId", async (req, res) => {
  const { boardId, threadId } = req.params;
  console.log(boardId, threadId);
  const response = await fetch(`http://localhost:3001/thread/${threadId}`);
  const { title, posts } = await response.json();
  res.render(`pages/thread`, {
    title,
    posts,
    boardId,
    threadId,
  });
});

app.get("/:slug", (req, res) => {
  res.render(req.params.slug);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(404).render("pages/404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
