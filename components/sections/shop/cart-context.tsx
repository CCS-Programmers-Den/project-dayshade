"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ProductItem } from "./products";

export const MAX_QTY_PER_ITEM = 20;

export interface CartLine {
    id: string;
    title: string;
    imageSrc?: string;
    price: number;
    qty: number;
}

interface CartContextValue {
    lines: CartLine[];
    itemCount: number;
    total: number;
    qtyOf: (id: string) => number;
    add: (product: ProductItem) => void;
    setQty: (id: string, qty: number) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [lines, setLines] = useState<CartLine[]>([]);

    const add = useCallback((product: ProductItem) => {
        const price = Number(product.price);
        if (product.price == null || !Number.isFinite(price)) return; // unpriced items can't be bought
        setLines((current) => {
            const existing = current.find((l) => l.id === product.id);
            if (existing) {
                return current.map((l) =>
                    l.id === product.id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY_PER_ITEM) } : l
                );
            }
            return [
                ...current,
                { id: product.id, title: product.title, imageSrc: product.imageSrc, price, qty: 1 },
            ];
        });
    }, []);

    const setQty = useCallback((id: string, qty: number) => {
        setLines((current) =>
            qty < 1
                ? current.filter((l) => l.id !== id)
                : current.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY_PER_ITEM) } : l))
        );
    }, []);

    const clear = useCallback(() => setLines([]), []);

    const value = useMemo<CartContextValue>(
        () => ({
            lines,
            itemCount: lines.reduce((n, l) => n + l.qty, 0),
            // Whole centavos, so float rounding never shows the buyer a wrong total.
            total: lines.reduce((cents, l) => cents + Math.round(l.price * 100) * l.qty, 0) / 100,
            qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
            add,
            setQty,
            clear,
        }),
        [lines, add, setQty, clear]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
}

export function formatPeso(amount: number) {
    return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
