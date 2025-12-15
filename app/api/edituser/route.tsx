import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

// interface branchData extends RowDataPacket {
//     store_id: number;
//     store_name:string;
//     store_manager:string;
// }

interface RequestBody {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    atb: number;
    role: string;
    old_id: number;
}

export async function POST(req:NextRequest) {

    const body: RequestBody = await req.json();

    try {
        // const [results] = await pool.execute<branchData[]>(
        const [results] = await pool.execute(
        `
        UPDATE user
        SET id = ?, username = ?, password = ?, name = ?, email = ?, atb = ?, role = ?
        WHERE id = ?
        `, [body.id, body.username, body.password, body.name, body.email, body.atb, body.role, body.old_id]);

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(error)
    }
}