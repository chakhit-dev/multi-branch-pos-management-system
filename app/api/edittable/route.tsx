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
    old_store_id : number;
    old_table_id : number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    console.log(body)

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        UPDATE tableslist
        SET store_id = ?, table_id = ?
        WHERE store_id = ? AND table_id = ?
        `, [body.store_id, body.table_id, body.old_store_id, body.old_table_id]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}