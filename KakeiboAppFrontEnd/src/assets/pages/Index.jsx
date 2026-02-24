

export default function Index() {
    fetch('http://localhost:8080/index')
        .then(res => res.json())
        .then(tada)
    return (
        <>
            <h1>おはよう</h1>
        </>
    )
}