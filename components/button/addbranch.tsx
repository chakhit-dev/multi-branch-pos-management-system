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

interface branchAddData {
  store_id: number;
  store_name: string;
  store_manager: number;
}

interface userData {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  atb: number;
  role: string;
};

type TableProps = {
  refreshData: () => void
}


export default function AddBranch({ refreshData }: TableProps) {

  const [branchAddData, setBranchAddData] = useState<branchAddData>({
    store_id: 0,
    store_name: '',
    store_manager: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await axios.post('/api/addbranch', {
      store_id: Number(branchAddData.store_id),
      store_name: branchAddData.store_name,
      store_manager: Number(branchAddData.store_manager),
    })

    refreshData();
    console.log("✅ Add branch success:", res.data)
  }

  const [userData, setUserData] = useState<userData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/getadmin', {});

      // API ส่ง array มาโดยตรง
      if (Array.isArray(response.data)) {
        setUserData(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setUserData([]); // fallback ป้องกัน error
      }

    } catch (err) {
      console.error(err);
      setUserData([]); // fallback ตอน request fail
    }
  };

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg">เพิ่มสาขา</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>เพิ่มสาขาใหม่</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อเพิ่มสาขาใหม่ ในระบบของคุณ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">หมายเลขสาขา</Label>
              <Input id="store_id" name="name" defaultValue="" placeholder="รหัสสาขา เช่น 00001"
                onChange={(e) => setBranchAddData({ ...branchAddData, store_id: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ชื่อสาขา</Label>
              <Input id="store_name" name="username" defaultValue="" placeholder="ชื่อสาขา เช่น กรุงเทพ"
                onChange={(e) => setBranchAddData({ ...branchAddData, store_name: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ผู้จัดการสาขา</Label>
              <Select
                onValueChange={(value) =>
                  setBranchAddData({ ...branchAddData, store_manager: Number(value) })
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
