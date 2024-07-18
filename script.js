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
  const postBatch = posts.slice(currentIndex, currentIndex + 20);
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

  currentIndex += 15;
  checkSeeMoreButton();
}
function insertAd(container) {
  const adDiv = document.createElement('div');
  adDiv.className = 'ad'; // Add CSS class for styling

  // **Security Considerations:**
  // - Consider using a Content Security Policy (CSP) to restrict script execution from third-party sources.
  // - Evaluate if the provided ad script comes from a trusted source.
  // - Explore alternative ad networks or self-host the ad code if security is paramount.

  // **Best Practices for Ad Placement:**
  // - Choose ad formats and placements that don't disrupt user experience.
  // - Adhere to any guidelines provided by the ad network you're using.

  // **Place your trusted ad script here:**
  adDiv.innerHTML = `
    <script type="text/javascript">
      atOptions = {
        'key' : '94e546547f0c1d04bcc33be261ff8357',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    </script>
    <script type="text/javascript" src="//constellationbedriddenexams.com/94e546547f0c1d04bcc33be261ff8357/invoke.js"></script>
  `;

  container.appendChild(adDiv);
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




