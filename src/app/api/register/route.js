import mysql from "mysql2/promise";
import { DATABASECONFIG } from "../../constant";
export async function POST(req, res) {
  let requestBody = await req.text();
  let data = JSON.parse(requestBody);

  let username = data.username;
  let password = data.password;
  let address = data.address;

  try {
    const connection = await mysql.createConnection(DATABASECONFIG);

    const checkQuery = "SELECT * FROM account WHERE username = ?";
    const [checkResults] = await connection.query(checkQuery, [username]);

    if (checkResults.length > 0) {
      connection.end();
      return new Response(
        JSON.stringify({ message: "Username already exists" }),
        {
          status: 409,
        }
      );
    }

    const insertQuery =
      "INSERT INTO account (username, password, address) VALUES (?, ?, ?)";
    const [insertResults] = await connection.query(insertQuery, [
      username,
      password,
      address,
    ]);
    const newUserId = insertResults.insertId;

    connection.end();

    return new Response(
      JSON.stringify({
        id: newUserId,
        username: username,
        password: password,
        address: address,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
