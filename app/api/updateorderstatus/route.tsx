import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface Order {
  orderid: number;
}

export async function POST(req: NextRequest) {
  const body: Order[] = await req.json();

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const order of body) {
      await connection.execute(
        `UPDATE orderlist SET status = ? WHERE orderid = ?`,
        ['ส่งอาหารแล้ว', order.orderid]
      );
    }

    await connection.commit();
    connection.release();

    return NextResponse.json({ message: 'Orders updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update orders', error: (error as Error).message },
      { status: 500 }
    );
  }
}
