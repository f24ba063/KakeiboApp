export default function showCategory(categories, inOut) {
    return (
        
        categories
            .filter(e => (inOut
            ?   e.id <= 10
            :   e.id > 10   
            ))
            .map(cat => (
                <option key={cat.id} value={cat.id}>
                    {cat.category}
                </option>
            ))    
    )
}