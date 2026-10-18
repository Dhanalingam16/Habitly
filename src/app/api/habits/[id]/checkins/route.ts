import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
type Ctx={params:Promise<{id:string}>};const schema=z.object({date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),completed:z.boolean()});
export async function PUT(req:Request,ctx:Ctx){const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:"Unauthorized"},{status:401});const {id}=await ctx.params;const parsed=schema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:"Invalid check-in."},{status:400});const habit=await prisma.habit.findFirst({where:{id,userId}});if(!habit)return NextResponse.json({error:"Habit not found."},{status:404});const {date,completed}=parsed.data;const checkIn=await prisma.habitCheckIn.upsert({where:{habitId_date:{habitId:id,date}},create:{habitId:id,date,completed},update:{completed}});return NextResponse.json({checkIn});}
