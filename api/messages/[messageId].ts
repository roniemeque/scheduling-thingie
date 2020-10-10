import { NowRequest, NowResponse } from "@vercel/node";
import {
  getItemById,
  deleteById,
  replaceById,
  updateById,
} from "../../src/lib/fauna";

export default async (
  { method, query, body }: NowRequest,
  res: NowResponse
) => {
  const { messageId } = query;

  if (method === "GET") {
    const item = await getItemById("messages", messageId as string);

    if (!item) return res.status(500).json({ message: "Something went wrong" });

    return res.status(200).json({ item });
  }

  if (method === "DELETE") {
    const item = await deleteById("messages", messageId as string);

    if (!item) return res.status(500).json({ message: "Something went wrong" });

    return res.status(200).json({ item });
  }

  if (method === "PUT") {
    const item = await replaceById("messages", messageId as string, body);

    if (!item) return res.status(500).json({ message: "Something went wrong" });

    return res.status(200).json({ item });
  }

  if (method === "PATCH") {
    const item = await updateById("messages", messageId as string, body);

    if (!item) return res.status(500).json({ message: "Something went wrong" });

    return res.status(200).json({ item });
  }

  res.status(405).json({ message: "Method not available" });
};
