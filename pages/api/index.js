// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { MongoClient } = require("mongodb");
import Cors from "cors";
// require("dotenv").config();
// console.log(process.env.DATABASE_URL);
const client = new MongoClient(
  "mongodb+srv://chirudeep:peppermint@cluster0.mdo5w.mongodb.net"
);
var database, coll;
const statecodes_obj = require("../../statecodes");
async function db_conn() {
  await client.connect();
  database = client.db("pincode-db");
  coll = database.collection("pincode-coll");
  console.log("done");
}
const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  await db_conn();
  var queryobj = {};
  if (req.query.stateid) {
    queryobj["StateName"] = statecodes_obj.statecodes[req.query.stateid];
  }
  if (req.query.District) {
    queryobj["District"] = req.query.District;
  }
  if (req.query.Pincode) {
    queryobj["Pincode"] = req.query.Pincode;
  }
  if (req.query.DivisionName) {
    queryobj["DivisionName"] = req.query.DivisionName;
  }
  console.log(queryobj);
  try {
    var result_cursor = await coll.find(queryobj);
    result_cursor = await result_cursor.toArray();
  } catch (err) {
    console.log("in errror", err);
  }
  if (!result_cursor.length) {
    res.json({ error: "no data found" });
  }
  res.json(result_cursor);
}
