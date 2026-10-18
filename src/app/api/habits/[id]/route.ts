import { NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { habitSchema } from "@/lib/validation";
type Ctx={params:Promise<{id:string}>};
export async function PATCH(req:Request,ctx:Ctx){const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:"Unauthorized"},{status:401});const {id}=await ctx.params;const parsed=habitSchema.partial().safeParse(await req.json());if(!parsed.success||!Object.keys(parsed.data).length)return NextResponse.json({error:"Invalid update."},{status:400});const exists=await prisma.habit.findFirst({where:{id,userId}});if(!exists)return NextResponse.json({error:"Habit not found."},{status:404});const habit=await prisma.habit.update({where:{id},data:parsed.data,include:{checkIns:true}});return NextResponse.json({habit});}
export async function DELETE(_req:Request,ctx:Ctx){const userId=await getSessionUserId();if(!userId)return NextResponse.json({error:"Unauthorized"},{status:401});const {id}=await ctx.params;const exists=await prisma.habit.findFirst({where:{id,userId}});if(!exists)return NextResponse.json({error:"Habit not found."},{status:404});await prisma.habit.delete({where:{id}});return NextResponse.json({ok:true});}
