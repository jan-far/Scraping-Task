import scrapeSReality from "./script";
import { Sequelize, DataTypes, Model } from "sequelize";
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

export class ScrapedData extends Model {
  public id!: number;
  public title!: string;
  public imageUrl!: string[];
}

ScrapedData.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.ARRAY(DataTypes.STRING) },
  },
  { sequelize, modelName: "scraped_data" }
);

// Function to save the scraped data
const saveData = async (data: { title: string; imageUrl: string[] }[]) => {
  // create the table
  await sequelize.sync();
  for (let item of data) {
    await ScrapedData.create(item);
  }
};

// Save the scraped data
const init = async () => {
  try {
    const scrapedData = await scrapeSReality();
    console.log("====================================");
    console.log("Scraped data recieved");
    console.log("====================================");
    saveData(scrapedData);
    console.log("====================================");
    console.log("Data saved!");
    console.log("====================================");
  } catch (error: any) {
    console.log("====================================");
    console.error("Error initializing scraped record:", error.message);
    console.log("====================================");
  }
};

init();
