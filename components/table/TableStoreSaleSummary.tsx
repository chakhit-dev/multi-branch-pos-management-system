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

type StoreSaleSummary = {
    store_id:number;
    store_name:string;
    total_sales:number;
}

type TableProps = {
    data: StoreSaleSummary[],
}

const TableStoreSaleSummary = ({ data }: TableProps) => {

    console.log(data)

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
                            <TableHead>ยอดรวมทั้งหมด</TableHead>
                            {/* <TableHead className='text-right'>แอ็คชั่น</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-lg'>
                        {data.map((dataEach, index) => (
                            <TableRow key={index}>
                                <TableCell>{dataEach.store_id}</TableCell>
                                <TableCell className='font-medium'>{dataEach.store_name}</TableCell>
                                <TableCell>{dataEach.total_sales}</TableCell>
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

export default TableStoreSaleSummary
