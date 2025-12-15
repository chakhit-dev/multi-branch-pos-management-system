import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface uaerData extends RowDataPacket {
    id: number;
    username:string;
    password:string;
    name:string;
    email:string;
    atb:number;
    role:string;
}

export async function GET() {

    // const body: RequestBody = await req.json();

    try {
        const [results] = await pool.execute<uaerData[]>(
        `
            SELECT *
            FROM user WHERE role = "admin"
        `, []);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}