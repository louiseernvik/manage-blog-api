const blogPosts = document.getElementById('blog-posts');

window.onload = function() {
    fetchAllPosts();
}

async function fetchAllPosts() {
    try {

        const response = await fetch('http://localhost:5000/posts');
        const posts = await response.json();

        console.log(posts)

        let html = '';
        let postTags = '';
        let postContent = '';

        for(let post of posts) {
            
            if (post.tags === null || post.tags.length === 0) {
                postTags = "None";
            } else {
                postTags = post.tags.join(", ");
            }

            if (post.content.length > 100) {
                postContent = post.content.substring(0, 100) + '... <a href="post.html?id=' + post._id + '">läs mer</a>'
            } else {
                postContent = post.content;
            }

            html += `
            <li class="list-group-item">
            <h2>${post.title}</h2>
            <i>${post.author} | ${post.date}</i>
            <p><b>tags: </b>${postTags}</p>
            <p>${postContent}</p>

            </li>
            `


        }

        blogPosts.innerHTML = html;
        
    } catch(error) {
        console.log(error);
    }
}
