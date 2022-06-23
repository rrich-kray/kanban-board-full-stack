const express = require("express");
const app = express();
const PORT = 3001 || process.env.PORT;
const cors = require("cors");
const routes = require("./routes/apiRoutes");
const sequelize = require("./config/connection");

// appears that you must specify cors middleware for server prior to routes?
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
  });
});
