var adding_operation = true;
var bookmark_index;
var bookmarks = [];
var site_name = document.getElementById("site-name");
var site_url = document.getElementById("site-url");
var table_body = document.getElementsByTagName("tbody");
var bookmark_submit = document.getElementsByClassName("bookmark_submit");
var name_error = document.getElementById("nameError");
var url_error = document.getElementById("urlError");
var site_name_regex = /^[A-Z][a-z0-9]{3,10}$/;
var site_url_regex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
var valid_name, valid_url;

// DISPLAY ON-LOAD
(function () {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    reviewBookmarks(bookmarks);
  }
})();

// CHECK CASE ==> CREATE OR UPDATE
// can you help me optmaize the code here
function submitForm() {
  if (!validateSiteName() || !validateSiteUrl()) {
    if (!valid_name) {
      displayError(name_error, 0);
      site_name.classList.add("is-invalid");
    } else {
      displayError(name_error, 1);
      site_name.classList.replace("is-invalid", "is-valid");
    }
    if (!valid_url) {
      displayError(url_error, 0);
      site_url.classList.add("is-invalid");
    } else {
      displayError(url_error, 1);
      site_url.classList.replace("is-invalid", "is-valid");
    }
  } else {
    displayError(url_error, 1);
    displayError(name_error, 1);
    var bookmark = {
      siteName: site_name.value,
      siteUrl: site_url.value,
    };
    if (adding_operation) {
      createBookmark(bookmark);
    } else {
      updateBookmark(bookmark);
    }
  }
}

// CREATE-BOOKMARK
function createBookmark(bookmark) {
  var repeated = false;
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].siteName === bookmark.siteName) {
      repeated = true;
    }
  }
  if (repeated == true) {
    alert("this name was repeated , please write another one");
    clearForm();
  } else {
    bookmarks.push(bookmark);
    reviewBookmarks();
    setLocalStorage();
    clearForm();
  }
}

// UPDATE-BOOKMARK
function updateBookmark(bookmark) {
  bookmarks[bookmark_index] = bookmark;
  reviewBookmarks();
  setLocalStorage();
  clearForm();
}

// REVIEW-Bookmarks
function reviewBookmarks() {
  var rows = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var row = `
       <tr> 
       <td>${i + 1}</td>
       <td>${bookmarks[i].siteName}</td>
       <td><a href="${bookmarks[i].siteUrl}">${bookmarks[i].siteUrl}</td>
       <td>
       <button class="btn" onclick="displayBookmarkDetails(${i})"><i class="fa-solid fa-pen-to-square text-success"></i></button>
       <button class="btn" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can text-danger"></i></button>
       </td>
       </tr>`;
    rows += row;
  }

  table_body[0].innerHTML = rows;
}

// DELETE-BOOKMARK
function deleteBookmark(boorkmark_index) {
  bookmarks.splice(boorkmark_index, 1);
  setLocalStorage();
  reviewBookmarks(bookmarks);
}

// DISPLAY-BOOKMARK-DETAILS
function displayBookmarkDetails(index) {
  adding_operation = false;
  bookmark_index = index;
  site_name.value = bookmarks[index].siteName;
  site_url.value = bookmarks[index].siteUrl;
  bookmark_submit[0].classList.add("btn-success");
  bookmark_submit[0].innerText = "update";
}

//ADDING-LOCALSTORAGE
function setLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// CLEAR-FORM AFTER ADDING
function clearForm() {
  site_name.value = "";
  site_url.value = "";
}

//VALIDATE SITE-NAME
function validateSiteName() {
  valid_name = site_name_regex.test(site_name.value);
  return valid_name;
}

//VALIDATE SITE-URL
function validateSiteUrl() {
  valid_url = site_url_regex.test(site_url.value);
  return valid_url;
}

//DISPLAY-ERROR
function displayError(error_label, flag) {
  if (flag == 0) {
    error_label.classList.replace("d-none", "d-block");
  } else {
    error_label.classList.replace("d-block", "d-none");
  }
}
