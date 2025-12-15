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

interface RequestBody {
    atb:number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

        if (body.atb === undefined) {
        return NextResponse.json({ error: "Missing 'atb' in request body" }, { status: 400 });
    }

    try {
        const [results] = await pool.execute<uaerData[]>(
        `
            SELECT *
            FROM user
            WHERE atb = ?
        `, [body.atb]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}