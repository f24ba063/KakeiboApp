import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthFetch } from '../../hooks/useAuthFetch';

export default function NewCategory() {
    const [newCategory, setNewCategory] = useState("");
    const [inOut, setInOut] = useState("IN");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const authFetch = useAuthFetch();
    const [error, setError] = useState("");

    const isTooLong = newCategory.length > 20;
    const isTooShort = newCategory.length === 20;

    const insertNewCategory = async function (category, inOut) {

        try {
            const res = await authFetch(`http://localhost:8080/category`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, inOut })
            });
            const s = await res.json();
            setMessage(s.message || "登録成功");
        } catch (err) {
            console.log("エラー内容：" + err);
        }
    }

    return (
        <>
            <h2>新しいカテゴリーの登録</h2>
            <form onSubmit={async e => {
                e.preventDefault();
                try {
                    await insertNewCategory(newCategory, inOut);
                    if (newCategory.length === 0 || newCategory.length > 20) {
                        throw error;
                    }
                    await navigate("/home", {
                        state: {message :"新しいカテゴリーの登録が完了しました"}
                    });
                } catch (e) {
                    setError("新しいカテゴリーの登録に失敗しました：" + e);
                }
                
            }}>
                <span>
                    <label>カテゴリー名：</label>
                    <input type="text" value={newCategory}
                        onChange={e => {
                            setNewCategory(e.target.value);
                            e.target.value.trim().length > 20  ? setError("カテゴリー名が長すぎます") :
                            e.target.value.trim().length === 0 ? setError("カテゴリー名を入力してください") :
                            setError("") 
                        } } />
                </span>
                <p>カテゴリー名は1文字以上20文字以下です</p>

                <select
                    value={inOut}
                    onChange={e => setInOut(e.target.value)}>
                    <option value="IN">収入</option>
                    <option value="OUT">支出</option>
                </select>

                <button type="submit">カテゴリ作成</button>
            </form>
            <button onClick={() => navigate("/home")}>
                ホーム画面へ
            </button>
            {error && <h3>{error}</h3>}
        </>
    )
    
}