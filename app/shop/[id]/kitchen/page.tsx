"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useParams } from 'next/navigation';
import { toast } from "sonner"
import Table from '../ui_dashboard/ui/table';
import CardKitchen from '@/app/sub_components/kitchen/CardKitchen';
import { AppSidebar } from '@/components/app-sidebar';

type TableData = {
  tableid: number;
  storeid: number;
  order_count: number;
  status: string;
  time: string;
};

export default function KitchenPage() {

  const [data, setData] = useState<TableData[] | null>(null);

  const params = useParams();
  const shopId = params.id;


  const fetchData = async () => {
    try {
      const response = await axios.post('/api/getallorderbytime', { storeid: shopId });

      // API ส่ง array มาโดยตรง
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        // console.error("Unexpected response format:", response.data);
        setData([]); // fallback ป้องกัน error
      }

    } catch (err) {
      console.error(err);
      setData([]); // fallback ตอน request fail
    }
  };



  // useEffect(() => {
  //   if (!shopId) return;
  //   fetchData();
  // }, [shopId]);

  // useEffect(() => {
  //   if (!shopId) return;

  //   fetchData(); // ดึงข้อมูลครั้งแรกทันที

  //   const interval = setInterval(() => {
  //     fetchData(); // เรียกซ้ำทุก 10 วินาที
  //     toast("รีโหลดข้อมูลอัตโนมัติ")
  //   }, 10000); // 10000 ms = 10 วินาที

  //   return () => clearInterval(interval); // cleanup ตอน component unmount
  // }, [shopId]);

  useEffect(() => {
    if (!shopId) return;

    let interval: NodeJS.Timeout | null = null;

    const startPolling = () => {
      fetchData();
      toast("รีโหลดข้อมูลอัตโนมัติ")
      interval = setInterval(fetchData, 10000);
    };

    const stopPolling = () => {
      if (interval) clearInterval(interval);
    };

    // เริ่ม polling ตอนแท็บ active
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") startPolling();
      else stopPolling();
    });

    startPolling();
    return stopPolling;
  }, [shopId]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">

            {/* {data.map((table) => (
              <Table key={table.table_id} data={table} refreshData={fetchData} />
            ))} */}

            {/* {data.map((cardData) => (
              <CardKitchen key={cardData.time} data={cardData} />
            ))} */}

            {/* Loading state */}
            {data === null && (
              <p className="text-center col-span-4 text-gray-500">กำลังโหลด...</p>
            )}

            {/* No data */}
            {data !== null && data.length === 0 && (
              <p className="text-center col-span-4 text-gray-500">ไม่มีออเดอร์</p>
            )}

            {/* Render data */}
            {data !== null && data.length > 0 &&
              data.map((cardData) => (
                <CardKitchen key={cardData.time} data={cardData} refreshData={fetchData}/>
              ))
            }

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
