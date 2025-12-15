import pool from "@/lib/db";
import { RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";

interface Data extends RowDataPacket {
    tableid:number;
    storeid:number;
    order_count:number;
    time:string;
}

interface RequestBody {
    storeid:number;
}

export async function POST(req:NextRequest) {
    const body:RequestBody = await req.json();

    try {

        // const [response] = await pool.execute<Data[]>(`
        //     SELECT tableid,
        //         storeid,
        //         COUNT(*) as order_count,
        //         time
        //     FROM orderlist
        //     WHERE storeid = ?
        //     GROUP BY time
        //     ORDER BY time ASC;
        // `, [body.storeid])

        const [response] = await pool.execute<Data[]>(`
            SELECT tableid,
                storeid,
                COUNT(*) as order_count,
                status,
                time
            FROM orderlist
            WHERE storeid = ? AND status = ?
            GROUP BY time
            ORDER BY time ASC;
        `, [body.storeid, 'กำลังเตรียมอาหาร'])

        return NextResponse.json(response);

    } catch (error) {
        return NextResponse.json(error)
    }
}