const pageSize = 20; // Quantidade de personagens por página
let page = 1;

async function runApi() {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const characters = response.data.results;

    const personDiv = document.getElementById("personDiv");
    personDiv.innerHTML = ""; // Limpa o conteúdo anterior

    const pageAtual = document.getElementById("Atual");
    pageAtual.textContent = `Página ${page} `;

    if (page > 1 && page < 42) {
      const paginnation = document.getElementById("paginnation");
      let voltar = document.getElementById("voltar");

      if (!voltar) {
        voltar = document.createElement("button");
        voltar.setAttribute("id", "voltar");
        voltar.setAttribute("onclick", "voltar()");
        voltar.textContent = "Voltar";
        voltar.setAttribute("class", "btn-group bg-btn-br p-1");
        paginnation.prepend(voltar);
      }
    }

    if (page === 1) {
      const voltar = document.getElementById("voltar");
      if (voltar) {
        voltar.remove();
      }
    }

    for (let i = 0; i < characters.length; i++) {
      const character = characters[i];
      createCharacter(character, personDiv);
    }

  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
}

async function searchByName() {
  const searchInput = document.getElementById("searchInput").value; // Captura o valor do campo de busca
  if (searchInput) {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchInput}`);// Captura o valor do campo de busca
      const characters = response.data.results;

      const personDiv = document.getElementById("personDiv"); // Captura o elemento
      personDiv.innerHTML = ""; // Limpa o conteúdo anterior

      for (let i = 0; i < characters.length; i++) { // Percorre os personagens
        const character = characters[i];
        createCharacter(character, personDiv);
      }

    } catch (error) {
      console.error("Ocorreu um erro:", error);
    }
  } else {
    runApi(); // Se o campo de busca estiver vazio, mostra todos os personagens
  }
}

function nextPage() {
  page++;
  runApi();
}

function voltar() {
  if (page > 1) {
    page--;
    runApi();
  }
}

function createCharacter(person) {
  if(person.status === "Alive") {
    person.status += " 💗";
  } if(person.status === "Dead") {
    person.status += " 💀";
  }if(person.status === "unknown") {
   person.status += " ❓ ";
  }
  if(person.species === "Alien") {
    person.species += " 👽";
  } if(person.species === "Human") {
    person.species += " 🌎";
  }

const id= person.id

const personDiv = document.getElementById("personDiv");

personDiv.innerHTML += `

<div class="col-sm-12 col-md-6 col-lg-3 mt-5 d-flex justify-content-center">

    <div class="card bg-btn-br text-white shadow-lg  mb-5"   style="width: 18rem;" data-bs-toggle="modal"    data-bs-target="#staticBackdrop" onclick="openModal(${id})">

    <img src="${person.image}" class="card-img-top img-fluid"  alt="...">
    <div class="card-body  ">
    <h5 class="card-title text-white ">${person.name} </h5>
    <h6 class="card-subtitle  text-white">status: ${person.status} </h6>
    <p class="card-text text-white">espécie: ${person.species}</p>
</div>
</div>
</div>
`

}
runApi();


async function openModal(id){
  const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  const character = response.data;  
 const modalContent = document.getElementById("modal-content");
if(character.status === "Alive") {
  character.status += " 🟢";
} if(character.status === "Dead") {
  character.status += " 💀";
}if(character.status === "unknown") {
   character.status += " ❓ ";
}
if(character.species === "Alien") {
  character.species += " 👽";
} if(character.species === "Human") {
  character.species += " 🌎";
}
 modalContent.innerHTML = `
 <div class="modal-body ">
                    <img src="${character.image}" alt="" class="img-fluid rounded-circle">
                    <div class="text-center">
                    <h1 class="text-white">${character.name}</h1>
                    <h6 class="text-white">${character.status}</h6>
                    <h6 class="text-white"> ${character.species}</h6>
                    <h6 class="text-white">${character.gender}</h6>
                    <h6 class="text-white">${character.origin.name}</h6>
                    <h6 class="text-white">${character.location.name}</h6>
                    </div>
                </div>`


}