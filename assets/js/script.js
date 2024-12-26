const personalPhotoContent = document.querySelector("[for=personalPhoto] div");
const personalPhoto = document.querySelector("[for=personalPhoto] img");
const fileInput = document.querySelector("#personalPhoto");
const inputFileAlert = document.querySelector(".inputFileAlert");
const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const githubName = document.querySelector("#githubName");
const inputEmailAlert = document.querySelector(".inputEmailAlert");
const form = document.querySelector("form");

const clearFileInputValue = (event) => {
  event.preventDefault();
  fileInput.value = "";
  personalPhoto.src = "./assets/images/icon-upload.svg";
  personalPhoto.alt = "Upload icon";
  personalPhotoContent.innerHTML = "Drag and drop or click to upload";
};

const changeImage = (event) => {
  event.preventDefault();
  fileInput.click();
};

if (fileInput) {
  fileInput.addEventListener("input", (e) => {
    const file = e.target.files[0];
    const size = 500 * 1024;

    if (e.target.value !== "" && file.size <= size) {
      personalPhoto.src = URL.createObjectURL(file);
      personalPhoto.alt = "file icon";
      personalPhoto.style = "border-radius:10px";
    }

    if (file.size > size) {
      inputFileAlert.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
// <path stroke="darkred" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"/>
// <path fill="red" d="M8.004 10.462V7.596ZM8 5.57v-.042Z"/>
// <path stroke="darkred" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042"/></svg>
File too large. Please upload a photo under 500KB.`;
      inputFileAlert.style.color = "darkred";
      clearFileInputValue();
    } else {
      inputFileAlert.innerHTML = ` <img src="./assets/images/icon-info.svg" alt="Info icon" />
            Upload Avatar Upload your photo (JPG or PNG, max size: 500KB).`;
      inputFileAlert.style.color = "var(--gray)";
    }

    personalPhotoContent.innerHTML = `
  <button onclick="clearFileInputValue(event)">Remove image</button>
  <button onclick="changeImage(event)">Change image</button>
`;
  });
}

if (emailInput) {
  emailInput.addEventListener("input", (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail || email == "") {
      inputEmailAlert.style.display = "none";
    } else {
      inputEmailAlert.style.display = "flex";
    }
  });
}
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem("img", e.target.result);
      };
      reader.readAsDataURL(file);
    }
    const queryString = `name=${encodeURIComponent(
      nameInput.value
    )}&email=${encodeURIComponent(emailInput.value)}&githubName=${
      githubName.value
    }`;
    window.location.href = `ticket.html?${queryString}`;
  });
}
/* ---------------------ticket----------------------- */

const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

document.querySelectorAll(".full-name").forEach((input) => {
  input.innerHTML = getQueryParam("name");
});

document.querySelectorAll(".email-address").forEach((input) => {
  input.innerHTML = getQueryParam("email");
});
if (document.querySelector(".ticket-img"))
  document.querySelector(".ticket-img").src = localStorage.getItem("img");
