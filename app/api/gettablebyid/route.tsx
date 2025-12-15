import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface talbeData extends RowDataPacket {
    store_id: number;
    table_id:number;
    session_id:string;
    customer_amount:number;
    status:string;
    update_time:string;
}

interface RequestBody {
    store_id: number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<talbeData[]>(
        `
            SELECT store_id, table_id, session_id, customer_amount, status, update_time
            FROM tableslist WHERE store_id = ?
        `, [body.store_id]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}