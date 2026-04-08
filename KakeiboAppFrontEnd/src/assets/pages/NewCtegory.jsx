import { useState } from 'react';

export default function NewCategory() {
    const [newCategory, setNewCategory] = useState("");
    const [inOut, setInOut] = useState("IN");

    const insertNewCategory = async function (category, inOut) {
        try {
            const newCat = await fetch(`http://localhost:8080/category/${category}/${inOut}`);
            return newCat;
        } catch (err) {
            return err;
        }
    }
}