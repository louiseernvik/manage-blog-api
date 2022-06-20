window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var selected = '';
    fetchPost(urlParams);
    updatePost(urlParams);
}

async function fetchPost(urlParams) {
    console.log(window.location.search);
    console.log(urlParams.get('id'));

    try {
        const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`);
        const post = await response.json();
        console.log(post);
        document.getElementById('title').value = post.title;
        document.getElementById('author').value = post.author;
        document.getElementById('content').innerText = post.content;
        fetchTags(post);
        }
    catch(error) {
        console.log(error);
    }
}

function updatePost(urlParams) {
    const form = document.getElementById('update-post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        updateTagSelections();
        
        const formData = new FormData(e.target);
        const JSONString = {
            title: formData.get('title'),
            author: formData.get('author'),
            content: formData.get('content'),
            tags: selected
        }
        console.log(formData);
        console.log(JSON.stringify(JSONString));

        try {
            const response = await fetch(`http://localhost:5000/posts/${urlParams.get('id')}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONString),
            })
            if(!response.ok) {
                throw new Error('Something went wrong with the API')
            }
        } catch(error) {
            console.log(error);
        }
    })
}

function updateTagSelections() {
    selected = [];
        for (var option of document.getElementById('tags').options) {
            
            if (option.selected) {
                selected.push(option.value);
            }
        }
    return selected;
}

function fetchTags (post) {
    for(tag of post.tags) {
        console.log(tag);
        for (var option of document.getElementById('tags').options) {
        
            if (tag == option.value) {
                option.selected = 'selected';
            }
        }
    }
}