const jsonUrl = 'natty.json';
let allPosts = [];
let posts = [];
let currentIndex = 0;
const postsContainer = document.getElementById('posts');
const seeMoreButton = document.getElementById('seeMoreButton');



window.onload = async function() {
    await fetchPosts();
    displayPosts();
    handleSearch();
    setupBannerRotation();
};

async function fetchPosts() {
    const response = await fetch(jsonUrl);
    allPosts = await response.json();
    posts = allPosts;
}

function displayPosts() {
  const postBatch = posts.slice(currentIndex, currentIndex + 21);


  // If there are embeds, display them first
  if (postsWithEmbed.length > 0) {
    postsWithEmbed.forEach(post => {
      const embedElement = createEmbedElement(post.embed);
      postsContainer.appendChild(embedElement);
    });
  },


    
  postBatch.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    postDiv.appendChild(postTitle);

    const postImage = document.createElement('img');
    postImage.src = post.image;
    postImage.addEventListener('click', () => {
      window.location.href = post.link;
    });
    postDiv.appendChild(postImage);

    postsContainer.appendChild(postDiv);
  });

  currentIndex += 14;
  checkSeeMoreButton();
}

function checkSeeMoreButton() {
  if (currentIndex >= posts.length) {
    seeMoreButton.style.display = 'none';
  } else {
    seeMoreButton.style.display = 'block';
  }
}

seeMoreButton.onclick = function() {
  // Don't empty the container, just append new posts
  displayPosts();
};

function handleSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchBar = document.getElementById('search');

    searchButton.onclick = function() {
        const query = searchBar.value.toLowerCase();
        postsContainer.innerHTML = '';
        currentIndex = 0;

        if (query) {
            posts = allPosts.filter(post => post.title.toLowerCase().includes(query));
        } else {
            posts = allPosts;
        }

        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>No results found.</p>';
            seeMoreButton.style.display = 'none';
        } else {
            displayPosts();
        }
    };

    searchBar.oninput = function() {
        if (searchBar.value === '') {
            posts = allPosts;
            currentIndex = 0;
            postsContainer.innerHTML = '';
            displayPosts();
        }
    };
}



function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
////
function checkSeeMoreButton1() {
  if (currentIndex >= posts.length) {
    seeMoreButton1.style.display = 'none';
  } else {
    seeMoreButton1.style.display = 'block';
  }
}

seeMoreButton1.onclick = function() {
  // Don't empty the container, just append new posts
  displayPosts();
};


function handleSearch() {
    const searchButton1 = document.getElementById('searchButton1');
    const searchBar1 = document.getElementById('search1');

    searchButton1.onclick = function() {
        const query = searchBar1.value.toLowerCase();
        postsContainer.innerHTML = '';
        currentIndex = 0;

        if (query) {
            posts = allPosts.filter(post => post.title.toLowerCase().includes(query));
        } else {
            posts = allPosts;
        }

        if (posts.length === 0) {
            postsContainer1.innerHTML = '<p>No results found.</p>';
            seeMoreButton1.style.display = 'none';
        } else {
            displayPosts();
        }
    };

    searchBar1.oninput = function() {
        if (searchBar1.value === '') {
            posts = allPosts;
            currentIndex = 0;
            postsContainer.innerHTML = '';
            displayPosts();
        }
    };
}



