import express from 'express';
import glob from 'glob';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

const createServer = (): express.Application => {
  //Setup Express
  const app = express();
  app.use(express.json());

  //Enable CORS
  app.use(cors());

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  //Routes
  glob.sync("./routes/*.routes.js").forEach(function (file) {
    app.use(
      `/api/${path.basename(path.resolve(file), ".routes.js")}`,
      require(path.resolve(path.resolve(file)))
    );
  });

  return app;
};

export default createServer;