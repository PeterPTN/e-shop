import { collection, addDoc, getDocs, getDoc, doc, updateDoc, increment } from "firebase/firestore";
import { db } from '../../config/firebase-config.js';
import type { ProductItems, ProductsArray } from "../lib/types.js";

// Read
export const getTops = async () => {
    try {
        const topsCol = collection(db, 'tops');
        const topsSnapshot = await getDocs(topsCol);
        const topsList = topsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return topsList as ProductsArray;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getBottoms = async () => {
    try {
        const bottomsCol = collection(db, 'bottoms');
        const bottomsSnapshot = await getDocs(bottomsCol);
        const bottomsList = bottomsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return bottomsList as ProductsArray;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getAllProducts = async () => {
    try {
        const tops = await getTops() || [];
        const bottoms = await getBottoms() || [];
        const allProducts = [...tops, ...bottoms];
        return allProducts as ProductsArray;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const getProduct = async (id: string, colType: string) => {
    try {
        const productRef = doc(db, colType, id)
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();
        return { ...productData, id: productSnapshot.id } as ProductItems;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Update
export const setFavouriteProduct = async (id: string, colType: string, favValue: boolean) => {
    try {
        const productRef = doc(db, colType, id)
        const data = { favourite: !favValue };
        updateDoc(productRef, data);
    } catch (error) {
        console.log(error);
    }
}

export const addOneToCart = async (id: string, colType: string, size: string) => {
    try {
        const productRef = doc(db, colType, id);
        const data = {
            [`sizes.${size}`]: increment(-1),
            [`inCart.${size}`]: increment(1)
        }
        await updateDoc(productRef, data);
    } catch (error) {
        console.log(error);
    }
}

export const removeOneFromCart = async (id: string, colType: string, size: string) => {
    try {
        const productRef = doc(db, colType, id);
        const data = {
            [`sizes.${size}`]: increment(1),
            [`inCart.${size}`]: increment(-1)
        }
        await updateDoc(productRef, data);
    } catch (error) {
        console.log(error);
    }
}

// Delete all items from cart and revert to initial
export const removeProductFromCart = async (id: string, colType: string, size: string, amount: number) => {
    try {
        const productRef = doc(db, colType, id);
        const data = {
            [`sizes.${size}`]: increment(amount),
            [`inCart.${size}`]: increment(-amount)
        }
        await updateDoc(productRef, data);
    } catch (error) {
        console.log(error);
    }
}
