import express from "express";
import { db } from "./database.js";
import { init } from "./db/index.js";

init();

const app = express();
const port = 3001;

app.get("/boards", (req, res) => {
  const data = db.boards;
  console.log(`boards: ${data}`);
  res.json(data);
});

app.get("/board/:id", (req, res) => {
  const { id: boardShortName } = req.params;
  console.log(`boardId: ${boardShortName}`);
  const board = db.boards.find(({ shortName }) => shortName === boardShortName);
  console.log(`board: ${board}`);
  const { id, name: boardName } = board;
  const threads = db.threads.filter(({ boardId }) => boardId === id);
  console.log(threads);
  res.json({ boardName, threads });
});

app.get("/thread/:id", (req, res) => {
  const { id: threadId } = req.params;
  console.log(`threadId: ${threadId}`);
  const thread = db.threads.find(({ id }) => id === parseInt(threadId));
  const { title: threadTitle } = thread;
  const posts = db.posts
    .filter(({ threadId }) => threadId === parseInt(threadId))
    .sort((a, b) => a.createdAt - b.createdAt);
  res.json({ title: threadTitle, posts });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
