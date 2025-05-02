import express from "express";
import mongoose from "mongoose";
import productsModel from "../Products/products.model";


/* export const inventoryReport =async (db) => {
    const products = await db.collection('products')
    .find()
    .toArray()

    let totalStock = 0
    let inventory = 0

    products.array.forEach(product => {
        totalStock += product.amount
        inventory += product.amount * product.//precio
    });
    //return
} */