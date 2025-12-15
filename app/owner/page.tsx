"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartBarInteractive } from "@/components/chart/ownerchart"
import TableRoundedCornerBranch from "@/components/table/TableBranchData"
import TableStoreSaleSummary from "@/components/table/TableStoreSaleSummary"
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
import { Icon } from "@iconify/react";
import axios from "axios"
import { useEffect, useState } from "react"

type TableData = {
  store_id: number;
  store_name: string;
  store_manager: number;
};

type OverView = {
    storecount:number;
    productcount:number;
    usercount:number;
    totalprice:number;
}

type StoreSaleSummary = {
    store_id:number;
    store_name:string;
    total_sales:number;
}

export default function Page() {

    // const [dataBranch, setdDataBranch] = useState<TableData[]>([]);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('/api/getbranch', {});

    //         // API ส่ง array มาโดยตรง
    //         if (Array.isArray(response.data)) {
    //             setdDataBranch(response.data);
    //         } else {
    //             console.error("Unexpected response format:", response.data);
    //             setdDataBranch([]); // fallback ป้องกัน error
    //         }

    //     } catch (err) {
    //         console.error(err);
    //         setdDataBranch([]); // fallback ตอน request fail
    //     }
    // };

    const [dataOverView, setDataOverView] = useState<OverView[]>([]);

    const fetchDataOverView = async () => {
        try {
            const response = await axios.get('/api/getoverview', {});

            // API ส่ง array มาโดยตรง
            if (Array.isArray(response.data)) {
                setDataOverView(response.data);
            } else {
                console.error("Unexpected response format:", response.data);
                setDataOverView([]); // fallback ป้องกัน error
            }

        } catch (err) {
            console.error(err);
            setDataOverView([]); // fallback ตอน request fail
        }
    };

    const [dataStoreSaleSummary, setDataStoreSaleSummary] = useState<StoreSaleSummary[]>([]);

    const fetchDataStoreSaleSummary = async () => {
        try {
            const response = await axios.get('/api/store-sales-summary', {});

            // API ส่ง array มาโดยตรง
            if (Array.isArray(response.data)) {
                setDataStoreSaleSummary(response.data);
            } else {
                console.error("Unexpected response format:", response.data);
                setDataStoreSaleSummary([]); // fallback ป้องกัน error
            }

        } catch (err) {
            console.error(err);
            setDataStoreSaleSummary([]); // fallback ตอน request fail
        }
    };


    useEffect(() => {
        // fetchData()
        fetchDataOverView()
        fetchDataStoreSaleSummary()
    },[])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
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
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">จำนวนสาขาทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView[0]?.storecount ?? 0}</div>
                <div className="text-2xl text-neutral-500">สาขา</div>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">จำนวนสินค้าทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView[0]?.productcount ?? 0}</div>
                <div className="text-2xl text-neutral-500">รายการ</div>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">จำนวนพนักงานทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView[0]?.usercount ?? 0}</div>
                <div className="text-2xl text-neutral-500">บัญชี</div>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">ยอดรวมของวันนี้</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView[0]?.totalprice ?? 0}</div>
                <div className="text-2xl text-neutral-500">บาท</div>
              </div>
            </div>
          </div>
          <div>
            {/* <ChartBarInteractive data={dataStoreSaleSummary} /> */}
          </div>
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          <div>
            <div className="mt-4 mb-4">
              <div className=" text-2xl">ยอดรวมในแต่ละสาขา</div>
            </div>
            <div>
              <TableStoreSaleSummary data={dataStoreSaleSummary ?? 'กำลังโหลดข้อมูล'} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
