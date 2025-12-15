"use client"
import { AppSidebar } from "@/components/app-sidebar"
import AddUser from "@/components/button/adduser"
import TableRoundedCornerUser from "@/components/table/TableUserData"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


type TableUserData = {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  atb: number;
  role: string;
};

export default function Users() {
    const { data: session, status } = useSession();
    const [dataUser, setdDataUser] = useState<TableUserData[]>([]);
    const useratb = session?.user.atb

    const fetchData = async () => {
        //if (!useratb) return; // ป้องกันส่ง undefined
        try {
            const response = await axios.post('/api/getuserbyatb', { atb: useratb });
            // const response = await axios.get('/api/getuser', {});

            // API ส่ง array มาโดยตรง
            if (Array.isArray(response.data)) {
                setdDataUser(response.data);
            } else {
                console.error("Unexpected response format:", response.data);
                console.log(response.data)
                setdDataUser([]); // fallback ป้องกัน error
            }

        } catch (err) {
            console.error(err);
            setdDataUser([]); // fallback ตอน request fail
        }
    };

useEffect(() => {
    if (status === "authenticated") {
        fetchData();
    }
}, [status, useratb]);


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
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl">
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div> */}

          <div className="w-full h-60 border flex justify-center items-center rounded-2xl bg-muted/50">
              <div className="flex flex-col items-center">
                <div className="text-2xl text-neutral-500">จำนวนผู้ใช้ทั้งหมด</div>
                <div className="text-7xl -my-4 font-semibold">{dataUser.length ?? 0}</div>
                <div className="text-2xl text-neutral-500">รายการ</div>
              </div>
          </div>
          
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <div className="flex items-center justify-end py-4 gap-2">
              <Input className="w-60 h-10" type="text" placeholder="ค้นหาสาขา" />
              <AddUser refreshData={fetchData} />
            </div>
            <TableRoundedCornerUser data={dataUser} refreshData={fetchData} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
