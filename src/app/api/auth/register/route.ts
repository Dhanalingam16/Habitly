import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";
export async function POST(req: Request) {
 try {
  const parsed = registerSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({error:"Enter a valid name, email, and password of at least 8 characters."},{status:400});
  const {name,email,password}=parsed.data;
  if (await prisma.user.findUnique({where:{email}})) return NextResponse.json({error:"An account with this email already exists."},{status:409});
  const user=await prisma.user.create({data:{name,email,passwordHash:await bcrypt.hash(password,12)},select:{id:true,name:true,email:true}});
  await createSession(user.id); return NextResponse.json({user},{status:201});
 } catch { return NextResponse.json({error:"Could not create account. Check database configuration."},{status:500}); }
}
