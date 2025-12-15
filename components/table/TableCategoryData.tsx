import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { Icon } from '@iconify-icon/react';
import { useEffect, useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios';

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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type TableCategoryData = {
    category_id: string;
    category_name:string;
    category_store:number;
};

type TableBranchData = {
  store_id: number;
  store_name: string;
  store_manager: number;
};


type TableProps = {
    data: TableCategoryData[],
    refreshData: () => void
}

const TableRoundedCornerCategory = ({ data, refreshData }: TableProps) => {

    const [categoryUpdateData, setCategoryUpdateData] = useState<TableCategoryData>({
        category_id: '',
        category_name:'',
        category_store:0
    })

    // // state สำหรับ pagination
    // const [currentPage, setCurrentPage] = useState(1)
    // const itemsPerPage = 8

    // // คำนวณหน้าปัจจุบัน
    // const totalPages = Math.ceil(data.length / itemsPerPage)
    // const startIndex = (currentPage - 1) * itemsPerPage
    // const endIndex = startIndex + itemsPerPage
    // const currentData = data.slice(startIndex, endIndex)

    // // ฟังก์ชันเปลี่ยนหน้า
    // const handlePageChange = (page: number) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page)
    //     }
    // }

    const handleDelete = async (_category_id: string, _category_store: number) => {
        try {
            const res = await axios.post('/api/deletecategory', {
                category_id: _category_id,
                category_store: _category_store
            })
            refreshData();
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }

    const handleUpdate = async (_category_id:string, _category_name:string, _category_store:number, _category_id_old:string, _category_store_old:number) => {
        try {
            const res = await axios.post('/api/editcategory', {
                category_id: _category_id,
                category_name:_category_name,
                category_store:_category_store,
                category_id_old:_category_id_old,
                category_store_old:_category_store_old
            })
            refreshData();

            console.log(res)
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
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
        <div className='w-full'>
            <div className='[&>div]:max-h-105 [&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted sticky top-0 text-lg'>
                            <TableHead>สาขา</TableHead>
                            <TableHead className=''>หมวดหมู่</TableHead>
                            <TableHead>ชื่อหมวดหมู่</TableHead>
                            <TableHead className='text-right'>แอ็คชั่น</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-lg'>
                        {data.map((dataEach, index) => (
                            <TableRow key={index}>
                                <TableCell>{dataEach.category_store}</TableCell>
                                <TableCell>{dataEach.category_id}</TableCell>
                                <TableCell>{dataEach.category_name}</TableCell>

                                {/* <TableCell>{invoice.paymentMethod}</TableCell> */}
                                <TableCell className='flex justify-end'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                                                size="icon"
                                            >
                                                <Icon icon="qlementine-icons:menu-dots-16" />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-32">
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button className='w-full bg-amber-500/80' variant="default"
                                                            onClick={() => setCategoryUpdateData({
                                                                category_id: dataEach.category_id,
                                                                category_name: dataEach.category_name,
                                                                category_store: dataEach.category_store,
                                                            })}
                                                        >แก้ไข</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>แก้ไขหมวดหมู่ {dataEach.category_name} สาขา {dataEach.category_store}</DialogTitle>
                                                            <DialogDescription>
                                                                แก้ไขข้อมูลของสาขา.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="name-1">หมายเลขสาขา</Label>
                                                                <Select
                                                                    defaultValue={String(dataEach.category_store)}
                                                                    onValueChange={(value) =>
                                                                        setCategoryUpdateData({ ...categoryUpdateData, category_store: Number(value) })
                                                                    }
                                                                >
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="เลือกผู้จัดการสาขา" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>ผู้จัดการสาขา</SelectLabel>
                                                                            {branchData.map((branchs) => (
                                                                                <SelectItem key={branchs.store_id} value={String(branchs.store_id)}>{branchs.store_id} : {branchs.store_name}</SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ไอดีหมวดหมู่</Label>
                                                                <Input id="username-1" name="username" placeholder="ชื่อสาขา เช่น กรุงเทพ" defaultValue={dataEach.category_id}
                                                                    onChange={(e) => setCategoryUpdateData({ ...categoryUpdateData, category_id: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ชื่อหมวดหมู่</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.category_name}
                                                                    onChange={(e) => setCategoryUpdateData({ ...categoryUpdateData, category_name: String(e.target.value) })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button type="submit"
                                                                    onClick={() => handleUpdate(categoryUpdateData.category_id, categoryUpdateData.category_name, categoryUpdateData.category_store, dataEach.category_id, dataEach.category_store)}>
                                                                    Save changes</Button>
                                                            </DialogClose>

                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>
                                            <DropdownMenuSeparator />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button className='w-full' variant="destructive">ลบ</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>คุณแน่ใจใช่ไหมว่าจะลบ สาขาที่ {dataEach.category_name}?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            หากลบแล้วจะไม่สามารถนำกลับมาได้อีก.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(dataEach.category_id, dataEach.category_store)}>ยืนยัน</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow className='text-lg'>
                            <TableCell colSpan={3}>จำนวนสาขาทั้งหมด</TableCell>
                            <TableCell className='text-right'>{currentData.length}</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>
            {/* <Pagination className='mt-4'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => handlePageChange(currentPage - 1)}
                        />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination> */}

            <p className='text-muted-foreground mt-4 text-center text-lg'>
                หมวดหมู่ทั้งหมด {data.length}
            </p>
        </div>
    )
}

export default TableRoundedCornerCategory
