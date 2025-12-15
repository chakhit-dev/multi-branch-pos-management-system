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
import { useSession } from "next-auth/react"

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


export default function AddUser({ refreshData }: TableProps) {
  const { data: session, status } = useSession();
  const [userAddData, setUserAddData] = useState<userData>({
    id: 0,
    username: '',
    password: '',
    name: '',
    email: '',
    atb: 0,
    role: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await axios.post('/api/adduser', {
      id: userAddData.id,
      username: userAddData.username,
      password: userAddData.password,
      name: userAddData.password,
      email: userAddData.email,
      atb: userAddData.atb,
      role: userAddData.role,
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
        <Button size="lg" className="text-lg">เพิ่มผู้ใช้</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>เพิ่มสาขาใหม่</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อเพิ่มผู้ใช้ ในระบบของคุณ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">หมายประจำตัว</Label>
              <Input id="name-1" name="name" placeholder="รหัสสาขา เช่น 1"
                onChange={(e) => setUserAddData({ ...userAddData, id: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ชื่อผู้ใช้</Label>
              <Input id="username-1" name="username" placeholder="ชื่อสาขา เช่น กรุงเทพ"
                onChange={(e) => setUserAddData({ ...userAddData, username: String(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">รหัสผ่าน</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setUserAddData({ ...userAddData, password: String(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ชื่อ</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setUserAddData({ ...userAddData, name: String(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">อีเมล</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setUserAddData({ ...userAddData, email: String(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ประจำสาขา</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setUserAddData({ ...userAddData, atb: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">บทบาท</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setUserAddData({ ...userAddData, role: String(e.target.value) })}
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
