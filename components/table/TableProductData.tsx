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
    category_name: string;
    category_store: number;
};

type TableProductData = {
    product_storeid: number;
    product_id: number;
    product_category: string;
    product_name: string;
    product_des: string;
    product_img: string;
    product_price: number;
};

type TableBranchData = {
    store_id: number;
    store_name: string;
    store_manager: number;
};


type TableProps = {
    data: TableProductData[],
    refreshData: () => void
}

const TableRoundedCornerProduct = ({ data, refreshData }: TableProps) => {

    const [productUpdateData, setProductUpdateData] = useState<TableProductData>({
        product_storeid: 0,
        product_id: 0,
        product_category: '',
        product_name: '',
        product_des: '',
        product_img: '',
        product_price: 0
    })

    useEffect(()=>{
        console.log(productUpdateData)
    },[productUpdateData])
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
            const res = await axios.post('/api/deleteproductbyid', {
                id: Number(_id)
            })
            refreshData();
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }

    const handleUpdate = async (_product_storeid: number, _product_id: number, _product_category: string, _product_name: string, _product_des: string, _product_img: string, _product_price: number, _product_id_old: number) => {
        try {
            const res = await axios.post('/api/editproduct', {
                product_storeid: _product_storeid,
                product_id: _product_id,
                product_category: _product_category,
                product_name: _product_name,
                product_des: _product_des,
                product_img: _product_img,
                product_price: _product_price,
                product_old_id: _product_id_old
            })
            refreshData();

            console.log(res)
            // ถ้าต้องการ รีเฟรชข้อมูล ให้เรียก fetch ใหม่ หรือ update state ของ parent component
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการลบสาขา');
        }
    }



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
        <div className='w-full'>
            <div className='[&>div]:max-h-105 [&>div]:rounded-sm [&>div]:border'>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-muted sticky top-0 text-lg'>
                            <TableHead className='w-20'>หมายเลขสาขา</TableHead>
                            <TableHead>หมายสินค้า</TableHead>
                            <TableHead>ประเภทสินค้า</TableHead>
                            <TableHead>ชื่อสินค้า</TableHead>
                            <TableHead>คำอธิบายสินค้า</TableHead>
                            <TableHead>ภาพสินค้า</TableHead>
                            <TableHead>ราคาสินค้า</TableHead>
                            <TableHead className='text-right'>แอ็คชั่น</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='text-lg'>
                        {data.map(dataEach => (
                            <TableRow key={dataEach.product_id}>
                                <TableCell>{dataEach.product_storeid}</TableCell>
                                <TableCell>{dataEach.product_id}</TableCell>
                                <TableCell>{dataEach.product_category}</TableCell>
                                <TableCell>{dataEach.product_name}</TableCell>
                                <TableCell>{dataEach.product_des}</TableCell>
                                <TableCell>{dataEach.product_img}</TableCell>
                                <TableCell>{dataEach.product_price}</TableCell>
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
                                                            onClick={() => {
                                                                setProductUpdateData({
                                                                    product_storeid: dataEach.product_storeid,
                                                                    product_id: dataEach.product_id,
                                                                    product_category: dataEach.product_category,
                                                                    product_name: dataEach.product_name,
                                                                    product_des: dataEach.product_des,
                                                                    product_img: dataEach.product_img,
                                                                    product_price: dataEach.product_price
                                                                });
                                                                fetchCategoryData(dataEach.product_storeid); // <-- โหลด category
                                                            }}
                                                        >แก้ไข</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>แก้ไขข้อมูล สาขาที่ {dataEach.product_id}</DialogTitle>
                                                            <DialogDescription>
                                                                แก้ไขข้อมูลของสาขา.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="name-1">หมายเลขสาขา</Label>
                                                                <Select
                                                                    defaultValue={String(dataEach.product_storeid)}
                                                                    onValueChange={(value) => {
                                                                        const storeId = Number(value);

                                                                        // อัปเดต state
                                                                        setProductUpdateData((prev) => ({
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
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">หมายสินค้า</Label>
                                                                <Input id="username-1" name="username" placeholder="ชื่อสาขา เช่น กรุงเทพ" defaultValue={dataEach.product_id}
                                                                    onChange={(e) => setProductUpdateData({ ...productUpdateData, product_id: Number(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ประเภทสินค้า</Label>
                                                                <Select disabled={dataEach.product_storeid === 0}
                                                                    onValueChange={(value) =>
                                                                        setProductUpdateData({ ...productUpdateData, product_category: String(value) })
                                                                    }

                                                                    defaultValue={dataEach.product_category}
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
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.product_name}
                                                                    onChange={(e) => setProductUpdateData({ ...productUpdateData, product_name: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">คำอธิบายสินค้า</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.product_des}
                                                                    onChange={(e) => setProductUpdateData({ ...productUpdateData, product_des: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ภาพสินค้า</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.product_img}
                                                                    onChange={(e) => setProductUpdateData({ ...productUpdateData, product_img: String(e.target.value) })}
                                                                />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <Label htmlFor="username-1">ราคาสินค้า</Label>
                                                                <Input id="username-1" name="username" placeholder="ใส่หมายเลขประจำตัวผู้จัดการสาขา" defaultValue={dataEach.product_price}
                                                                    onChange={(e) => setProductUpdateData({ ...productUpdateData, product_price: Number(e.target.value) })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </DialogClose>
                                                            <DialogClose asChild>
                                                                <Button type="submit"
                                                                    onClick={() => handleUpdate(productUpdateData.product_storeid, productUpdateData.product_id, productUpdateData.product_category, productUpdateData.product_name, productUpdateData.product_des, productUpdateData.product_img, productUpdateData.product_price, dataEach.product_id)}>
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
                                                        <AlertDialogTitle>คุณแน่ใจใช่ไหมว่าจะลบ สาขาที่ {dataEach.product_name}?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            หากลบแล้วจะไม่สามารถนำกลับมาได้อีก.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(dataEach.product_id)}>ยืนยัน</AlertDialogAction>
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
                จำนวนสินค้าทั้งหมด {data.length}
            </p>
        </div>
    )
}

export default TableRoundedCornerProduct
