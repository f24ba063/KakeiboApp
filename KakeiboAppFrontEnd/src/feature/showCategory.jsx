export default function showCategory(categories, inOut) {
    return (
        
        categories
            .filter(e => (inOut === "IN"
            ?   e.inOut === "IN"
            :   e.inOut ==="OUT" 
            ))
            .map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.category}
                </option>
            ))    
    )
}