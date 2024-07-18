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
  setupBannerRotation(); // Assuming this function exists for banner rotation
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
    postImage.src = post.image;
    postImage.addEventListener('click', () => {
      window.location.href = post.link;
    });
    postDiv.appendChild(postImage);

    postsContainer.appendChild(postDiv);
  });

  currentIndex += 12;
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
    postsContainer.innerHTML = ''; // Clear container for new results
    currentIndex = 0;

    if (query) {
      posts = allPosts.filter(post => {
        const lowerCaseTitle = post.title.toLowerCase();
        const levenshteinDistance = calculateLevenshteinDistance(query, lowerCaseTitle);

        return levenshteinDistance <= 1; // Adjust threshold for acceptable misspelling distance
      });
    } else {
      posts = allPosts;
    }

    if (posts.length === 0) {
      postsContainer.innerHTML = '<p>No results found. Did you mean "' + getClosestMatch(query) + '"?</p>'; // Suggest closest match
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

// Function to calculate Levenshtein distance (edit distance) between two strings
function calculateLevenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = [];

  // Initialize DP table
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  // Base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 
