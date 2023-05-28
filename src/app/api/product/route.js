import mysql from "mysql2/promise";
import { DATABASECONFIG } from "../../constant";

export async function GET(req, res) {
  const connection = await mysql.createConnection(DATABASECONFIG);
  let query = "SELECT * FROM product";
  const [results] = await connection.query(query);

  console.log(`results`, results);
  connection.end();
  return new Response(JSON.stringify(results));
}
