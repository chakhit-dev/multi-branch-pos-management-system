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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { formatISO, formatISO9075 } from "date-fns";
import { Badge } from "@/components/ui/badge"

type TableData = {
    tableid: number;
    storeid: number;
    order_count: number;
    status:string;
    time: string;
};

type TableProps = {
    data: TableData
    refreshData: () => void;
}

type FData = {
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



export default function CardKitchen({ data, refreshData }: TableProps) {

    const [open, setOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState<FData[] | null>(null);
    const [loading, setLoading] = useState(false);
    // const cacheRef = useRef({}); // เก็บ cache เป็น object
    const cacheRef = useRef<{ [key: string]: FData[] }>({});

    // console.log(data)

    

    useEffect(() => {
        if (open) {
            setLoading(true);
            const localTime = formatISO9075(data.time);
            const cacheKey = `${localTime}_${data.tableid}_${data.storeid}`;

            if (cacheRef.current[cacheKey]) {
                setOrderDetail(cacheRef.current[cacheKey]);
                setLoading(false);
            } else {
                axios.post("/api/getorderbytime", {
                    time: localTime,
                    tableid: data.tableid,
                    storeid: data.storeid,
                })
                    .then(response => {
                        setOrderDetail(response.data);
                        cacheRef.current[cacheKey] = response.data; // response.data เป็น FData[]
                        setLoading(false);
                    })
                    .catch(error => {
                        // console.error("Error fetching orders:", error);
                        setLoading(false);
                    });
            }
        }
    }, [open, data.time, data.tableid, data.storeid]);

    const handleSubmit = async (data: FData[]) => {
        try {
            await axios.post('/api/updateorderstatus', data);
            alert('ส่งอาหารเรียบร้อยแล้ว');
            refreshData()
        } catch (err) {
            console.error(err);
            alert('ส่งอาหารไม่สำเร็จ');
        }
    };

    function cBadge(status: string) {
        switch(status) {
            case 'กำลังเตรียมอาหาร':
                return <Badge className="bg-amber-300">{status}</Badge>;
            case 'ส่งอาหารแล้ว':
                return <Badge className="bg-green-600">{status}</Badge>;
            default:
                return <Badge >{status}</Badge>;
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="relative bg-muted aspect-video rounded-xl flex flex-col justify-center items-center border-2">
                    {/* <Badge className="absolute right-2 top-2 text-xs bg-green-700">สถานะ : {data.status}</Badge> */}
                    <div className="text-6xl">
                        โต๊ะ {data?.tableid}
                    </div>
                    <div className="text-lg text-black/50 font-bold">
                        ทั้งหมด : {data?.order_count} รายการ
                    </div>
                    <div className="text-lg text-black/50 font-bold">
                        {/* สถานะ <Badge variant="destructive">{data?.status}</Badge> */}
                        {cBadge(data?.status)}
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">รายการอาหารทั้งหมด | Table {data?.tableid}</DialogTitle>
                    <DialogDescription asChild>
                        <div className="flex flex-col gap-2">

                            {loading && <p>กำลังโหลดข้อมูล...</p>}

                            {!loading && orderDetail && (
                                <div className="flex flex-col gap-2">
                                    {orderDetail.map((order, index) => (
                                        <div className="flex justify-between items-center p-2.5 bg-muted rounded-xl border-1 text-black" key={index}>
                                            <div className="flex gap-2 text-xl font-semibold">
                                                <div className="text-blue-400">x{order.quantity}</div>
                                                <div>{order.product_name}</div>
                                            </div>
                                            <div>
                                                {/* <Select defaultValue="banana">
                                                    <SelectTrigger className="w-[180px] text-xl">
                                                        <SelectValue placeholder="Select a fruit" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Fruits</SelectLabel>
                                                            <SelectItem value="apple">Apple</SelectItem>
                                                            <SelectItem value="banana">Banana</SelectItem>
                                                            <SelectItem value="blueberry">Blueberry</SelectItem>
                                                            <SelectItem value="grapes">Grapes</SelectItem>
                                                            <SelectItem value="pineapple">Pineapple</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!loading && !orderDetail && <p>ไม่พบข้อมูล</p>}

                            {/* <div className="flex justify-between items-center p-2.5 bg-muted rounded-xl border-1 text-black">
                                <div className="flex gap-2 text-xl font-semibold">
                                    <div className="text-blue-400">x2</div>
                                    <div>หมูนุ่ม</div>
                                </div>
                                <div>
                                    <Select defaultValue="banana">
                                        <SelectTrigger className="w-[180px] text-xl">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div> */}

                            {/* <div className="flex justify-between items-center p-2.5 bg-muted rounded-xl border-1 text-black">
                                <div className="flex gap-2 text-xl font-semibold">
                                    <div className="text-blue-400">x2</div>
                                    <div>หมูนุ่ม</div>
                                </div>
                                <div>
                                    <Select defaultValue="banana">
                                        <SelectTrigger className="w-[180px] text-xl">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-2.5 bg-muted rounded-xl border-1 text-black">
                                <div className="flex gap-2 text-xl font-semibold">
                                    <div className="text-blue-400">x2</div>
                                    <div>หมูนุ่ม</div>
                                </div>
                                <div>
                                    <Select defaultValue="banana">
                                        <SelectTrigger className="w-[180px] text-xl">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div> */}

                            <Separator />

                            <div className="flex flex-col text-center gap-2">
                                <DialogClose asChild>
                                    <Button className="text-xl" variant="default" onClick={() => orderDetail && handleSubmit(orderDetail)} >ส่งอาหารทั้งหมด</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button className="text-xl" variant="destructive">ยกเลิก</Button>
                                </DialogClose>
                            </div>
                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}