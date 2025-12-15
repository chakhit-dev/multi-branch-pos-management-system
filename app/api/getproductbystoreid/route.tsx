import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db'
import { RowDataPacket } from "mysql2";

interface Data extends RowDataPacket {
    product_storeid: number;
    product_id: number;
    product_category: string;
    category_name: string;
    product_name: string;
    product_des: string;
    product_img: string;
    product_price: number;
}

interface RequestBody {
    storeid: number;
}

export async function POST(req: NextRequest) {
    const body: RequestBody = await req.json();

    try {
        //         const [response] = await pool.execute<Data[]>(`
        //             SELECT DISTINCT p.product_id, p.product_storeid, p.product_category, c.category_name, 
        //        p.product_name, p.product_des, p.product_img, p.product_price
        // FROM product p
        // INNER JOIN category c ON p.product_category = c.category_id
        // WHERE p.product_storeid = ?;
        // `, [body.storeid])

        const [response] = await pool.execute<Data[]>(`
            SELECT 
                p.product_id, 
                p.product_storeid, 
                p.product_category, 
                c.category_name, 
                p.product_name, 
                p.product_des, 
                p.product_img, 
                p.product_price
            FROM product p
            INNER JOIN category c 
                ON p.product_category = c.category_id 
            AND p.product_storeid = c.category_store
            WHERE p.product_storeid = ?;

`, [body.storeid])

        return NextResponse.json(response);
    } catch (error) {
        console.log(error)
    }
}