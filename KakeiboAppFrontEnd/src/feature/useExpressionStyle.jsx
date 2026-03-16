import { useState, useEffect } from "react";

export default function useExpressionStyle() {
    const [expressionStyle, setExpressionStyle] = useState("card");

    useEffect(() => {
        const saved = localStorage.getItem("expressionStyle");
        if (saved) setExpressionStyle(saved);
    }, []);

    const changeStyle = () => {
        const next = expressionStyle === "card" ? "list" : "card";
        setExpressionStyle(next);
        localStorage.setItem("expressionStyle", next);
    };

    return { expressionStyle, changeStyle };
}