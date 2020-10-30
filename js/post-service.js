'use strict';
console.log('service')


let gPosts = []
const STORAGE_POSTS_KEY = 'postsDB'
const PAGE_SIZE = 3;
let gPageIdx = 0;
var gImages = ["img001.png","img002.png","img003.png", "img004.png"]


function getImages(){
    return gImages
}

function updatePosts(postId,title,content,image){
    const postIndex = getPostIdx(postId);
    let post =  gPosts[postIndex];
    
    post.title = title;
    post.content = ceateParagraph(content);
    post.img = image;
    _savePostsToStorage()
}


function deletePost(postId) {
    const postIndex = getPostIdx(postId);
    gPosts.splice(postIndex, 1)
    _savePostsToStorage()
}

function getParagraph(postId){
    const postIndex = getPostIdx(postId);
    const post = gPosts[postIndex]
    const content = post.content

    const contentHtml = content.map(content => {
        return `<p>${content}</p>`
    }).join('');
    return contentHtml;
}

function getParagraphText(postId){
    const postIndex = getPostIdx(postId);
    const post = gPosts[postIndex]
    const content = post.content
    
    const contentHtml = content.map(content => {
        return `${content}`
    }).join('');
    return contentHtml;
}

function getPost(postId){
    const postIndex = getPostIdx(postId);
    let post =  gPosts[postIndex];
    return post;
}

function getPostById(postId) {
    return gPosts.find(post => postId === post.id);
}

function getPostIdx(postId) {
    var postIndex = gPosts.findIndex(function (post) {
        return postId === post.id
    })
    return postIndex
}

function ceateParagraph(content){
    let paragraphs = stringSplit(content);
    return paragraphs
}


function prevPage() {
    gPageIdx--;
    console.log(gPageIdx)
    if (gPageIdx * PAGE_SIZE < 0) gPageIdx = 0;
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gPosts.length) gPageIdx = 0;
}

function getPosts() {
    var fromIdx = gPageIdx * PAGE_SIZE;  
    return gPosts.slice(fromIdx, fromIdx + PAGE_SIZE)
   
}

function getBooks() {
    var fromIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(fromIdx, fromIdx + PAGE_SIZE)
}

//console.log(gPosts.slice(fromIdx, fromIdx + PAGE_SIZE))
function creatPosts(){
    _createPosts()
    _savePostsToStorage();
}

function _createPosts() {
    let posts = loadFromStorage(STORAGE_POSTS_KEY)
    if (!posts || !posts.length) {
        console.log('create posts')
        posts = []
            let postA = _createPost( `Hello World C` , 'img001', ceateParagraph(makeLorem(22)) );
            let postB = _createPost( `Hello World a` , 'img002', ceateParagraph(makeLorem(22)) );
            let postC = _createPost( `Hello World B` , 'img003', ceateParagraph(makeLorem(22)) );
            let postD = _createPost( `Hello World 1` , 'img002', ceateParagraph(makeLorem(22)) );
            //console.log('create posts',postA)
            posts.push(postA,postB,postC,postD)
    }
    gPosts = posts;
    console.log('posts', gPosts)
}

function _createPost(title,img,content) {
    return {
        id:makeId(4),
        title,
        img,
        content,
        date:getDateAndTime(),
    }
}

function _savePostsToStorage() { // save to.....
    saveToStorage(STORAGE_POSTS_KEY, gPosts)
}
