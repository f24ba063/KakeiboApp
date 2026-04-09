import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../hooks/useAuthFetch';

export default function NewCategory() {
    const [newCategory, setNewCategory] = useState("");
    const [inOut, setInOut] = useState("IN");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const authFetch = useAuthFetch();

    const isTooLong = newCategory.length > 20;

    const insertNewCategory = async function (category, inOut) {

        try {
            const res = await authFetch(`http://localhost:8080/category`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, inOut })
            });
            console.log(res);
            const s = await res.json();
            console.log(s);
            setMessage(s.message || "登録成功");
        } catch (err) {
            console.log("エラー内容：" + err);
        }
    }

    return (
        <>
            <h2>新しいカテゴリーの登録</h2>
            <form onSubmit={e => {
                e.preventDefault();
                insertNewCategory(newCategory, inOut)
            }}>
                <span>
                    <label>カテゴリー名：</label>
                    <input type="text" value={newCategory}
                        onChange={e => {
                            setNewCategory(e.target.value);
                        }} />
                </span>
                <p>カテゴリー名は２０文字以下です</p>

                <select
                    value={inOut}
                    onChange={e => setInOut(e.target.value)}>
                    <option value="IN">収入</option>
                    <option value="OUT">支出</option>
                </select>

                <button type="submit">カテゴリ作成</button>
                <h4 style={{color:"red"} }>{isTooLong ? "カテゴリー名が長すぎます。登録できません" : ""}</h4>
            </form>
            <button onClick={() => navigate("/home")}>
                ホーム画面へ
            </button>
        </>
    )
    
}