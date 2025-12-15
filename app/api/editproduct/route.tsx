import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

// interface branchData extends RowDataPacket {
//     store_id: number;
//     store_name:string;
//     store_manager:string;
// }

interface RequestBody {
    product_storeid: number;
    product_id: number;
    product_category: string;
    product_name: string;
    product_des: string;
    product_img: string;
    product_price: number;
    product_old_id: number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        UPDATE product
        SET product_storeid = ?, product_id = ?, product_category = ?, product_name = ?, product_des = ?, product_img = ?, product_price = ?
        WHERE product_id = ?
        `, [body.product_storeid, body.product_id, body.product_category, body.product_name, body.product_des, body.product_img, body.product_price, body.product_old_id]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}