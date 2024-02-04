const http = require("http");

const todos = [
  { id: 1, text: "todo 1" },
  { id: 2, text: "todo 2" },
  { id: 3, text: "todo 3" },
  { id: 4, text: "todo 4" },
  { id: 5, text: "todo 5" },
];

/**
 * Code to send back data for client based on api call
 */

// const server = http.createServer((req, res) => {
//   const { headers, url, method } = req;
//   console.log(`headers: ${headers}, url: ${url}, method: ${method}`);

//   // res.setHeader("Content-Type", "text/plain");
//   // res.write("Hello");

//   // res.setHeader("Content-Type", "text/html");
//   // res.write("<h1>Hello</h1>");
//   // res.write("<h3>Welcome to the node course!!</h3>");

//   // res.statusCode = 200;
//   // res.setHeader("Content-Type", "application/json");
//   // res.setHeader("X-Powered-By", "Node.js");

//   res.writeHead(200, {
//     "Content-Type": "application/json",
//     "X-Powered-By": "Node.js",
//   });

//   res.end(
//     JSON.stringify({
//       success: true,
//       data: todos,
//     })
//   );
// });

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();

      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null,
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        try {
          const { id, text } = JSON.parse(body);
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        } catch (e) {
          status = 400;
          response.error = "Oops! Bad Request.";
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(JSON.stringify(response));
    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
