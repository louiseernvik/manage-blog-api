window.onload = function() {
    fetchSpecificPost()
}

const URL = window.location.search;
const urlParams = new URLSearchParams(URL);

async function fetchSpecificPost() {
    try {
        const response = await fetch("http://localhost:5000/posts/" +  urlParams.get('id'));
        const data = await response.json();
    
        document.getElementById("content").innerHTML = `<h2>${data.title}</h2>
                                                        <i>${data.author} | ${data.date}</i>
                                                        <p><b>tags: </b>${data.tags}</p>
                                                        <p>${data.content}</p>`
    } 
    catch(err) {
        console.error(err)
    }
}