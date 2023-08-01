import express, { Response, Request } from "express";
import cors from "cors";
import { DataTypes, Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const user = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const database = process.env.POSTGRES_DB;
const host = process.env.POSTGRES_HOST;
const port = process.env.POSTGRES_PORT;

// Connect to the database
const sequelize = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${database}`
);

sequelize.define(
  "scraped_data",
  {
    title: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {}
);

const app = express();
const PORT = 3001;

app.use(cors());

// API endpoint to fetch the scraped data (replace this with the actual scraped data)
app.get("/api/scrapedData", async (req: Request, res: Response) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 20;

  const ScrapedData = sequelize.models.scraped_data;

  const scrapedData = await ScrapedData.findAll({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order: [["id", "ASC"]],
  });

  const totalItems = await ScrapedData.count();

  res.status(200).json({
    totalItems: totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
    page: page,
    pageSize: pageSize,
    items: scrapedData,
  });
});

app.get("/", (_: Request, res: Response) => {
  res.send("Server is up!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
