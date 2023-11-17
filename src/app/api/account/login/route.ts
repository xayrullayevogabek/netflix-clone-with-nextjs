import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Account from "@/database/account";
import { compare } from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { pin, uid, accountId } = await req.json();

    const currentAccount = await Account.findOne({ _id: accountId, uid });

    if (!currentAccount) {
      return NextResponse.json({
        success: false,
        message: "Account is not found",
      });
    }

    const isMatch = await compare(pin, currentAccount.pin);

    if (isMatch) {
      return NextResponse.json({ success: true, accounts: currentAccount });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
