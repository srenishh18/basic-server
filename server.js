const http = require("http");
const fs = require("fs");
const path = require("path");

const pages = {
  "/": "home.html",
  "/about": "about.html",
  "/contact": "contact.html",
};

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const fileName = pages[pathname] || "404.html";
  const statusCode = pages[pathname] ? 200 : 404;
  const filePath = path.join(__dirname, "pages", fileName);

  response.setHeader("Content-Type", "text/html; charset=utf-8");

  fs.readFile(filePath, "utf8", (error, html) => {
    if (error) {
      console.error(`Could not read ${filePath}:`, error);
      response.writeHead(500);
      response.end("Internal Server Error");
      return;
    }

    response.writeHead(statusCode);
    response.end(html);
  });
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
