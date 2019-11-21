const server = require("./api");
const PORT=process.env.PORT||3000;
server.listen(PORT, function() {
  console.log("Server is Listening at Port 3000");
});
