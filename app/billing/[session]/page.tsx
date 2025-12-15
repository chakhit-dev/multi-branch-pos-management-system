

'use client'
import { useParams, useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
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


export default function BillingPage() {

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

  return (
    <div>
        <div className="flex flex-col items-center gap-3 mt-10">
            <div>
                <Image src="/receipt.png" alt="" width={84} height={84} />
            </div>
            <div>
                <Badge>โต๊ะ {orderList[0]?.tableid}</Badge>
            </div>
            <div className="flex flex-col items-center">
                <div className="font-bold text-xl">
                    เรียกเช็คบิลแล้ว
                </div>
                <div className="text-lg">
                    กรุณารอพนักงานสักครู่ หรือติดต่อเคาน์เตอร์
                </div>
            </div>
        </div>
        <div className="m-6">
            <div className="bg-muted w-full min-h-[10vh] rounded-xl p-4">
                <div className="text-xl font-bold">
                    รายการอาหารที่สั่ง {orderList.length}
                </div>

                <div>


                    {/* <div className="flex justify-between text-xl border-b-1 py-2">
                        <div className="flex gap-4">
                            <div>
                                x2
                            </div>

                            <div>
                                ข้าวหมูกรอบ
                            </div>
                        </div>
                        <div>
                            123 B
                        </div>
                    </div> */}

                {orderList?.map((order) => (
                    <div className="flex justify-between text-xl border-b-1 py-2" key={order.orderid}>
                        <div className="flex gap-4">
                            <div>
                                x{order.quantity}
                            </div>

                            <div>
                                {order.product_name}
                            </div>
                        </div>
                        <div>
                            {order.price}
                        </div>
                    </div>
                ))}


                </div>


                <div className="flex flex-col text-xl text-neutral-500 font-semibold px-4 pt-4">
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
                        <div>{total.toFixed(2)}</div>
                    </div>
                </div>


            </div>
        </div>
    </div>
  )
}