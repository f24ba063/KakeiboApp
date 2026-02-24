
import { useState } from 'react';
import { useEffect } from 'react';

export default function Index() {
    const [KakeiboDto, setKakeiboDto] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/index')
            .then(res => res.json())
            .then(data => setKakeiboDto(data))
    }, []);
    return (
        <>
            <h1>おはよう</h1>
            {KakeiboDto.map((e => (
                <p key={e.id}>{e.id}</p>
            )))}
        </>
    );
}