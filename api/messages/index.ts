import { NowRequest, NowResponse } from "@vercel/node";
import handleCors from "../../src/lib/cors";
import { allItemsByIndex, createItem } from "../../src/lib/fauna";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    if (handleCors(req, res)) return;

    const { method, body } = req;

    if (method === "GET") {
      const items = await allItemsByIndex("all_messages");

      if (!items)
        return res.status(500).json({ message: "Something went wrong" });

      return res.status(200).json({ items });
    }

    if (method === "POST") {
      const item = await createItem("messages", body);

      if (!item)
        return res.status(500).json({ message: "Something went wrong" });

      return res.status(200).json({ item });
    }

    res.status(405).json({ message: "Method not available" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
