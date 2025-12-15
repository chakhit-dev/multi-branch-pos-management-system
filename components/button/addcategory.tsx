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

interface categoryAddData {
  category_id: string;
  category_name: string;
  category_store: number;
}

type TableBranchData = {
  store_id: number;
  store_name: string;
  store_manager: number;
};

type TableProps = {
  refreshData: () => void
}


export default function AddCategory({ refreshData }: TableProps) {

  const [categoryAddData, setCategoryAddData] = useState<categoryAddData>({
    category_id: '',
    category_name: '',
    category_store: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await axios.post('/api/addcategory', {
      category_id: categoryAddData.category_id,
      category_name: categoryAddData.category_name,
      category_store: categoryAddData.category_store
    })

    refreshData();
    console.log("✅ Add branch success:", res.data)
  }

  const [branchData, setBranchData] = useState<TableBranchData[]>([]);

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
        <Button size="lg" className="text-lg">เพิ่มประเภทสินค้า</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>เพิ่มประเภทสินค้า</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อเพิ่มประเภทสินค้า ในระบบของคุณ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">หมายเลขสาขา</Label>
              <Select
                onValueChange={(value) =>
                  setCategoryAddData({ ...categoryAddData, category_store: Number(value) })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกผู้จัดการสาขา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>สาขา</SelectLabel>
                    {branchData.map((branchs) => (
                      <SelectItem key={branchs.store_id} value={String(branchs.store_id)}>{branchs.store_id} : {branchs.store_name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ไอดีหมวดหมู่</Label>
              <Input id="store_name" name="username" defaultValue="" placeholder="ชื่อสาขา เช่น กรุงเทพ"
                onChange={(e) => setCategoryAddData({ ...categoryAddData, category_id: String(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ชื่อหมวดหมู่</Label>
              <Input id="store_id" name="name" defaultValue="" placeholder="รหัสสาขา เช่น 00001"
                onChange={(e) => setCategoryAddData({ ...categoryAddData, category_name: String(e.target.value) })}
              />
            </div>
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
