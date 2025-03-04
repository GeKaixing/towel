import { USERS } from "@/models/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: any) => {
  try {
    const { id } = await params;
    console.log(id)
    const data = await USERS.findOne({ _id: id }, { password: 0 });
    console.log(data)
    return NextResponse.json(data, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
