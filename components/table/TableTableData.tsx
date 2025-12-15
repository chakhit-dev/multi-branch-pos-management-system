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

type TableTableData = {
    store_id: number;
    table_id: number;
    session_id: string;
    customer_amount: number;
    status: string;
    update_time: string;
};

type TableBranchData = {
    store_id: number;
    store_name: string;
    store_manager: number;
};

type TableProps = {
    data: TableTableData[],
    refreshData: () => void
}

const TableRoundedCornerTable = ({ data, refreshData }: TableProps) => {

    const [tableUpdateData, setTableUpdateData] = useState<TableTableData>({
        store_id: 0,
        table_id: 0,
        session_id: '',
        customer_amount: 0,
        status: '',
        update_time: ''
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

    const handleDelete = async (_store_id: number, _table_id: number) => {
        try {
            const res = await axios.post('/api/deletetable', {
                store_id: Number(_store_id),
                table_id: Number(_table_id)
            })
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
            refreshData();
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }

    const handleUpdate = async (_store_id: number, _table_id: number, _old_store: number, _old_table: number) => {
        try {
            const res = await axios.post('/api/edittable', {
                store_id: _store_id,
                table_id: _table_id,
                old_store_id: _old_store,
                old_table_id: _old_table
            })
            refreshData();
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
                            <TableHead>หมายเลขโต๊ะ</TableHead>
                            {/* <TableHead>เซกชั่นของโต๊ะ</TableHead> */}
                            <TableHead>จำนวนลูกค้า</TableHead>
                            <TableHead>สถานะ</TableHead>
                            <TableHead className='text-right'>แอ็คชั่น</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-lg'>
                        {data.map((dataEach, index) => (
                            <TableRow key={index}>
                                <TableCell>{dataEach.store_id}</TableCell>
                                <TableCell className='font-medium'>{dataEach.table_id}</TableCell>
                                {/* <TableCell>{dataEach.session_id}</TableCell> */}
                                <TableCell>{dataEach.customer_amount}</TableCell>
                                <TableCell>{dataEach.status}</TableCell>
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
                                                            onClick={() => setTableUpdateData({
                                                                store_id: dataEach.store_id,
                                                                table_id: dataEach.table_id,
                                                                session_id: dataEach.session_id,
                                                                customer_amount: dataEach.customer_amount,
                                                                status: dataEach.status,
                                                                update_time: dataEach.update_time
                                                            })}
                                                        >แก้ไข</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>แก้ไขข้อมูล โต๊ะที่ {dataEach.table_id} สาขา {dataEach.store_id}</DialogTitle>
                                                            <DialogDescription>
                                                                แก้ไขข้อมูลของสาขา.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="name-1">หมายเลขสาขา</Label>
                                                                <Select
                                                                    defaultValue={String(dataEach.store_id)}
                                                                    onValueChange={(value) =>
                                                                        setTableUpdateData({ ...tableUpdateData, store_id: Number(value) })
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
                                                                <Label htmlFor="username-1">หมายเลขโต๊ะ</Label>
                                                                <Input id="username-1" name="username" placeholder="ชื่อสาขา เช่น กรุงเทพ" defaultValue={dataEach.table_id}
                                                                    onChange={(e) => setTableUpdateData({ ...tableUpdateData, table_id: Number(e.target.value) })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button type="submit"
                                                                    onClick={() => handleUpdate(tableUpdateData.store_id, tableUpdateData.table_id, dataEach.store_id, dataEach.table_id)}>
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
                                                        <AlertDialogAction onClick={() => handleDelete(dataEach.store_id, dataEach.table_id)}>ยืนยัน</AlertDialogAction>
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
                จำนวนโต๊ะทั้งหมด {data.length}
            </p>
        </div>
    )
}

export default TableRoundedCornerTable
