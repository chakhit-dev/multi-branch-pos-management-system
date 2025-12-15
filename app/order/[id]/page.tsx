"use client"

import Header from "@/app/sub_components/order/header";
import TableItem from "@/app/sub_components/order/table-item";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type TableData = {
  store_id: number;
  table_id: number;
  session_id: string;
  customer_amount: number;
  status: string;
  update_time: string;
};

type StoreDetail = {
  store_name: number;
  category_id:number;
  category_name:number;
}

export default function OrderPage() {
  const [itemList, setItemList] = useState<TableData[]>([]);
  const [storeDetail, setStoreDetail] = useState<StoreDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const pid = params.id;

  // useEffect(()=>{
  //   console.log(pid)
  // },[])

  // useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/gettableidbysession', { sessionid: pid });
        setItemList(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  // }, []);


    // const fetchDataStoreDetail = async () => {
    //   try {
    //     const response = await axios.post('/api/getstoredetailandcategorybystoreid', { store_id: itemList[0]?.store_id ?? null });
    //     setStoreDetail(response.data);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (itemList.length === 0) return;

    const fetchDataStoreDetail = async () => {
      try {
        const response = await axios.post('/api/getstoredetailandcategorybystoreid', {
          store_id: itemList[0].store_id
        });
        setStoreDetail(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDataStoreDetail();
  }, [itemList]);

  if (loading) {
    return <div>Loading...</div>;  // หรือ Spinner, Skeleton UI
  }

  if (itemList.length === 0) {
    return <div>ไม่พบข้อมูลโต๊ะ</div>;
  }

  return (
    <div className="h-dvh">
      <Header data={itemList} storedetail={storeDetail} />
      <TableItem data={itemList} />
    </div>
  );
}
