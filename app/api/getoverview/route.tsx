import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    store_id:number;
}

interface Data extends RowDataPacket {
    storecount:number;
    productcount:number;
    usercount:number;
    totalprice:number;
}

interface DataAdmin extends RowDataPacket {
    productcount:number;
    usercount:number;
    categorycount:number;
    totalprice:number;
}

export async function GET() {
    try {
        // const body:RequestBody = await req.json();

        const [response] = await pool.execute<Data[]>(`
            SELECT 
                (SELECT COUNT(*) FROM store) AS storecount,
                (SELECT COUNT(*) FROM product) AS productcount,
                (SELECT COUNT(*) FROM user) AS usercount,
                (SELECT SUM(price) FROM orderlist_log WHERE DATE(created_at) = CURDATE()) AS totalprice;
        `, []);

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const body: RequestBody = await req.json();

        const [response] = await pool.execute<DataAdmin[]>(
            `
            SELECT 
                (SELECT COUNT(*) 
                FROM product 
                WHERE product_storeid = ?) AS productcount,

                (SELECT COUNT(*) 
                FROM user 
                WHERE atb = ?) AS usercount,
                
                (SELECT COUNT(*) 
                FROM category 
                WHERE category_store = ?) AS categorycount,

                (SELECT IFNULL(SUM(price), 0)
                FROM orderlist_log 
                WHERE storeid = ?
                AND DATE(created_at) = CURDATE()) AS totalprice;

            `,
            [
                body.store_id,
                body.store_id,
                body.store_id,
                body.store_id
            ]
        );

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(error);
    }
}
