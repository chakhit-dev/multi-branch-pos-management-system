import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db'
import { RowDataPacket } from "mysql2";

interface Data extends RowDataPacket {
    product_storeid:number;
    product_id:number;
    product_category:string;
    product_name:string;
    product_des:string;
    product_img:string;
    product_price:number;
}

interface RequestBody {
    storeid : number;
}

export async function POST(req:NextRequest) {
    const body : RequestBody = await req.json();

    try {
        const [response] = await pool.execute<Data[]>(`
            SELECT product_storeid, product_id, product_category,
                    product_name, product_des, product_img, product_price
            FROM product
            WHERE product_storeid = ?`, [body.storeid])
        
        return NextResponse.json(response);
    } catch (error) {
        console.log(error)
    }
}