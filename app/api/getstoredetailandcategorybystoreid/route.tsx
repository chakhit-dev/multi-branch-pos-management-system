import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface uaerData extends RowDataPacket {
    store_name: number;
    category_id:number;
    category_name:number;
}

interface RequestBody {
    store_id:number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<uaerData[]>(
        `
            SELECT store.store_name, category.category_id, category.category_name
            FROM store
            INNER JOIN category
            ON store.store_id = category.category_store
            WHERE store.store_id = ?
        `, [body.store_id]);

        console.log(results)

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}