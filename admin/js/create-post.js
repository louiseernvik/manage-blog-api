window.onload = function(){}

const form = document.getElementById('create-post-form');
form.addEventListener('submit', async function(e){
    e.preventDefault();

    const selected = [];
    for (let option of document.getElementById('tags').options){
        if (option.selected){
            selected.push(option.value);
        }
        console.log(option);
    }
    
    const formData = new FormData(e.target)
    const JSONString = {
        title: formData.get('title'),
        author: formData.get('author'),
        content: formData.get('content'),
        tags: selected
    };

    console.log(JSON.stringify(JSONString));

    try{
        const response = await fetch('http://localhost:5000/posts',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(JSONString),
        })

        if (!response.ok){
            throw new Error('Something went wrong with the API')
        }

        window.location.replace('index.html') //lägger till när jag är klar!

    } catch(error){
        console.log(error);
    }
});