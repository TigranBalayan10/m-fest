import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { login, password } = await req.json();

  const user = await prisma.adminUser.findUnique({
    where: { login },
  });

  if (user && user.password === password) {
    // Successful authentication
    return NextResponse.json(
      { message: "Authentication successful" },
      { status: 200 }
    );
  } else {
    // Authentication failed
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
