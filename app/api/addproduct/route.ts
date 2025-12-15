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
    product_id:number;
    product_category:string;
    product_name:string;
    product_des:string;
    product_img:string
    product_price:number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    console.log(body)

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        INSERT INTO product (product_storeid, product_category, product_name, product_des, product_img, product_price)
        VALUES (?, ?, ?, ?, ?, ?)
        `, [body.product_storeid, body.product_category, body.product_name, body.product_des, body.product_img, body.product_price]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}