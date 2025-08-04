import { db } from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { issues } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'

export const GET = async (req: NextRequest) => {
  try {
    const issues = await db.query.issues.findMany()
    return NextResponse.json({ data: { issues } })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Nah' }, { status: 500 })
  }
}

export const POST = async (req: NextResponse) => {
  try {
    const [newIssue] = await db
      .insert(issues)
      .values(await req.json())
      .returning()

    return NextResponse.json({ data: { newIssue } })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Nah' }, { status: 500 })
  }
}
