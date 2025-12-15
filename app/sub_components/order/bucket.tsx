import { Badge } from "@/components/ui/badge"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TiShoppingCart } from "react-icons/ti"
import { FiMinus, FiPlus } from "react-icons/fi";
import { useCartStore } from "@/app/stores/cartStore"
import axios from "axios"
import { useEffect } from "react"

type TableData = {
    store_id: number;
    table_id: number;
    session_id: string;
    customer_amount: number;
    status: string;
    update_time: string;
}

type TableProps = {
    data: TableData[];
    onOrderComplete?: () => void;
};


export default function Bucket({ data, onOrderComplete }: TableProps) {

    const { items, addItem, increaseQty, decreaseQty, clearCart } = useCartStore()
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

    const handleSubmit = async () => {
        const sessionid = data[0]?.session_id;

        const body = items.map(item => ({
            ...item,
            sessionid,
        }));

        // console.log(body);

        try {
            const response = await axios.post('/api/order', body); // ส่ง array ตรงๆ
            clearCart();
            onOrderComplete?.();
            // console.log('Response:', response.data);
        } catch (error) {
            console.error(error);
        }
    };


    // useEffect(() => {
    //     console.log(items)
    // }, [items])

    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <div className="absolute right-4 bottom-4 z-1 border-2 rounded-full flex justify-center items-center bg-muted text-lg p-3">
                            <div className="absolute right-[-1vh] top-[-2vh]">
                                {/* {totalItems && ( */}
                                <Badge variant="destructive">{totalItems}</Badge>
                                {/* )} */}
                            </div>
                            <div className="text-2xl">
                                <TiShoppingCart />
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>
                                <div className="text-xl">
                                    ตะกร้า
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
                            {items.length === 0 ? (
                                <p className="text-center text-gray-500 mt-4">ไม่มีสินค้าในตะกร้า</p>
                            ) : (
                                items.map((item) => (
                                    <div key={item.productid}>
                                        <div className="flex flex-row justify-between">
                                            <div className="flex gap-4">
                                                <div className="w-14 h-14">
                                                    <img
                                                        src={`/items/${item.img}.png`}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-2xl"
                                                    />
                                                </div>
                                                <div className="">
                                                    <div className="text-xl">{item.name}</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between items-end">
                                                <div className="text-right text-xl">
                                                    ฿ {item.price * item.quantity}
                                                </div>
                                                <div className="flex gap-4 items-center">
                                                    <Button
                                                        variant="default"
                                                        size="icon"
                                                        className="size-6"
                                                        onClick={() => decreaseQty(item.productid)}
                                                    >
                                                        <FiMinus />
                                                    </Button>

                                                    <div className="text-xl">
                                                        {item.quantity}
                                                    </div>

                                                    <Button
                                                        variant="default"
                                                        size="icon"
                                                        className="size-6"
                                                        onClick={() => increaseQty(item.productid)}
                                                    >
                                                        <FiPlus />
                                                    </Button>
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
                                <div className="">
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
                                </div>

                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    )
}