import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

// interface branchData extends RowDataPacket {
//     store_id: number;
//     store_name:string;
//     store_manager:string;
// }

interface RequestBody {
    store_id: number;
    table_id:number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    console.log(body)

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        INSERT INTO tableslist (store_id, table_id, customer_amount ,update_time)
        VALUES (?, ?, ?, NOW())
        `, [body.store_id, body.table_id, 0]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}