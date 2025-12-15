import pool from '@/lib/db'; // import connection pool ของคุณ
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  storeid: number;
  tableid: number;
  productid: number;
  quantity: number;
  price: number;
  sessionid: string;
  img: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody[] = await req.json();

    // เช็คข้อมูลเบื้องต้น (optional)
    if (!Array.isArray(body) || body.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty request body' }, { status: 400 });
    }

    // สร้าง placeholders และ values สำหรับ batch insert
    const placeholders = body
      .map(() => `(?, ?, ?, ?, ?, ?, ?, 'กำลังเตรียมอาหาร', NOW())`)
      .join(', ');

    const values = body.flatMap((item) => [
      item.storeid,
      item.tableid,
      item.sessionid,
      item.productid,
      item.quantity,
      item.price,
      item.img,
    ]);

    // รัน query insert
    await pool.execute(
      `INSERT INTO orderlist (storeid, tableid, sessionid, productid, quantity, price, img, status, time) VALUES ${placeholders}`,
      values
    );

    return NextResponse.json({ message: 'Order inserted successfully', count: body.length });
  } catch (error) {
    console.error('Insert order error:', error);
    return NextResponse.json({ error: 'Failed to insert order', details: (error as Error).message }, { status: 500 });
  }
}
