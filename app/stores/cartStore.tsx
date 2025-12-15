// stores/cartStore.ts
import { create } from 'zustand'

export type CartItem = {
    storeid:number
    tableid:number
    productid:number
    name:string
    price:number
    img:string
    quantity:number
}

type CartState = {
    items: CartItem[]
    addItem: (item: CartItem) => void
    increaseQty: (id: number) => void
    decreaseQty: (id: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    // addItem: (item) => {
    //     const existing = get().items.find(i => i.id === item.id)
    //     if (existing) {
    //         set({
    //             items: get().items.map(i =>
    //                 i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    //             )
    //         })
    //     } else {
    //         set({ items: [...get().items, { ...item, quantity: 1 }] })
    //     }
    // },
    addItem: (item) => {
        const existing = get().items.find(i => i.productid === item.productid)
        if (existing) {
            set({
                items: get().items.map(i =>
                    i.productid === item.productid ? { ...i, quantity: i.quantity + item.quantity } : i
                )
            })
        } else {
            set({ items: [...get().items, item] })
        }
    },
    increaseQty: (id) => {
        set({
            items: get().items.map(i =>
                i.productid === id ? { ...i, quantity: i.quantity + 1 } : i
            )
        })
    },
    decreaseQty: (id) => {
        set({
            items: get().items
                .map(i =>
                    i.productid === id ? { ...i, quantity: i.quantity - 1 } : i
                )
                .filter(i => i.quantity > 0)
        })
    },
    clearCart: () => set({ items: [] }),
    totalItems: 0,
    totalPrice: 0,
}))

// Auto-calculate total
useCartStore.subscribe((state) => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    // state.totalItems = totalItems
    // state.totalPrice = totalPrice
})