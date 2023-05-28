import mysql from "mysql2/promise";
import { DATABASECONFIG } from "../../constant";

export async function POST(req, res) {
  let requestBody = await req.text();
  let data = JSON.parse(requestBody);

  let username = data.username;
  let password = data.password;
  try {
    const connection = await mysql.createConnection(DATABASECONFIG);
    const query = "SELECT * FROM account WHERE username = ? AND password = ?";
    const [results] = await connection.query(query, [username, password]);
    connection.end();

    if (results.length > 0) {
      return new Response(JSON.stringify(results[0]), {
        status: 200,
      });
    } else {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(email), {
      status: 500,
    });
  }
}
