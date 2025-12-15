import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

// interface branchData extends RowDataPacket {
//     store_id: number;
//     store_name:string;
//     store_manager:string;
// }

interface RequestBody {
    category_id: string;
    category_name:string;
    category_store:number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    console.log(body)

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        INSERT INTO category (category_id, category_name, category_store)
        VALUES (?, ?, ?)
        `, [body.category_id, body.category_name, body.category_store]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}