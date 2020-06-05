function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( resp => resp.json() )
    .then( states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    const stateIndex = event.target.selectedIndex
    stateInput.value = event.target.options[stateIndex].text
    citySelect.innerHTML = `<option value="0">Selecione a cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then( resp => resp.json() )
    .then( cities => {
            for (const city of cities) {
                    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

populateUFs()
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// grid de itens

let collectedItems = document.querySelector(".items-grid input[name=selected-items]")
let selectedItems = []

function randomSelected(event) {
    const selectedItem = event.target
    const selectedItemID = selectedItem.dataset.id
    
    
    if (selectedItem.classList.contains("selected")) {
        var index = selectedItems.indexOf(selectedItemID)
        selectedItems.splice(index, 1)
    }
    else {
        selectedItems.push(selectedItemID)
    }
    
    selectedItem.classList.toggle("selected")
    collectedItems.value = selectedItems
}


const itemsToCollect = document.querySelectorAll(".items-grid li")
for (let item of itemsToCollect) {
    item.addEventListener("click", randomSelected)
}
