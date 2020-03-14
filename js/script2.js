// coded by Mohd Danish (https://twitter.com/mddanishyusuf)
var endpoint = `https://v1.nocodeapi.com/fajarsiddiq/dribbble/oFJJDHzwtaPFsCkF`
var listElm = document.querySelector('.shots');
var scrolling = true
var page = 1
var perPage = 9

var loadMore = function() {
    fetch(`${endpoint}/shots?page=${page}&per_page=${perPage}`)
        .then((res) => res.json())
        .then((data) => {
            const shots = data

            if(shots.length === 0){
                scrolling = false
            }else{
                scrolling = true
            }

            // Put things in right spots of markup
            let output = '';
            shots.forEach((item, key) => {
                var list = document.createElement('li');
                list.className = 'group';

                if(key % 3 === 0){
                        list.className = 'layout-grid';

                }

                list.innerHTML = `
                <li id="screenshot-${item.id}" class="group">
                    <div class="dribbble">
                        <div class="dribbble-shot">
                            <div class="dribbble-img" id="${item.id}" name="${item.id}" onclick="openModal(this)">
                                    <img alt="${item.title}" src="${item.images.two_x === undefined ? item.images.one_x : item.images.two_x}">
                            </div>
                        </div>
                        <div class="overlay" name="${item.id}" onclick="closeModal(this)" id="overlay${item.id}">
                        <div class="modal-close-btn" name="${item.id}"  id="overlay${item.id}" onclick="closeModal(this)">X</div></div>
                        
                        <div class="modal" id="modal${item.id}">
                            <div class="detail-card">
                                <div class="image">
                                 <img alt="DMarket Landing page" src="${item.images.two_x === undefined ? item.images.one_x : item.images.two_x}">
                                </div>
                                <div class="meta-data">
                                    <h2 class="title">${item.title}</h2>
                                    <div class="description">${item.description !== null ? item.description : ''}</div>
                                </div>
                                <div class="visit-dribbble"><a href="${item.html_url}" target="_blank">Visit on Dribbble</a></div>
                            </div>
                        </div>
                    </div>
                </li>`

                var listElm = document.querySelector('.shots');
                listElm.appendChild(list);
            })
            // document.querySelector('.shots').innerHTML = output
        })
}
// Initially load some items.

window.onscroll = function(ev) {
    if (scrolling && (window.innerHeight + window.scrollY ) >= document.body.offsetHeight - 100) {
        // you're at the bottom of the page
        page = page + 1;
        scrolling = false
        loadMore();
    }
};

loadMore();

fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
        const profile = data

        console.log(profile)

        document.getElementsByClassName('dribbbleName')[0].innerHTML = profile.name
        document.getElementsByClassName('dribbbleNameFooter')[0].innerHTML = profile.name
        document.getElementsByClassName('dribbbleBio')[0].innerHTML = profile.bio
        document.getElementsByClassName('profile-location')[0].innerHTML = profile.location
        
        document.getElementById("profilePic").src = profile.avatar_url
        document.getElementById("profilePic").alt = profile.name

        // Put things in right spots of markup
        let output = '';
        const linksObj = profile.links
        Object.keys(linksObj).forEach((key) => {
            output += `
            <li id="contact">
                <a class="elsewhere-contact" target="_blank" rel="tipsy" title="Connect with ${profile.name} on ${key}" href="${linksObj[key]}">
                    <i class="fa fa-${key}"></i>
                </a>
            </li>
            `
        })
        document.querySelector('.social-link').innerHTML = output
    })

var getCurrentMode = function(){
    var body = document.getElementById("body");
    var currentClass = body.className;
    const localMode = localStorage.getItem("mode");
    if(localMode !== undefined){
        currentClass = localMode
    }else{
        currentClass = mode
    }
}

document.addEventListener("DOMContentLoaded", getCurrentMode);

var openModal = function(event) {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
    const id = document.getElementById(event.id).getAttribute('name')
    document.getElementById(`overlay${id}`).classList.add('is-visible');
    document.getElementById(`modal${id}`).classList.add('is-visible');
}

var closeModal = function(event) {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes"; 
    const id = document.getElementById(event.id).getAttribute('name')
    document.getElementById(`overlay${id}`).classList.remove('is-visible');
    document.getElementById(`modal${id}`).classList.remove('is-visible');
}

var toggleDarkLight = function() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    var setThisMode = currentClass == "dark" ? "light" : "dark";
    body.className = setThisMode
    localStorage.setItem("mode", setThisMode);
}