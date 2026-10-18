import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
export async function POST(req: Request) {
 try { const parsed=loginSchema.safeParse(await req.json()); if(!parsed.success)return NextResponse.json({error:"Enter a valid email and password."},{status:400});
 const user=await prisma.user.findUnique({where:{email:parsed.data.email}});
 if(!user||!(await bcrypt.compare(parsed.data.password,user.passwordHash)))return NextResponse.json({error:"Email or password is incorrect."},{status:401});
 await createSession(user.id); return NextResponse.json({user:{id:user.id,name:user.name,email:user.email}});
 } catch { return NextResponse.json({error:"Unable to log in right now."},{status:500}); }
}
