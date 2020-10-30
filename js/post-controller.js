'use strict';
console.log('controller')


function init(){
    creatPosts();
    renderAllPosts();
}



function renderAllPosts() {
    var posts = getPosts();  
    let strHTML = posts.map((currentPost, index, array) => {
        //console.log(currentpost)
        const contentHtml = currentPost.content.map(content => {
            return `<p>${content}</p>`
        }).join('');
        
        return `<article class="article flex flex-space-between align-items-strech">
                    <img class="article-img img" src="img/${currentPost.img}.png"/>    
                    <div class="article-content flex flex-direction-column flex-space-between flex-align-start">
                        <h6>${currentPost.date}</h6>
                        <h2>${currentPost.title}</h2>
                        ${contentHtml}                 
                        <a class="btn-article align-self-start readBtn" onclick="onReadPost('${currentPost.id}')">Continue Reading</a>
                        <a class="btn-article align-self-start deleteBtn" onclick="onDeletePost('${currentPost.id}')">Delete Post</a>
                        <a class="btn-article align-self-start upadteBtn" onclick="onUpdateToggle('${currentPost.id}')">Edit Post</a>
                    </div>
                </article>`;
       
    })
    document.querySelector('main').innerHTML = strHTML.join('');
    return strHTML;

}

function renderPostModalRead(post) { 
    let currentPost = post; // no globals from the service 
    const contentHtml = getParagraph(currentPost.id);
    //console.log('currentPost', currentPost);

    document.querySelector('.readmore-modal .article .article-img').src = "img/"+currentPost.img+".png";
    document.querySelector('.readmore-modal .article h6').innerHTML = currentPost.date;
    document.querySelector('.readmore-modal .article h2').innerHTML = currentPost.title;
    document.querySelector('.readmore-modal .article p').innerHTML = contentHtml;    
}

function renderPostModalUpdate(post) {
    let currentPost = post;
    const contentHtml = getParagraphText(currentPost.id);
    let images = setImages();
    //console.log(currentPost);

    document.querySelector('.update-modal .images').innerHTML = images;
    document.querySelector('.update-modal .article .article-img').src = "img/"+currentPost.img+".png";
    document.querySelector('.update-modal .article .article-img').dataset.src = currentPost.img;
    document.querySelector('.update-modal .article h6').innerHTML = currentPost.date;
    document.querySelector('.update-modal .article .input-h2').value = currentPost.title;
    document.querySelector('.update-modal .article .input-p').value = contentHtml;   
    document.querySelector('.update-modal .article a').dataset.postid = currentPost.id;   
    
}

function onPrevPage() {
    prevPage();
    renderAllPosts();
}

function onNextPage() {
    nextPage();
    renderAllPosts();
}

function onSort(filterBy) {
    console.log(filterBy);
    sortByString(gPosts,filterBy)
    renderAllPosts();
}

function selectImage(image){
    let el = document.querySelector('.update-img')
    var imageName = getFileName(image); 

    el.src=`img/${image}`;
    el.dataset.src = `${imageName}`
}

function setImages(){
   let images = getImages();
   let strHTML = images.map((currentImage, index, array) => {
        
        return `<img src="img/${currentImage}" onclick="selectImage('${currentImage}')">`
    })
   return strHTML.join('');
}

function onUpdataPost(postId,title,content,image){
    //console.log('update',postId, title,content,image)
    updatePosts(postId,title,content ,image)
    toggleUpdate();
    renderAllPosts();
}

function onUpdateToggle(postId) {  
    var post = getPost(postId);
    renderPostModalUpdate(post)  
    toggleUpdate();
}

function onDeletePost(postId) { 
    if (!confirm('Delete Post...?')) return 
    deletePost(postId); 
    renderAllPosts();
}

function onReadPost(postId) {  
    var post = getPost(postId);
    renderPostModalRead(post); 
    toggleReadMore();
}

//document.querySelector('.logoin').style.display = 'none';

function onAdminLogin(userName, userPass){
    console.log(userName, userPass)
    if(!userName==="admin" & !userPass ==="admin") return;
    toggleAdmin();
    toggleAdminActions();
    toggleLoginLi()
}

function onAdminLogout(){
    toggleAdminActions()
    toggleLoginLi()
}

function toggleLoginLi(){
    document.body.classList.toggle('show-logout');
}

function toggleAdminActions(){
    document.body.classList.toggle('admin-actions');
}

function toggleAdmin(){
    document.body.classList.toggle('admin-open');
}

function toggleReadMore() {
    document.body.classList.toggle('read-more-open');
    console.log('read-more')
}

function toggleUpdate() {
    document.body.classList.toggle('update-open');
    console.log('update-open')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    console.log('open menu')
}

function toggleDropDown(){
    document.body.classList.toggle('drop-down-open'); 
}    
