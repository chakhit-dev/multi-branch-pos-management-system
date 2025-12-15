import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface statusData extends RowDataPacket {
    status_id: string;
    status_name:string;
}

export async function GET() {

    // const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<statusData[]>(
        `
            SELECT status_id, status_name
            FROM status
        `, []);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}