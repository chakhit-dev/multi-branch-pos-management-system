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
import { useSession } from 'next-auth/react';

type TableUserData = {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    atb: number;
    role: string;
};

type TableProps = {
    data: TableUserData[],
    refreshData: () => void
}

const TableRoundedCornerUser = ({ data, refreshData }: TableProps) => {
    const { data: session, status } = useSession();
    const [userUpdateData, setUserUpdateData] = useState<TableUserData>({
        id: 0,
        username: '',
        password: '',
        name: '',
        email: '',
        atb: 0,
        role: '',
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

    const handleDelete = async (_id: number) => {
        try {
            const res = await axios.post('/api/deleteuser', {
                id: Number(_id)
            })
            refreshData();
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }

    const handleUpdate = async (_id: number, _username: string, _password: string, _name: string, _email: string, _atb: number, _role: string, old_id: number) => {
        try {
            const res = await axios.post('/api/edituser', {
                id: Number(_id),
                username: _username,
                password: _password,
                name: _name,
                email: _email,
                atb: Number(_atb),
                role: _role,
                old_id: old_id,
            })
            refreshData();

            console.log(res)
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }

    function setBranchRender(dataEach:TableUserData) {
        if (session?.user.role == 'owner') {
            return (
                <div className="grid gap-3">
                    <Label htmlFor="username-1">ประจำสาขา</Label>
                    <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.atb}
                        onChange={(e) => setUserUpdateData({ ...userUpdateData, atb: Number(e.target.value) })}
                    />
                </div>
            )
        }
        else {
            return (
                <div className="grid gap-3">
                    <Label htmlFor="username-1">ประจำสาขา</Label>
                    <Input disabled id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={session?.user.atb}
                        onChange={(e) => setUserUpdateData({ ...userUpdateData, atb: Number(e.target.value) })}
                    />
                </div>
            )
        }
    }

    return (
        <div className='w-full'>
            <div className='[&>div]:max-h-105 [&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted sticky top-0 text-lg'>
                            <TableHead className='w-40'>หมายประจำตัว</TableHead>
                            <TableHead>ชื่อผู้ใช้</TableHead>
                            <TableHead>รหัสผ่าน</TableHead>
                            <TableHead>ชื่อ</TableHead>
                            <TableHead>อีเมล</TableHead>
                            <TableHead>ประจำสาขา</TableHead>
                            <TableHead>บทบาท</TableHead>
                            <TableHead className='text-right'>แอ็คชั่น</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-lg'>
                        {data.map(dataEach => (
                            <TableRow key={dataEach.id}>
                                <TableCell>{dataEach.id}</TableCell>
                                <TableCell className='font-medium'>{dataEach.username}</TableCell>
                                <TableCell>{dataEach.password}</TableCell>
                                <TableCell>{dataEach.name}</TableCell>
                                <TableCell>{dataEach.email}</TableCell>
                                <TableCell>{dataEach.atb}</TableCell>
                                <TableCell>{dataEach.role}</TableCell>
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
                                                            onClick={() => setUserUpdateData({
                                                                id: Number(dataEach.id),
                                                                username: dataEach.username,
                                                                password: dataEach.password,
                                                                name: dataEach.name,
                                                                email: dataEach.email,
                                                                atb: Number(dataEach.atb),
                                                                role: dataEach.role,
                                                            })}
                                                        >แก้ไข</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>แก้ไขข้อมูล สาขาที่ {dataEach.id}</DialogTitle>
                                                            <DialogDescription>
                                                                แก้ไขข้อมูลของสาขา.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="name-1">หมายประจำตัว</Label>
                                                                <Input id="name-1" name="name" placeholder="รหัสสาขา เช่น 1" defaultValue={dataEach.id}
                                                                    onChange={(e) => setUserUpdateData({ ...userUpdateData, id: Number(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ชื่อผู้ใช้</Label>
                                                                <Input id="username-1" name="username" placeholder="ชื่อสาขา เช่น กรุงเทพ" defaultValue={dataEach.username}
                                                                    onChange={(e) => setUserUpdateData({ ...userUpdateData, username: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">รหัสผ่าน</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.password}
                                                                    onChange={(e) => setUserUpdateData({ ...userUpdateData, password: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ชื่อ</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.name}
                                                                    onChange={(e) => setUserUpdateData({ ...userUpdateData, name: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">อีเมล</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.email}
                                                                    onChange={(e) => setUserUpdateData({ ...userUpdateData, email: String(e.target.value) })}
                                                                />
                                                            </div>



                                                            {setBranchRender(dataEach)}

                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">บทบาท</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.role}
                                                                    onChange={(e) => setUserUpdateData({ ...userUpdateData, role: String(e.target.value) })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button type="submit"
                                                                    onClick={() => handleUpdate(userUpdateData.id, userUpdateData.username, userUpdateData.password, userUpdateData.name, userUpdateData.email, userUpdateData.atb, userUpdateData.role, dataEach.id)}>
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
                                                        <AlertDialogTitle>คุณแน่ใจใช่ไหมว่าจะลบ สาขาที่ {dataEach.id}?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            หากลบแล้วจะไม่สามารถนำกลับมาได้อีก.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(dataEach.id)}>ยืนยัน</AlertDialogAction>
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

export default TableRoundedCornerUser
