import pool from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    try {
        const form = await req.formData();

        const product_storeid = Number(form.get("product_storeid"));
        const product_id = Number(form.get("product_id"));
        const product_category = String(form.get("product_category"));
        const product_name = String(form.get("product_name"));
        const product_des = String(form.get("product_des"));
        const product_price = Number(form.get("product_price"));

        // --- ดึงไฟล์ ---
        const file = form.get("file") as File | null;

        let imageUrl = "";

        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadDir = path.join(process.cwd(), "public", "items");
            fs.mkdirSync(uploadDir, { recursive: true });

            const filename = `${file.name}`;
            const filepath = path.join(uploadDir, filename);

            // เซฟไฟล์ลง /public/items/
            fs.writeFileSync(filepath, buffer);

            // ตัดนามสกุล (.png .jpg .jpeg .webp ฯลฯ) ออก
            const filenameWithoutExt = filename.replace(/\.[^/.]+$/, "");

            // URL ที่จะเก็บในฐานข้อมูล
            imageUrl = filenameWithoutExt;
        }

        // --- บันทึกลง MySQL ---
        const [results] = await pool.execute(
            `
            INSERT INTO product 
            (product_storeid, product_category, product_name, product_des, product_img, product_price)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                product_storeid,
                product_category,
                product_name,
                product_des,
                imageUrl,  // <-- เก็บ URL ของรูปภาพ
                product_price
            ]
        );

        return NextResponse.json({ message: "Success", imageUrl, results });
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
