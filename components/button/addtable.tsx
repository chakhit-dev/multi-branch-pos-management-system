'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"
import { ReactFormState } from "react-dom/client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface tableAddData {
    store_id: number;
    table_id:number;
    session_id:string;
    customer_amount:number;
    status:string;
    update_time:string;
}

interface branchAddData {
  store_id: number;
  store_name: string;
  store_manager: number;
}

// type TableTableData = {
//     store_id: number;
//     table_id:number;
//     session_id:string;
//     customer_amount:number;
//     status:string;
//     update_time:string;
// };

type TableProps = {
  refreshData: () => void
}


export default function AddTable({ refreshData }: TableProps) {

  const [tableAddData, setTableAddData] = useState<tableAddData>({
    store_id: 0,
    table_id: 0,
    session_id: '',
    customer_amount:0,
    status: '',
    update_time: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await axios.post('/api/addtable', {
      store_id: Number(tableAddData.store_id),
      table_id: Number(tableAddData.table_id),
    })

    refreshData();
    console.log("✅ Add branch success:", res.data)
  }

  const [branchData, setBranchData] = useState<branchAddData[]>([]);

  const fetchBranchData = async () => {
    try {
      const response = await axios.get('/api/getbranch', {});

      // API ส่ง array มาโดยตรง
      if (Array.isArray(response.data)) {
        setBranchData(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setBranchData([]); // fallback ป้องกัน error
      }

    } catch (err) {
      console.error(err);
      setBranchData([]); // fallback ตอน request fail
    }
  };

  useEffect(() => {
    fetchBranchData()
  }, [])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg">เพิ่มโต๊ะใหม่</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>เพิ่มโต๊ะใหม่</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อเพิ่มโต๊ะใหม่ ในระบบของคุณ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">หมายเลขสาขา</Label>
              <Select
                onValueChange={(value) =>
                  setTableAddData({ ...tableAddData, store_id: Number(value) })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกหมายเลขสาขา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>รายการ - สาขา</SelectLabel>
                    {branchData.map((branchs) => (
                      <SelectItem key={branchs.store_id} value={String(branchs.store_id)}>{branchs.store_id}:{branchs.store_name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">หมายเลขโต๊ะ</Label>
              <Input id="store_name" name="username" defaultValue="" placeholder="ชื่อสาขา เช่น 1"
                onChange={(e) => setTableAddData({ ...tableAddData, table_id: Number(e.target.value) })}
              />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="username-1">ผู้จัดการสาขา</Label>
              <Select
                onValueChange={(value) =>
                  setTableAddData({ ...tableAddData, store_manager: Number(value) })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกผู้จัดการสาขา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>ผู้จัดการสาขา</SelectLabel>
                    {userData.map((users) => (
                      <SelectItem key={users.id} value={String(users.id)}>{users.id}:{users.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">ยกเลิก</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">ยืนยัน</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>

    </Dialog>
  )
}
