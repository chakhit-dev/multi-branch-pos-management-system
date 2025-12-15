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
import Table from "./ui_dashboard/ui/table"
import { useParams } from 'next/navigation';
import { toast } from "sonner"
import { AppSidebar } from '@/components/app-sidebar';

type TableData = {
  store_id: number;
  table_id: number;
  session_id: string;
  customer_amount: number;
  status: string;
  update_time: string;
};

export default function Page() {

  const [data, setData] = useState<TableData[]>([]);
  const params = useParams();
  const shopId = params.id;


  const fetchData = async () => {
    try {
      const response = await axios.post('/api/gettablebyid', { store_id: shopId });

      // API ส่ง array มาโดยตรง
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
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

            {/* <Table />
            <Table />
            <Table />
            <Table /> */}

            {data.map((table) => (
              <Table key={table.table_id} data={table} refreshData={fetchData} />
            ))}

          </div>
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
