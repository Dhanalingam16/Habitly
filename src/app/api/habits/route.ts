import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { habitSchema } from "@/lib/validation";
export async function GET(){const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:"Unauthorized"},{status:401});const habits=await prisma.habit.findMany({where:{userId},orderBy:{createdAt:"asc"},include:{checkIns:{select:{date:true,completed:true}}}});return NextResponse.json({habits});}
export async function POST(req:Request){const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:"Unauthorized"},{status:401});const parsed=habitSchema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:"Please provide a valid habit."},{status:400});const habit=await prisma.habit.create({data:{...parsed.data,userId},include:{checkIns:true}});return NextResponse.json({habit},{status:201});}
