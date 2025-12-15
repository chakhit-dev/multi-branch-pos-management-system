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

interface userData {
  product_storeid: number;
  product_id: number;
  product_category: string;
  product_name: string;
  product_des: string;
  product_img: string;
  product_price: number;
};

type TableProps = {
  refreshData: () => void
}

type TableCategoryData = {
  category_id: string;
  category_name: string;
  category_store: number;
};

type TableBranchData = {
  store_id: number;
  store_name: string;
  store_manager: number;
};


export default function AddProduct({ refreshData }: TableProps) {

  const [productAddData, setProductAddData] = useState<userData>({
    product_storeid: 0,
    product_id: 0,
    product_category: '',
    product_name: '',
    product_des: '',
    product_img: '',
    product_price: 0
  })

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   const res = await axios.post('/api/addproduct', {
  //     product_storeid: productAddData.product_storeid,
  //     product_id: productAddData.product_id,
  //     product_category: productAddData.product_category,
  //     product_name: productAddData.product_name,
  //     product_des: productAddData.product_des,
  //     product_img: productAddData.product_img,
  //     product_price: productAddData.product_price,
  //   })

  //   refreshData();
  //   console.log("✅ Add branch success:", res.data)
  // }

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_storeid", String(productAddData.product_storeid));
    formData.append("product_id", String(productAddData.product_id));
    formData.append("product_category", productAddData.product_category);
    formData.append("product_name", productAddData.product_name);
    formData.append("product_des", productAddData.product_des);
    formData.append("product_price", String(productAddData.product_price));

    if (imageFile) {
      formData.append("file", imageFile);
    }

    const res = await axios.post("/api/appproductwithfile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    refreshData();
    console.log("✅ Add product success:", res.data);
  };



  const [categoryData, setCategoryData] = useState<TableCategoryData[]>([]);

  const fetchCategoryData = async (_store_id: number) => {
    try {
      const response = await axios.post('/api/getcategorybystoreid', {
        store_id: _store_id,
      });

      // API ส่ง array มาโดยตรง
      if (Array.isArray(response.data)) {
        setCategoryData(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setCategoryData([]); // fallback ป้องกัน error
      }

    } catch (err) {
      console.error(err);
      setCategoryData([]); // fallback ตอน request fail
    }
  };

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
        <Button size="lg" className="text-lg">เพิ่มสินค้า</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>เพิ่มสินค้าใหม่</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อเพิ่มสินค้าใหม่ ในระบบของคุณ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">หมายเลขสาขา</Label>
              <Select
                onValueChange={(value) => {
                  const storeId = Number(value);

                  // อัปเดต state
                  setProductAddData((prev) => ({
                    ...prev,
                    product_storeid: storeId,
                    product_category: "", // รีเซต category เมื่อเปลี่ยนสาขา
                  }));

                  // โหลดข้อมูลประเภทสินค้าของสาขานั้น
                  fetchCategoryData(storeId);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกหมายเลขสาขา" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>รายการ - หมายเลขสาขา</SelectLabel>
                    {branchData.map((branchs) => (
                      <SelectItem
                        key={branchs.store_id}
                        value={String(branchs.store_id)}
                      >
                        สาขาที่ {branchs.store_id} : {branchs.store_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* <Input id="name-1" name="name" placeholder="รหัสสาขา เช่น 1"
                onChange={(e) => setProductAddData({ ...productAddData, product_storeid: Number(e.target.value) })}
              /> */}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">หมายสินค้า</Label>
              <Input id="username-1" name="username" placeholder="ชื่อสาขา เช่น กรุงเทพ"
                onChange={(e) => setProductAddData({ ...productAddData, product_id: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ประเภทสินค้า</Label>
              <Select disabled={productAddData.product_storeid === 0}
                onValueChange={(value) =>
                  setProductAddData({ ...productAddData, product_category: String(value) })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="เลือกประเภทสินค้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>รายการ - ประเภทสินค้า</SelectLabel>
                    {categoryData.map((categorys, index) => (
                      <SelectItem key={index} value={String(categorys.category_id)}>{categorys.category_name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ชื่อสินค้า</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setProductAddData({ ...productAddData, product_name: String(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">คำอธิบายสินค้า</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setProductAddData({ ...productAddData, product_des: String(e.target.value) })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ภาพสินค้า</Label>
              {/* <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setProductAddData({ ...productAddData, product_img: String(e.target.value) })}
              /> */}
              {/* <Input id="picture" type="file" /> */}
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">ราคาสินค้า</Label>
              <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา"
                onChange={(e) => setProductAddData({ ...productAddData, product_price: Number(e.target.value) })}
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
