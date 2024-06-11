import { app } from "./index.js";

const Port = process.env.PORT || 3000;

// here first we will coonect with database then we will start the server

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
