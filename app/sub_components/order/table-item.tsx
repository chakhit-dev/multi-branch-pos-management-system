"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Item from "./item";
import { useEffect, useState } from "react";
import axios from "axios";

type TableData = {
    store_id: number;
    table_id: number;
    session_id: string;
    customer_amount: number;
    status: string;
    update_time: string;
}

type TableProps = {
    data: TableData[];
};

type ProductData = {
    product_storeid: number;
    product_id: number;
    product_category: number; // id ของ category
    category_name: string;    // ชื่อ category สำหรับ UI
    product_name: string;
    product_des: string;
    product_img: string;
    product_price: string;
}

export default function TableItem({ data }: TableProps) {

    const [loading, setLoading] = useState(true);
    const [itemList, setItemList] = useState<ProductData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/getproductbystoreid', { storeid: data[0]?.store_id ?? 0 });
            setItemList(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (itemList.length === 0) {
        return <div>ไม่พบข้อมูลสินค้า</div>;
    }

    // สร้าง list ของ category_name แบบ unique
    const categories = Array.from(new Set(itemList.map(item => item.category_name)));
    categories.unshift('ทั้งหมด'); // เพิ่ม option แสดงทั้งหมด

    // กรอง itemList ตาม category_name ที่เลือก
    const filteredItems = selectedCategory === 'ทั้งหมด'
        ? itemList
        : itemList.filter(item => item.category_name === selectedCategory);

    return (
        <>
        {/* เมนู category */}
        <div className="flex justify-center items-center mt-4">
            <ScrollArea className="w-full whitespace-nowrap p-2 md:w-[68vh]">
                <div className="flex gap-2 text-xl md:text-2xl">
                    {categories.map(category => (
                        <div
                            key={category}
                            className={`border-b-4 px-4 cursor-pointer ${
                                selectedCategory === category ? 'border-blue-400 font-semibold' : 'border-transparent'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>

        {/* รายการสินค้า */}
        <ScrollArea className="h-[74vh] md:h-[82vh] rounded-md p-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {filteredItems.map((item) => (
                    <Item
                        key={item.product_id}
                        img={item.product_img}
                        pname={item.product_name}
                        pprice={parseFloat(item.product_price)}
                        pid={item.product_id}
                        storeid={item.product_storeid}
                        tableid={data[0]?.table_id ?? 0}
                    />
                ))}
            </div>
        </ScrollArea>
        </>
    );
}
