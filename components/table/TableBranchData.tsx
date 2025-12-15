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

type TableBranchData = {
    store_id: number;
    store_name: string;
    store_manager: number;
};

type TableProps = {
    data: TableBranchData[],
}

const TableRoundedCornerBranch = ({ data }: TableProps) => {

    const [branchUpdateData, setBranchUpdateData] = useState<TableBranchData>({
        store_id: 0,
        store_name: '',
        store_manager: 0,
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

    const handleDelete = async (store_id: number) => {
        try {
            const res = await axios.post('/api/deletebranch', {
                store_id: Number(store_id)
            })
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }

    const handleUpdate = async (_store_id: number, _store_name: string, _store_manager: number, _store_id_old: number) => {
        try {
            const res = await axios.post('/api/editbranch', {
                store_id: Number(_store_id),
                store_name: _store_name,
                store_manager: Number(_store_manager),
                store_id_old: Number(_store_id_old)
            })

            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }

    return (
        <div className='w-full'>
            <div className='[&>div]:max-h-105 [&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted sticky top-0 text-lg'>
                            <TableHead className='w-40'>หมายเลขสาขา</TableHead>
                            <TableHead>ชื่อสาขา</TableHead>
                            <TableHead>ผู้จัดการ</TableHead>
                            <TableHead className='text-right'>แอ็คชั่น</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-lg'>
                        {data.map(dataEach => (
                            <TableRow key={dataEach.store_id}>
                                <TableCell>{dataEach.store_id}</TableCell>
                                <TableCell className='font-medium'>{dataEach.store_name}</TableCell>
                                <TableCell>{dataEach.store_manager}</TableCell>
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
                                                            onClick={() => setBranchUpdateData({
                                                                store_id: dataEach.store_id,
                                                                store_name: dataEach.store_name,
                                                                store_manager: dataEach.store_manager
                                                            })}
                                                        >แก้ไข</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>แก้ไขข้อมูล สาขาที่ {dataEach.store_id}</DialogTitle>
                                                            <DialogDescription>
                                                                แก้ไขข้อมูลของสาขา.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="name-1">หมายเลขสาขา</Label>
                                                                <Input id="name-1" name="name" placeholder="รหัสสาขา เช่น 1" defaultValue={dataEach.store_id}
                                                                    onChange={(e) => setBranchUpdateData({ ...branchUpdateData, store_id: Number(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ชื่อสาขา</Label>
                                                                <Input id="username-1" name="username" placeholder="ชื่อสาขา เช่น กรุงเทพ" defaultValue={dataEach.store_name}
                                                                    onChange={(e) => setBranchUpdateData({ ...branchUpdateData, store_name: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ผู้จัดการ</Label>
                                                                <Input id="username-1" name="username" placeholder="กรอกหมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.store_manager}
                                                                    onChange={(e) => setBranchUpdateData({ ...branchUpdateData, store_manager: Number(e.target.value) })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                            <Button type="submit"
                                                                onClick={() => handleUpdate(branchUpdateData.store_id, branchUpdateData.store_name, branchUpdateData.store_manager, dataEach.store_id)}>
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
                                                        <AlertDialogTitle>คุณแน่ใจใช่ไหมว่าจะลบ สาขาที่ {dataEach.store_id}?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            หากลบแล้วจะไม่สามารถนำกลับมาได้อีก.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(dataEach.store_id)}>ยืนยัน</AlertDialogAction>
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
                จำนวนสาขาทั้งหมด {data.length}
            </p>
        </div>
    )
}

export default TableRoundedCornerBranch
