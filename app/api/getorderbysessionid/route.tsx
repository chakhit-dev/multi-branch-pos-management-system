import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db'
import { RowDataPacket } from "mysql2";

interface Data extends RowDataPacket {
    orderid:number;
    storeid:number;
    tableid:number;
    sessionid:string;
    productid:number;
    quantity:number;
    price:number;
    img:string;
    status:string;
    time:string;
    product_name: string;
}

interface RequestBody {
    sessionid:string;
}

export async function POST(req:NextRequest) {
    const body:RequestBody = await req.json();

    try {

        const [response] = await pool.execute<Data[]>(`
            SELECT orderid, storeid, tableid, sessionid, o.productid, quantity, price, o.img, status, time,
                p.product_name
            FROM orderlist o
            JOIN product p ON o.productid = p.product_id
            WHERE sessionid = ?
        `, [body.sessionid])

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(error);
    }
}