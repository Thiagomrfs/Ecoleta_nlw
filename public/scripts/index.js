function showModal() {
    let pageModal = document.querySelector("#modal")
    pageModal.classList.remove("hide")
}

function hideModal() {
    let pageModal = document.querySelector("#modal")
    pageModal.classList.add("hide")
}

document.querySelector("main a").addEventListener("click", showModal)
document.querySelector("#modal header a").addEventListener("click", hideModal)
