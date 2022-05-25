// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prismaConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Hello API endpoint hit! woop.");
    console.log("Attempting to connect prisma client");
    await prisma.$connect();

    console.log("Attempting to fetch any data from Prisma");
    const query = prisma.user.findMany();

    console.log("Query:", query);
    const users = await query;

    console.log("Successfully executed query");
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
}
