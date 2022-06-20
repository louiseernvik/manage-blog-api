window.onload = function() {
    fetchAllPosts();
}

async function fetchAllPosts() {
    try{
        let response = await fetch("http://localhost:5000/posts");
        let data = await response.json();
    
        let postsHTML = "";
        let postTags = "";
    
        for (let post of data){
            if (post.tags === null || post.tags.length == 0) {
                postTags = "None";
            } else {
                postTags = post.tags.join(", ");
            }

            postsHTML += `<tr> 
                            <td> ${post.title} </td> 
                            <td> ${post.author} </td> 
                            <td> ${post.date.replace("T", " ").slice(0, 16)} </td>  
                            <td> ${postTags}</td> 
                            <td> 
                                <div class="manage-post" >
                                    <a href="update-post.html?id=${post._id}"> Update </a>
                                    <a href="#" data-id= ${post._id}> Delete </a>
                                </div>
                            </td>
                        </tr>`
        }
    
        document.querySelector("#posts-table tbody").innerHTML = postsHTML;
    
        let deleteLinks = document.querySelectorAll(".manage-post a:last-child");
        for (let link of deleteLinks) {
            link.addEventListener("click", deletePost);
        }
        
    } catch(err) {
        console.log(err);
    }
}

async function deletePost(e){
    e.preventDefault();
    const clickedLink = e.target;
    try {
        await fetch("http://localhost:5000/posts/"+ e.target.dataset.id, {method: "DELETE"});
        clickedLink.parentNode.parentNode.parentNode.remove();

    } catch (err){
        console.log(err);
    }
}

