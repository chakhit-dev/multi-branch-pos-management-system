import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import axios from "axios"
import { useState } from "react"

import { LuQrCode } from "react-icons/lu";
import { toast } from "sonner"

type TableData = {
    store_id: number;
    table_id: number;
    session_id: string;
    customer_amount: number;
    status: string;
    update_time: string;
};

type TableProps = {
    data: TableData;
    refreshData: () => void;
};

export default function Table({ data, refreshData }: TableProps) {
    const [customerCount, setCustomerCount] = useState('');
    const [qrCode, setQrCode] = useState<string | null>(null);

    // const handleOpenTable = async () => {
    //     const res = await fetch('/api/open-table', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             tableId: Number(tableId),
    //             customerCount: Number(customerCount),
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });

    //     const data = await res.json();
    //     setQrCode(data.qrCode);
    // };

    const handleOpenTable = async () => {

        // console.log(customerCount)

        try {
            const response = await axios.post('/api/opentable', {
                store_id: Number(data.store_id),
                tableId: Number(data.table_id),
                customerCount: Number(customerCount),
            });
            setQrCode(response.data.qrCode);
            refreshData();
            toast("เปิดโต๊ะสำเร็จ")
        } catch (error) {
            console.error(error);
            alert('เปิดโต๊ะไม่สำเร็จ');
        }
    };

    const handleClearTable = async () => {

        // console.log(customerCount)

        try {
            const response = await axios.post('/api/cleartable', {
                store_id: Number(data.store_id),
                tableId: Number(data.table_id),
            });
            refreshData();
            toast("เครียร์โต๊ะสำเร็จ")
            setQrCode(null)
            // toast("เครียร์โต๊ะสำเร็จ", {
            //     description: `โต๊ะที่ ${data.table_id}`,
            // })
        } catch (error) {
            console.error(error);
            alert('เครียร์โต๊ะไม่สำเร็จ');
        }
    };

    function setBadge() {
        if (data.status === 'available') {
            return (
                <Badge className="absolute right-2 top-2 text-xs bg-green-700">
                    สถานะ : พร้อมใช้งาน
                </Badge>
            );
        }
        else if (data.status === 'occupied') {
            return (
                <Badge className="absolute right-2 top-2 text-xs bg-red-700">
                    สถานะ : กำลังใช้งาน
                </Badge>
            );
        }
        else if (data.status === 'disabled') {
            return (
                <Badge className="absolute right-2 top-2 text-xs bg-black">
                    สถานะ : ปิดใช้งาน
                </Badge>
            );
        }
        else if (data.status === 'cleaning') {
            return (
                <Badge className="absolute right-2 top-2 text-xs bg-blue-700">
                    สถานะ : ทำความสะอาด
                </Badge>
            );
        }
        else if (data.status === 'waiting_for_bill') {
            return (
                <Badge className="absolute right-2 top-2 text-xs bg-yellow-700">
                    สถานะ : รอเช็คบิล
                </Badge>
            );
        }
        else {
            return (
                <Badge className="absolute right-2 top-2 text-xs bg-black">
                    สถานะ : {data.status}
                </Badge>
            );
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="relative bg-muted aspect-video rounded-xl flex flex-col justify-center items-center border-2">
                    {setBadge()}
                    {/* <Badge className="absolute right-2 top-2 text-xs bg-green-700">สถานะ : {data.status}</Badge> */}
                    <div className="text-6xl">
                        {data.table_id}
                    </div>
                    <div className="text-lg text-black/50 font-bold">
                        จำนวนลูกค้า : {data.customer_amount || 0}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Table : {data.table_id}</DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-col gap-4">
                            <Input
                                type="number"
                                placeholder="จำนวนลูกค้า"
                                value={customerCount}
                                onChange={(e) => setCustomerCount(e.target.value)}
                                min={0}
                            />
                            {/* <DialogClose asChild> */}
                                <Button className="w-full" variant="default" onClick={handleOpenTable}><LuQrCode /> สั่งอาหารด้วย QR CODE</Button>
                            {/* </DialogClose> */}
                            {qrCode && (
                                <div className="p-4 bg-gray-100 rounded text-center">
                                    <p className="mb-2">QR Code ของโต๊ะ</p>
                                    <img src={qrCode} alt="QR Code" className="mx-auto" />
                                </div>
                            )}
                            <Separator />
                            <DialogClose asChild>
                                <Button className="w-full bg-red-800 hover:bg-red-700" variant="default" onClick={handleClearTable}>เครียร์โต๊ะ</Button>
                            </DialogClose>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}