"use client"
import { AppSidebar } from "@/components/app-sidebar"
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
import axios from "axios"
import { useEffect, useState } from "react"
import { ChartAreaInteractive } from "./chart/chart"
import { useSession } from "next-auth/react"

type OverView = {
  productcount: number;
  usercount: number;
  categorycount: number;
  totalprice: number;
}

export default function Page() {
  const { data: session, status } = useSession();
  const [dataOverView, setDataOverView] = useState<OverView | null>(null);

  useEffect(() => {
    if (session?.user?.atb) {
      const fetchDataOverView = async () => {
        try {
          const response = await axios.post('/api/getoverview', { store_id: session.user.atb });
          console.log("API response:", response.data);
          setDataOverView(response.data[0]);
        } catch (err) {
          console.error(err);
        }
      };

      fetchDataOverView();
    }
  }, [session]);


  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Please login</div>;
  if (session.user.role != 'admin') return <div>Access denied</div>;

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
                    สาขาที่ {session?.user.atb}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>แดชบอร์ด</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">จำนวนหมวดหมู่ทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView?.categorycount ?? 0}</div>
                <div className="text-2xl text-neutral-500">หมวด</div>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">จำนวนสินค้าทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView?.productcount ?? 0}</div>
                <div className="text-2xl text-neutral-500">รายการ</div>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">จำนวนพนักงานทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView?.usercount ?? 0}</div>
                <div className="text-2xl text-neutral-500">บัญชี</div>
              </div>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex flex-col items-center justify-center border">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">ยอดรวมทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataOverView?.totalprice ?? 0}</div>
                <div className="text-2xl text-neutral-500">บาท</div>
              </div>
            </div>
          </div>
          {/* <div>
            <ChartAreaInteractive />
          </div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
