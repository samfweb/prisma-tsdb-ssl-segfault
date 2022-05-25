import { parse } from "pg-connection-string";
import { Pool } from "pg";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Attempting to get pg client connection");
    const config = parse(process.env.DATABASE_URL_PG);
    console.log(config);
    // Only use SSL if the connection string isn't local
    if (
      process.env.DATABASE_URL_PG !==
      "postgresql://postgres:password@tsdb:5432/postgres"
    ) {
      // @ts-ignore
      config.ssl = {
        rejectUnauthorized: true,
        ca: fs.readFileSync("./prisma/timescale-ca.crt").toString(),
      };
    }
    console.log("Got config: ", JSON.stringify(config, null, 2));
    const pool = new Pool(config);

    console.log("Awaiting client connection");
    const pgClient = await pool.connect();

    console.log("Querying for tables...");
    const tables = await pgClient.query(`
      SELECT *
      FROM pg_catalog.pg_tables
      WHERE schemaname != 'pg_catalog' AND 
          schemaname != 'information_schema';`);
    pgClient.release();
    console.log("Successfully executed query");
    res.status(200).json(tables?.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
