import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { issues } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, parseInt(id)),
    })
    return NextResponse.json({ data: { issue } })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'not here' }, { status: 404 })
  }
}
