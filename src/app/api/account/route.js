import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecommerce",
};

export async function GET(req, res) {
  const { id } = req.params;

  if (id) {
    // Handle request with ID parameter
    const connection = await mysql.createConnection(config);
    const [results] = await connection.query(
      "SELECT * FROM account WHERE id = ?",
      [id]
    );
    console.log(`results`, results);
    connection.end();
    // ...
  } else {
    // Handle request without ID parameter
    const connection = await mysql.createConnection(config);
    const [results] = await connection.query("SELECT * FROM account");
    console.log(`results`, results);
    connection.end();
    // ...
  }
}
