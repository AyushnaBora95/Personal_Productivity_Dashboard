// LOAD BOOKMARKS FROM LOCAL STORAGE
document.addEventListener("DOMContentLoaded", loadBookmarks);

function addBookmark() {
    let url = document.getElementById("bookmarkURL").value.trim();
    let name = document.getElementById("bookmarkName").value.trim();

    if (!url) return alert("Please enter a URL.");

    // Auto-add https if missing
    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    // Default label is domain name
    if (!name) {
        name = new URL(url).hostname.replace("www.", "");
    }

    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;

    const bookmark = {
        url: url,
        name: name,
        icon: favicon
    };

    saveBookmark(bookmark);
    displayBookmark(bookmark);
    clearInputs();
}

function saveBookmark(bookmark) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks.forEach(displayBookmark);
}

function displayBookmark(bookmark) {
    const container = document.getElementById("bookmarkContainer");

    const div = document.createElement("div");
    div.className = "bookmark-item";

    div.innerHTML = `
        <a href="${bookmark.url}" target="_blank">
            <div class="bookmark-circle">
                <img src="${bookmark.icon}" alt="icon" onerror="this.src='assets/default-icon.png'">
            </div>
        </a>

        <div class="bookmark-name">${bookmark.name}</div>

        <div class="bookmark-rename" onclick="renameBookmark('${bookmark.url}')">Rename</div>
        <div class="bookmark-delete" onclick="deleteBookmark('${bookmark.url}')">Delete</div>
    `;

    container.appendChild(div);
}

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks = bookmarks.filter(b => b.url !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    location.reload();
}

function renameBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let newName = prompt("Enter new name:");
    if (!newName) return;

    bookmarks = bookmarks.map(b => {
        if (b.url === url) b.name = newName;
        return b;
    });

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    location.reload();
}

function clearInputs() {
    document.getElementById("bookmarkURL").value = "";
    document.getElementById("bookmarkName").value = "";
}
