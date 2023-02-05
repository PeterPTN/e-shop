import { collection, addDoc, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../config/firebase-config.js';
import type { ProductItems, ProductsArray } from "../lib/types.js";

// CRUD

// CREATE (POST)
/*
export const addMovie = async (movieData) => {
    // Cleaning up the data before sending it to the DB
    const { title, year, imgUrl } = movieData;

    // We can add extra field after grabbing the movieData from the form

    const newMovie = { title, releaseYear: year, imgUrl, watchCount: 0 };

    // Accessing The collection Reference
    const collectionRef = collection(db, "movies");
    const newDoc = await addDoc(collectionRef, newMovie);
    return newDoc;
};
*/

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
        const cleanProduct = productSnapshot.data();
        return cleanProduct as ProductItems;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const setFavouriteProduct = async (id: string, colType: string, favValue: boolean) => {
    try {
        const productRef = doc(db, colType, id)
        const data = { favourite: !favValue };
        updateDoc(productRef, data);
    } catch (error){
        console.log(error);
    }
}

// UPDATE (PUT, PATCH)

// DELETE (DELETE)
