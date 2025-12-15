"use client"

import { Button } from "@/components/ui/button";
import SubMenu from "./sub-menu";
import { Badge } from "@/components/ui/badge";
import { BiFile } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import Bucket from "./bucket";
import HistoryPage from "@/app/history/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

type TableData = {
  store_id: number;
  table_id: number;
  session_id: string;
  customer_amount: number;
  status: string;
  update_time: string;
}

type OrderHistoryData = {
    orderid: number;
    storeid: number;
    tableid: number;
    sessionid: string;
    productid: number;
    quantity: number;
    price: number;
    img: string;
    status: string;
    time: string;
    product_name: string;
}

type StoreDetail = {
  store_name: number;
  category_id:number;
  category_name:number;
}


type TableProps = {
  data: TableData[];
  storedetail: StoreDetail[];
};

export default function Header({ data, storedetail }: TableProps) {

    const [historyData, setHistoryData] = useState<OrderHistoryData[]>([]);
    const [loading, setLoading] = useState(true);
    
    const params = useParams();
    const pid = params.id;

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/getorderbysessionid', {
                sessionid: pid,
            });
            setHistoryData(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // โหลดข้อมูลครั้งแรก
    }, []);

  return (
    // <div className="relative">
    //     {/* <div className="aspect-video flex justify-center items-center border-2">
    //         <div className="font-semibold text-2xl">รูปภาพ</div>
    //     </div>
    //     <div className="w-18 h-18 rounded-full border-2 flex items-center justify-center absolute left-[50%] translate-[-50%]">
    //         โลโก้
    //     </div> */}
    //     <div className="flex justify-center flex-col items-center pt-4 text-2xl font-semibold">
    //         <div className="">
    //             ร้านอาหารญี่ปุ่น สาขากรุงเทพ
    //         </div>
    //         <div className="text-neutral-950/60">
    //             รายการอาหาร
    //         </div>
    //     </div>
    // </div>

    // <div className="flex flex-col justify-center items-center py-6 border-2">
    //     <div className="w-18 h-18 rounded-full border-2 flex items-center justify-center">
    //         โลโก้
    //     </div>
    //     <div className="flex justify-center flex-col items-center pt-2 text-2xl font-semibold">
    //         <div className="">
    //             ร้านอาหารญี่ปุ่น สาขากรุงเทพ
    //         </div>
    //     </div>
    // </div>

    <div className="pt-4">

      <Bucket data={data} onOrderComplete={fetchData} />

      <div className="absolute w-full flex justify-between items-center px-4">

        <div className="border-2 rounded-lg flex justify-center items-center bg-muted text-lg p-1 px-3">
          Table : {data[0]?.table_id ?? "N/A"}
        </div>

        <div className="flex gap-2">
          <HistoryPage data={historyData} />
          {/* <div className="border-2 rounded-lg flex justify-center items-center bg-muted text-lg p-2">
            <BiFile />
          </div> */}
        </div>

      </div>

      <div className="flex flex-col justify-center items-center mt-4">
        {/* <div className="w-18 h-18 rounded-full border-2 flex items-center justify-center">
          โลโก้
        </div> */}
        <div className="flex justify-center flex-col items-center pt-2">
          <div className="flex flex-col items-center mt-4">
            <div className="text-5xl font-extrabold">RSU POS</div>
            <div className="text-3xl text-neutral-800 font-">{storedetail[0]?.store_name ?? 'กำลังโหลด'}</div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center items-center mt-4">
        <SubMenu />
      </div> */}


    </div>

  )
}