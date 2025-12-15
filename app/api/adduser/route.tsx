import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    atb: number;
    role: string;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    console.log(body)

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        INSERT INTO user (id, username, password, name, email, atb, role)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [body.id, body.username, body.password, body.name, body.email, body.atb, body.role]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}