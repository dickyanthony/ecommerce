import mysql from "mysql2/promise";
import url from "url";
import { DATABASECONFIG } from "../../../constant";

const parseProductProperties = (product) => {
  const propertiesToParse = [
    "images",
    "code",
    "ratings",
    "reviews",
    "tags",
    "colors",
    "sizes",
    "reviews",
  ];
  for (const prop of propertiesToParse) {
    if (typeof product[prop] === "string") {
      product[prop] = JSON.parse(product[prop]);
    }
  }
};

export async function GET(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const { id } = parsedUrl.query;

  try {
    const connection = await mysql.createConnection(DATABASECONFIG);
    const query = `SELECT * FROM product WHERE id = "${id}"`;
    const [results] = await connection.query(query);

    connection.end();

    const product = results[0];
    parseProductProperties(product);

    return new Response(JSON.stringify(product));
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
