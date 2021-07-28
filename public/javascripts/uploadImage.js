const fileTempl = document.getElementById("file-template"),
  imageTempl = document.getElementById("image-template"),
  empty = document.getElementById("empty");

// use to store pre selected files
let FILES = {};

// check if file is of type image and prepend the initialied
// template to the target element
function addFile(target, file) {
  const isImage = file.type.match("image.*"),
    objectURL = URL.createObjectURL(file);

  const clone = isImage
    ? imageTempl.content.cloneNode(true)
    : fileTempl.content.cloneNode(true);

  clone.querySelector("h1").textContent = file.name;
  clone.querySelector("li").id = objectURL;
  clone.querySelector(".size").textContent =
    file.size > 1024
      ? file.size > 1048576
        ? Math.round(file.size / 1048576) + "mb"
        : Math.round(file.size / 1024) + "kb"
      : file.size + "b";

  isImage &&
    Object.assign(clone.querySelector("img"), {
      src: objectURL,
      alt: file.name,
    });

  empty.classList.add("hidden");
  target.prepend(clone);

  FILES[objectURL] = file;
}

const gallery = document.getElementById("gallery");

// click the hidden input of type file if the visible button is clicked
// and capture the selected files
const hidden = document.getElementById("hidden-input");
const selectButton = document.getElementById("select-image-button");
if(selectButton){
    selectButton.onclick = (e) => {
        e.preventDefault();
        hidden.click();
    }
}
if(hidden){
    hidden.onchange = (e) => {
        for (const file of e.target.files) {
          addFile(gallery, file);
        }
      };
}


// use to check if a file is being dragged
const hasFiles = ({ dataTransfer: { types = [] } }) =>
  types.indexOf("Files") > -1;

let counter = 0;

// clear entire selection
const clearButton = document.getElementById("clear-button");
if(clearButton){
    clearButton.onclick = (e) => {
        e.preventDefault();
        while (gallery.children.length > 0) {
          gallery.lastChild.remove();
        }
        FILES = {};
        empty.classList.remove("hidden");
        gallery.append(empty);
        hidden.value = "";
        const title = (document.getElementById("title").value = "");
        const location = (document.getElementById("location").value = "");
        const description = (document.getElementById("description").value = "");
      };
      
}
