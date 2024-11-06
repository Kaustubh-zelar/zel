// // app/api/mongo/insert/route.ts
// import { MongoClient } from "mongodb";
// import { NextRequest } from "next/server";

// // Fetch MongoDB URI from environment variables for security
// const url = process.env.MONGODB_URI as string;
// const client = new MongoClient(url);

// export async function POST(request: NextRequest) {
//   try {
//     await client.connect();
//     const db = client.db("users");
//     const col = db.collection("user_col");

//     console.log("Successfully connected to Atlas");

//     // Insert the new document into MongoDB
//     const result = await col.insertOne({
//       name: { first: "Alan", last: "Turing" },
//       birth: new Date(1912, 5, 23), // May 23, 1912
//       death: new Date(1954, 5, 7),  // May 7, 1954
//       contribs: ["Turing machine", "Turing test", "Turingery"],
//       views: 1250000,
//     });

//     // Return the result as a response
//       // return new Response(JSON.stringify({ success: true, result }), { status: 200 });
//       console.log("result", result);
//       return true;
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// }
