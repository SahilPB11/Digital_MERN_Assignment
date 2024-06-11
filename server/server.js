// here we are importing the index.js from the server folder
import { app } from "./index.js";
// here we are importing the connect_with_database function from the config folder
import { connect_with_database } from "./config/Database.js";

const Port = process.env.PORT || 3000;

// here first we will connect with database then we will start the server
connect_with_database()
  .then(() => {
    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
