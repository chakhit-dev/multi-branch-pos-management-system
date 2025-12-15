
'use client'
import { useParams, useRouter } from 'next/navigation'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
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
import { useEffect, useState } from 'react';
import axios from "axios";

type OrderHistoryData = {
    orderid: number;
    storeid: number;
    tableid: number;
    sessionid: string;
    productid: number;
    quantity: number;
    price: number;
    img: string;
    status: string;
    time: string;
    product_name: string;
}


export default function CheckBillingPage() {

    const router = useRouter()
    const params = useParams();
    const shopId = params.session;

    const [orderList, setOrderList] = useState<OrderHistoryData[]>([]);

    useEffect(() => {
        if (!shopId) return;
        fetchData();
    }, [shopId]);

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/getorderbysessionid', {
                sessionid: shopId,
            });
            // console.log(response)
            setOrderList(response.data);
        } catch (err) {
            // console.error(err);
        }
    };

    const calculateTotals = () => {
        const subtotal = orderList.reduce((sum, order) => sum + order.price * order.quantity, 0);
        const taxRate = 0.07;
        const tax = subtotal * taxRate;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };

    const { subtotal, tax, total } = calculateTotals();

    const handleConfirm = async () => {

        try {
            const response = await axios.post('/api/updatetablestatusbysession', {
                session: shopId,
            });

            router.push(`/billing/${shopId}`);
        } catch (error) {
            
        }
    };

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 border-t bg-white p-4 z-10">
                <div className="flex items-center gap-4 p-4 border-b">
                    <Button variant="ghost" size="icon" aria-label="Go Back" onClick={() => router.push(`/order/${shopId}`)}>
                        <ArrowLeftIcon />
                    </Button>
                    <div className="text-2xl font-semibold">บิลค่าอาหาร</div>
                </div>

                <div className="flex justify-between items-center gap-4 p-4 border-b">
                    <div className="text-2xl">รายการอาหาร {orderList.length}</div>
                    <Badge variant="secondary" className="text-lg">โต๊ะที่ {orderList[0]?.tableid}</Badge>
                </div>
            </div>


            <div className="mt-36 space-y-2 p-4">
                {/* {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex justify-between border-b p-2 text-xl"
                        >
                            <div className="flex gap-4">
                                <div className="font-bold text-blue-400">2x</div>
                                <div>น้ำเปล่า</div>
                            </div>
                            <div>$99</div>
                        </div>
                    ))} */}
                {orderList?.map((order) => (
                    <div
                        key={order.orderid}
                        className="flex justify-between border-b p-2 text-xl"
                    >
                        <div className="flex gap-4">
                            <div className="font-bold text-blue-400">x{order.quantity}</div>
                            <div>{order.product_name}</div>
                        </div>
                        <div>{order.price}</div>
                    </div>
                ))}
            </div>

            <div className="mb-20 p-4 text-xl">
                <div className="flex justify-between">
                    <div>รวม</div>
                    <div>{subtotal.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                    <div>ภาษี</div>
                    <div>{(tax / subtotal * 100).toFixed(0)}%</div>
                </div>
                <div className="flex justify-between">
                    <div>รวมภาษี</div>
                    <div>{total.toFixed(2)} บาท</div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-4 z-10">
                {/* <Button
                        className="w-full text-xl bg-blue-600 hover:bg-blue-500"
                        size="lg"
                        variant="default"
                    >
                        ดำเนินการต่อ
                    </Button> */}

                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button
                                className="w-full text-xl bg-blue-600 hover:bg-blue-500"
                                size="lg"
                                variant="default"
                            >
                                ดำเนินการต่อ
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="flex flex-col items-center justify-center">
                                    <img className="w-28" src="/receipt.png" alt="" />
                                </DialogTitle>
                                <DialogDescription className="">
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-2xl font-semibold">ยืนยันการเรียกเช็คบิล</div>
                            </div>
                            <div className="flex justify-center items-center bg-red-600/20 text-red-700 p-2 rounded-xl border-1">
                                โปรดทราบหากท่านเรียกเช็คบิลแล้วจะไม่สามารถสั่งอาหารได้อีก
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className="text-xl" variant="outline">ยกเลิก</Button>
                                </DialogClose>
                                <Button className="text-xl" type="submit" onClick={handleConfirm}>ยืนยัน</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>


        </div>
    );


}