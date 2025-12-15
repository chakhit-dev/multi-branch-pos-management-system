import pool from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';
import { ResultSetHeader } from 'mysql2';

interface RequestBody {
    store_id: number;
    tableId: number;
}

export async function POST(req: NextRequest) {

    const body : RequestBody = await req.json()

    const sessionId = ''
    const customerCount = 0

    try {
        const [result] = await pool.execute<ResultSetHeader>(
            `UPDATE tableslist 
        SET session_id = ?, customer_amount = ?, status = 'available', update_time = NOW()
        WHERE table_id = ? AND store_id = ?`,
            [sessionId, customerCount, body.tableId, body.store_id]
        );

        if(result.affectedRows > 0) {
            try {
                const [resultsDelete] = await pool.execute(
                `
                    DELETE FROM orderlist WHERE storeid = ? AND tableid = ?
                `, [body.store_id, body.tableId]);
            } catch (error) {
                return NextResponse.json(error)
            }
        }

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error)
    }    
}