import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface talbeData extends RowDataPacket {
    store_id:number;
    store_name:string;
    total_sales:number;
}

// interface RequestBody {
//     store_id: number;
// }

export async function GET() {

    // const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<talbeData[]>(
        `
            SELECT 
                s.store_id,
                s.store_name,
                SUM(ol.quantity * ol.price) AS total_sales
            FROM orderlist_log AS ol
            LEFT JOIN store AS s 
                ON s.store_id = CAST(ol.storeid AS UNSIGNED)
            GROUP BY s.store_id, s.store_name
            ORDER BY total_sales DESC;
        `, []);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}