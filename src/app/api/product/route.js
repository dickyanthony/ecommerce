import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "ecommerce",
};

export async function GET(req, res) {
  const connection = await mysql.createConnection(config); // Establish a connection
  let query = "SELECT * FROM product";

  const [results] = await connection.query(query);

  console.log(`results`, results);
  connection.end(); // Close the connection
  return new Response(JSON.stringify(results));
}
