import mysql from "mysql2/promise";
import { DATABASECONFIG } from "../../constant";

export async function POST(req, res) {
  let requestBody = await req.text();
  let data = JSON.parse(requestBody);

  let account_id = data.account_id;
  let product_id = data.product_id;
  let price = data.price;
  let quantity = data.quantity;
  let size = data.size;

  try {
    const connection = await mysql.createConnection(DATABASECONFIG);

    // Check if the product already exists in the cart
    const checkQuery =
      "SELECT * FROM cart WHERE account_id = ? AND product_id = ?";
    const [checkResults] = await connection.query(checkQuery, [
      account_id,
      product_id,
    ]);

    if (checkResults.length > 0) {
      // If the product already exists, update the quantity
      const updatedQuantity = checkResults[0].quantity + quantity;
      await connection.query(
        "UPDATE cart SET quantity = ? WHERE account_id = ? AND product_id = ?",
        [updatedQuantity, account_id, product_id]
      );
      return new Response(JSON.stringify({ message: "Item added to cart" }), {
        status: 200,
      });
    } else {
      // If the product doesn't exist, insert it into the cart
      await connection.query(
        "INSERT INTO cart (account_id, product_id, price, quantity, size) VALUES (?, ?, ?, ?, ?)",
        [account_id, product_id, price, quantity, size]
      );
      res.status(200).json({ message: "Product added to cart successfully." });
    }
    connection.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart." });
  }
}
