import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface uaerData extends RowDataPacket {
    category_id: string;
    category_name: string;
    category_store: number;
}

export async function GET() {

    // const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<uaerData[]>(
            `
            SELECT category_id, category_name
            FROM category
            GROUP BY category_id, category_name;

        `, []);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}