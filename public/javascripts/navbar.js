const profileBtn = document.getElementById("user-menu-button");
const mobileMenuBtnOpen = document.getElementById('mobile-menu-btn-open');
const mobileMenuBtnClose = document.getElementById('mobile-menu-btn-close');


profileBtn.addEventListener("click", toggleProfileMenu);
mobileMenuBtnOpen.addEventListener("click", openMobileMenu);
mobileMenuBtnClose.addEventListener("click", coloseMobileMenu);


function openMobileMenu(){
    console.log("toggle open menu")
    mobileMenuBtnOpen.classList.toggle("block")
    mobileMenuBtnOpen.classList.toggle("hidden")
    mobileMenuBtnClose.classList.toggle("block")
    mobileMenuBtnClose.classList.toggle("hidden")
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("block")
    mobileMenu.classList.toggle("hidden")
}


function coloseMobileMenu(){
    console.log("toggle close menu")
    mobileMenuBtnClose.classList.toggle("block")
    mobileMenuBtnClose.classList.toggle("hidden")
    mobileMenuBtnOpen.classList.toggle("block")
    mobileMenuBtnOpen.classList.toggle("hidden")
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("block")
    mobileMenu.classList.toggle("hidden")
}

function toggleProfileMenu() {
    const profileMenu =  document.getElementById("profile-menu");
    profileMenu.classList.toggle("hidden");
    profileMenu.classList.toggle("block");
}

