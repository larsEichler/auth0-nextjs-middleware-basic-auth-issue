export async function getProducts() {
    const response = await fetch('https://dummyjson.com/products', {
        cache: 'force-cache'
    })
    .then(res => res.json())
    .catch(console.error);
    
    return response;
}