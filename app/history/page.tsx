'use client'
import { useParams, useRouter } from 'next/navigation'
import { BiFile } from "react-icons/bi";
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
// import { useEffect, useState } from "react";
// import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// type ProductData = {
//     orderid: number;
//     storeid: number;
//     tableid: number;
//     sessionid: string;
//     productid: number;
//     quantity: number;
//     price: number;
//     img: string;
//     status: string;
//     time: string;
//     product_name: string;
// }

type HistoryData = {
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

type HistoryProps = {
    data: HistoryData[];
};


export default function HistoryPage({ data }: HistoryProps) {

    // const [itemList, setItemList] = useState<ProductData[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.post('/api/getorderbysessionid', { sessionid: data[0].sessionid });
    //             setItemList(response.data);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchData();
    // }, []);

    // รวมสินค้าซ้ำ productid เดียวกัน
    const groupedItems = data.reduce((acc: Record<number, HistoryData>, item) => {
        if (acc[item.productid]) {
            acc[item.productid].quantity += item.quantity; // รวม quantity
        } else {
            acc[item.productid] = { ...item }; // เพิ่มใหม่
        }
        return acc;
    }, {});

    // แปลง object เป็น array เพื่อ .map() ได้
    const mergedItems = Object.values(groupedItems);

    function setBadge(data:string) {
        if (data === 'กำลังเตรียมอาหาร') {
            return (
                <Badge className="text-xs bg-yellow-500/80">
                    {data}
                </Badge>
            );
        }
        else if (data === 'กำลังทำอาหาร') {
            return (
                <Badge className="text-xs bg-orange-700/70">
                    {data}
                </Badge>
            );
        }
        else if (data === 'ส่งอาหารแล้ว') {
            return (
                <Badge className="text-xs bg-green-700/80">
                    {data}
                </Badge>
            );
        }
    }

    const router = useRouter()
    const params = useParams();
    const shopId = params.id;

    return (
        <div>

            <div>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <div className="border-2 rounded-lg flex justify-center items-center bg-muted text-lg p-2">
                                <BiFile />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="text-2xl">
                                        รายการที่สั่ง
                                    </div>
                                </DialogTitle>
                            </DialogHeader>
                            {/* <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                                </div>
                            </div> */}

                            <ScrollArea className="h-[50vh] w-full px-4">
                                {mergedItems.length === 0 ? (
                                    <p className="text-center text-gray-500 mt-4">ไม่มีสินค้าในตะกร้า</p>
                                ) : (
                                    mergedItems.map((item) => (
                                        <div key={`${item.productid}`}>
                                            <div className="flex flex-row justify-between">
                                                <div className="flex gap-4">
                                                    <div className="w-14 h-14">
                                                        <img
                                                            src={`/items/${item.img}.png`}
                                                            alt={item.product_name}
                                                            className="w-full h-full object-cover rounded-2xl"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <div className="text-xl">{item.product_name}</div>
                                                        <div className="text-sm text-gray-500">x {item.quantity}</div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between items-end">
                                                    <div className="text-right text-xl">
                                                        ฿ {Number(item.price) * item.quantity}
                                                    </div>
                                                    <div className="text-right text-xl">
                                                        {setBadge(item.status)}
                                                    </div>
                                                </div>
                                            </div>
                                            <Separator className="my-2.5" />
                                        </div>
                                    ))
                                )}
                            </ScrollArea>

                            <DialogFooter>
                                <DialogClose asChild>

                                    {/* <div className="">
                                        <div className="w-full text-right text-lg">
                                            ราคารวม: ฿ {totalPrice}
                                        </div>
                                        <Button
                                            disabled={items.length === 0}
                                            className="w-full bg-orange-600 hover:bg-orange-500"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            {`สั่ง ${totalItems} รายการ`}
                                        </Button>
                                    </div> */}

                                    <Button className="bg-blue-600/80 text-lg hover:bg-blue-600/60 w-full" onClick={() => router.push(`/checkbills/${shopId}`)}>บิลค่าอาหาร</Button>

                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>


        </div>
    )
}