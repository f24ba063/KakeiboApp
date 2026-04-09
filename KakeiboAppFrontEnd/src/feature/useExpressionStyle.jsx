import { useState, useEffect } from "react";

export default function useExpressionStyle() {
    const [expressionStyle, setExpressionStyle] = useState("list");

    useEffect(() => {
        const saved = localStorage.getItem("expressionStyle");
        if (saved) setExpressionStyle(saved);
    }, []);

    const changeStyle = () => {
        const next = expressionStyle === "card" ? "list" : "card";
        setExpressionStyle(next);
        try {
            localStorage.setItem("expressionStyle", next);
        } catch (err) {
            console.log("収支表示スタイルの保存に失敗しました:", err);
        };
    }
        return { expressionStyle, changeStyle };
}