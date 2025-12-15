import { NextResponse, NextRequest } from "next/server";
import pool from '@/lib/db';
import mysql, {
    RowDataPacket,
  } from 'mysql2/promise';

export async function POST(req:NextRequest) {
    
    interface User extends RowDataPacket {
        id:number,
        username:string,
        password:string,
        name:string,
        email:string,
        atb:number,
        role:string
    }

    try {
        const { username, password } = await req.json();

        const [rows, fields] = await pool.query<User[]>(
            `SELECT * FROM user WHERE username = ?`,
            [username]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" });
        }

        const user = rows[0];

        if(user.password != password){
            return NextResponse.json({ message: 'รหัสผ่านไม่ตรงกัน'})
        }

        return NextResponse.json(user);

    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}