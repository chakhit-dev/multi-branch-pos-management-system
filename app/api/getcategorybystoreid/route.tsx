import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface uaerData extends RowDataPacket {
    category_id: string;
    category_name:string;
    category_store:number;
}

interface RequestBody {
    store_id:number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<uaerData[]>(
        `
            SELECT *
            FROM category
            WHERE category_store = ?
        `, [body.store_id]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}