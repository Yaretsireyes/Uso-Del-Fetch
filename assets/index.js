let divcontainer = document.querySelector(".container")
const selectTypes = document.querySelector("#typeOptions")
const TodasEspecies = document.querySelector("#TodasEspecies")
const CargarPokemones = (selectValue) => {
    const pokemones = fetch("https://pokeapi.co/api/v2/pokemon")
    let pokes = []
    let habilidadesText = ""
    let columnas = ""
    let contador = 0
    let filas = ""
    pokemones
        .then((response) => response.json())
        .then((data) => {
            pokes = data.results
            pokes.forEach(pokemon => {
                let habilidades = fetch(pokemon.url)
                habilidades.then((respuesta) => respuesta.json())
                    .then((miniData) => {

                        let abilities = miniData.abilities
                        abilities.forEach((item) => {
                            habilidadesText += ", " + item.ability.name
                        })
                        habilidadesText = habilidadesText.slice(1, habilidadesText.length - 2)
                        contador = contador + 1

                        if (miniData.types.find((item) => item.type.name == selectValue) || selectValue == undefined) {

                            columnas += `
                                <div style="width: 18rem">
                                     <div style="width: 17rem; height: 18rem" class="card d-flex align-items-center">
                                          <p class="NombrePokemon"> ${pokemon.name}</p>
                                            <img style="width: 140px; height: 100px;" src="${miniData.sprites.other.dream_world.front_default}"><img/>
                                            <img style="width: 40px;" src="${miniData.sprites.versions["generation-v"]["black-white"].animated.front_default}"><img/>
                                           <p style="height: 10px;" class="HabilidadesPokemon">Habilidades: ${habilidadesText}</p>
                                           <a class="mt-4 linkPoke" href="${pokemon.url}">Detalles</a>
                                    </div>
                                </div>`
                        }

                        if (contador == pokes.length && columnas != "") {
                            filas = `
                        
                            <div class="row">
                                ${columnas}
                            </div>`
                            divcontainer.replaceChildren("")
                            divcontainer.insertAdjacentHTML("afterbegin", filas)
                        }
                        else if (contador == 20 && columnas == "") {
                            divcontainer.replaceChildren("")
                            columnas = "<div class='col-12'><p class='TextDato'>NO HAY ESPECIES</p> </div>"
                            divcontainer.insertAdjacentHTML("afterbegin", columnas)
                        }
                        habilidadesText = ""
                    })
            });
        })
        .catch((error) => console.log(error))
}
//logica para obtener todas las especies
const types = fetch("https://pokeapi.co/api/v2/type/")


types.then((response) => response.json())
    .then((data) => {
        let tipos = data.results
        tipos.forEach(typePokes => {
            selectTypes.insertAdjacentHTML("afterbegin", `<option value="${typePokes.name}">${typePokes.name}</option>`)
        })
    })

//logica para obtener el valor de las especies
selectTypes.addEventListener("change", (e) => {
    if (e.target.value == "RecargarEspecies") {
        CargarPokemones()
    } else {
        CargarPokemones(e.target.value)
    }

})
CargarPokemones()

