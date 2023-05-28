import mysql from "mysql2/promise";
import { usePathname } from "next/navigation";

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "ecommerce",
};

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
  const router = usePathname();
  const routerId = router.split("/").pop();
  // console.log("id===>", routerId);
  // try {
  //   const connection = await mysql.createConnection(config); // Establish a connection
  //   const query = `SELECT * FROM product WHERE id = "${routerId}"`;
  //   const [results] = await connection.query(query);

  //   console.log(`results`, results);
  //   connection.end(); // Close the connection

  //   const product = results[0];
  //   parseProductProperties(product);
  console.log("test===>");
  return new Response(router);
  // } catch (error) {
  //   console.error("Error fetching product data:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
}
