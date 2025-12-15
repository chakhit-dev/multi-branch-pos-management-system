import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface productData extends RowDataPacket {
    product_storeid: number;
    product_id:number;
    product_category:string;
    product_name:string;
    product_des:string;
    product_img:string;
    product_price:number;
}

export async function GET() {

    // const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<productData[]>(
        `
            SELECT product_storeid, product_id, product_category, product_name, product_des, product_img, product_price
            FROM product
        `, []);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}