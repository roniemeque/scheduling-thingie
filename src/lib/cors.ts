import { NowRequest, NowResponse } from "@vercel/node";

const handleCors = (req: NowRequest, res: NowResponse): boolean => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).json("Ok");
    return true;
  }
  return false;
};

export default handleCors;
