const cluster = require("cluster");

const numCPUs = require("os").cpus().length;

// * Check Applicaton running in Master cluster or not
if (cluster.isMaster) {
  // * Execute App Again but in
  // * Child Mode
  console.log(numCPUs);
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  const colors = require("colors");
  const express = require("express");
  const app = express();

  const http = require("http");
  const port = 8080;

  app.get("/", (req, res) => {
    wait(5000);
    res.send("Welcom to the app");
  });

  app.get("/fast", (req, res) => {
    wait(0);
    res.send("Welcom to the app Fast");
  });

  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(colors.yellow("Server Started at port :: " + port));
  });

  function wait(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
    console.log(
      `Wait is over, duration :: ${duration}ms, start : ${start}, end : ${Date.now()}`
    );
  }
}
