import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db';
import QRCode from 'qrcode';

interface RequestBody {
    store_id : number;
    tableId: number;
    customerCount: number;
}

export async function POST(req: Request) {
    const body:RequestBody = await req.json();
    const sessionId = uuidv4();

    try {
        await pool.execute(
            `UPDATE tableslist 
        SET session_id = ?, customer_amount = ?, status = 'occupied', update_time = NOW()
        WHERE table_id = ? AND store_id = ?`,
            [sessionId, body.customerCount, body.tableId, body.store_id]
        );

        const orderUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/${sessionId}`;
        const qrCode = await QRCode.toDataURL(orderUrl);

        return NextResponse.json({
            success: true,
            sessionId,
            qrCode,
        });
    } catch (error) {
        return NextResponse.json(error)
    }
}
