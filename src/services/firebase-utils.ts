import { collection, getDocs, getDoc, doc, updateDoc, increment } from "firebase/firestore";
import { db } from '../../config/firebase-config.js';
import type { ProductItems, ProductsArray } from "../lib/types.js";

// Read
export const getTops = async () => {
    const topsCol = collection(db, 'tops');
    const topsSnapshot = await getDocs(topsCol);
    const topsList = topsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return topsList as ProductsArray;
}

export const getBottoms = async () => {
    const bottomsCol = collection(db, 'bottoms');
    const bottomsSnapshot = await getDocs(bottomsCol);
    const bottomsList = bottomsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return bottomsList as ProductsArray;
}

export const getAllProducts = async () => {
    const tops = await getTops();
    const bottoms = await getBottoms();
    const allProducts = [...tops, ...bottoms];
    return allProducts as ProductsArray;
}

export const getProduct = async (id: string, colType: string) => {
    const productRef = doc(db, colType, id)
    const productSnapshot = await getDoc(productRef);
    const productData = productSnapshot.data();
    return { ...productData, id: productSnapshot.id } as ProductItems;
}

// Update
export const setFavouriteProduct = async (id: string, colType: string, favValue: boolean) => {
    const productRef = doc(db, colType, id)
    const data = { favourite: !favValue };
    updateDoc(productRef, data);
}

export const addOneToCart = async (id: string, colType: string, size: string) => {
    const productRef = doc(db, colType, id);
    const data = {
        [`sizes.${size}`]: increment(-1),
        [`inCart.${size}`]: increment(1)
    }
    await updateDoc(productRef, data);
}

export const removeOneFromCart = async (id: string, colType: string, size: string) => {
    const productRef = doc(db, colType, id);
    const data = {
        [`sizes.${size}`]: increment(1),
        [`inCart.${size}`]: increment(-1)
    }
    await updateDoc(productRef, data);
}

// Delete all items from cart and revert to initial
export const removeProductFromCart = async (id: string, colType: string, size: string, amount: number) => {
    const productRef = doc(db, colType, id);
    const data = {
        [`sizes.${size}`]: increment(amount),
        [`inCart.${size}`]: increment(-amount)
    }
    await updateDoc(productRef, data);
}
