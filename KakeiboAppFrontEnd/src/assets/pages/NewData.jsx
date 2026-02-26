
import { useState } from 'react'
export default function NewData() {
    const [formData, setFormData] = useState({
        name: '',
        email:''
    });

    function handleSubmit(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <>
            <h2>新しい情報</h2>
            <div>
                <p>入力値：{name}</p>
                <form onSubmit={handleSubmit}>
                    <p>フォーム準備中</p>
                </form>
            </div>
        </>
    )
}