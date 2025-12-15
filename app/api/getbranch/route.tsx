import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface branchData extends RowDataPacket {
    store_id: number;
    store_name:string;
    shop_manager:string;
}

export async function GET() {

    // const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<branchData[]>(
        `
            SELECT store_id, store_name, store_manager
            FROM store
        `, []);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}