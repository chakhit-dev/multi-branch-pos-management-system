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
    store_name:string;
    store_manager:number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    console.log(body)

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        INSERT INTO store (store_id, store_name, store_manager)
        VALUES (?, ?, ?)
        `, [body.store_id, body.store_name, body.store_manager]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}