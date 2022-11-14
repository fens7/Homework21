const input = document.querySelector('.input--js');
const showPostBtn = document.querySelector('.showPostBtn');
const postContainer = document.querySelector('.post-container');
const commentsContainer = document.querySelector('.comments-container');

function getPost() {
    showPostBtn.addEventListener('click', async() => {
        const inputValue = input.value;
        const response = await fetch(`https://jsonplaceholder.typicode.com/postseq/${inputValue}qeeqeq`)
        const data = await response.json()
            if (data.id) {
                postContainer.innerHTML = `
                <div class="post-id">Id: ${data.id}</div>
                <div class="user-id">User id: ${data.userId}</div>
                <div class="post-title">Title: ${data.title}</div>
                <div class="post-body">Body: ${data.body}</div>      
            `;
                getComments();
            } else {
                input.style.borderColor = 'red';
                postContainer.innerHTML = '';
                commentsContainer.innerHTML = '';
                input.value = '';
            }
        input.style.borderColor = '';
    });
}
getPost();

function getComments() {
    const inputValue = input.value;
    postContainer.innerHTML += `<button class="showComments">Show comments</button>`;
    let showCommentsBtn = postContainer.querySelector('.showComments');
    showCommentsBtn.addEventListener('click', async() => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${inputValue}/comments`)
        const data = await response.json()
            const dataArr = [...data];
            dataArr.forEach((comment) => {
                commentsContainer.innerHTML += `
                <div class="comment-post-id">Post id: ${comment.postId}</div>
                <div class="comment-id">Id: ${comment.id}</div>
                <div class="comment-name">Name: ${comment.name}</div>
                <div class="comment-email">Email: ${comment.email}</div>
                <div class="comment-body">Body: ${comment.body}</div>
                <div>----------------------------------------------------------</div>
            `;
            });

    });
    input.value = '';
    commentsContainer.innerHTML = '';
}