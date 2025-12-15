import Image from "next/image";
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
import { Button } from "@/components/ui/button";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useCartStore } from "@/app/stores/cartStore";

type ProductData = {
    img:string;
    pname:string;
    pprice:number;
    pid:number;
    storeid:number;
    tableid:number;
}

export default function Item({ img, pname, pprice, pid, storeid, tableid }: ProductData) {
    const [quantity, setQuantity] = useState(1)
    const addItem = useCartStore(state => state.addItem)

    const increaseQty = () => setQuantity(q => q + 1)
    const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1))

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault()
        addItem({
            storeid: storeid,
            tableid: tableid,
            productid: pid,
            name: pname,
            price: pprice,
            img: `${img}`,
            quantity:quantity,
        })
    }

    return (
        <Dialog>
                <DialogTrigger asChild>
                    <div className="border rounded-2xl p-4 bg-muted/50">
                        <div className="mb-2">
                            <div className="aspect-video relative rounded-lg overflow-hidden">
                                <Image
                                    src={`/items/${img}.png`}
                                    alt={pname}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="leading-none text-xl font-semibold">
                            <div className="">
                                {pname}
                            </div>
                            <div className="text-black/60">
                                ฿ {pprice}
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <div className="mb-2">
                            <div className="aspect-video relative rounded-lg overflow-hidden">
                                <Image
                                    src={`/items/${img}.png`}
                                    alt={pname}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="leading-none text-xl font-semibold">
                            <div className="">
                                {pname}
                            </div>
                            <div className="text-black/60">
                                ฿ {pprice}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col justify-center items-center">
                        <div className="flex gap-4 items-center">
                            <Button variant="default" size="icon" className="size-6" onClick={decreaseQty}>
                                <FiMinus />
                            </Button>

                            <div className="text-xl">
                                {quantity}
                            </div>

                            <Button variant="default" size="icon" className="size-6" onClick={increaseQty}>
                                <FiPlus />
                            </Button>
                        </div>
                        <DialogClose asChild>
                        <form onSubmit={handleAddToCart} className="w-full">
                            <Button className="w-full" type="submit">เพิ่มลงตะกร้า ฿{pprice * quantity}</Button>
                        </form>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>

        </Dialog>
    )
}