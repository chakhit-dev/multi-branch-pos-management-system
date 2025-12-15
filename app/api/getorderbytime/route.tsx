import pool from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

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
    time:string;
    tableid:number;
    storeid:number;
}

export async function POST(req:NextRequest) {
    const body:RequestBody = await req.json();

    try {

        const [response] = await pool.execute<Data[]>(`
            SELECT o.orderid, o.storeid, o.tableid, o.sessionid, o.productid, o.quantity, o.price, o.img, o.status, o.time, p.product_name
            FROM orderlist o
            JOIN product p ON o.productid = p.product_id
            WHERE time = ? AND tableid = ? AND storeid = ?
        `, [body.time, body.tableid, body.storeid])

        return NextResponse.json(response);

    } catch (error) {
        return NextResponse.json(error)
    }
}