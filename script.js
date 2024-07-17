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
  const postBatch = posts.slice(currentIndex, currentIndex + 12);
  postBatch.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    postDiv.appendChild(postTitle);

    const postImage = document.createElement('img');
    postImage.classList.add('lazy'); // Add a class for lazy loading

    // Set a placeholder image (optional)
    postImage.style.backgroundImage = 'url(placeholder.jpg)';

    // Store the actual image URL in a data attribute
    postImage.dataset.src = post.image;

    // Set image alt text (optional)
    postImage.alt = post.alt || 'Photo';

    postDiv.appendChild(postImage);
    postsContainer.appendChild(postDiv);
  });

  currentIndex += 12;
  checkSeeMoreButton();
  loadImages(); // Call the loadImages function after appending posts
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

// Function to handle lazy loading
function loadImages() {
  const lazyImages = document.querySelectorAll('.lazy');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.remove('lazy'); // Remove lazy class after loading
        observer.unobserve(entry.target); // Unobserve after loading
      }
    });
  });

  lazyImages.forEach(image => observer.observe(image));
}

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
