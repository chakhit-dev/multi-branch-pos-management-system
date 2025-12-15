import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    sessionid:string;
}

interface Data extends RowDataPacket {
    storeid:number;
    tableid:number;
    sessionid:string;
    customer_id:number;
    status:string;
    updatetime:string;
}

export async function POST(req:NextRequest) {
    try {
        const body:RequestBody = await req.json();

        const [response] = await pool.execute<Data[]>(`
            SELECT store_id, table_id, session_id, customer_amount, status, update_time
            FROM tableslist
            WHERE session_id = ?
        `, [body.sessionid]);

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json(error)
    }
}