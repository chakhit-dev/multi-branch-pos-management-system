import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  session: string;
}

export async function POST(req: NextRequest) {
    const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute(
        `
            UPDATE tableslist
            SET status = ?, update_time = NOW()
            WHERE session_id = ?

        `, ['waiting_for_bill', body.session]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error);
    }

}