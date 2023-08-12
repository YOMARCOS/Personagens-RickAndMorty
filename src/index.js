const pageSize = 20; // Quantidade de personagens por página
let page = 1;

async function runApi() {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const characters = response.data.results;

    const personDiv = document.querySelector(".roll");
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

      const personDiv = document.querySelector(".roll"); // Captura o elemento
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


function createCharacter(person, container) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const image = document.createElement("img");
  image.src = person.image;
  cardDiv.appendChild(image);

  const dados = document.createElement("div");
  dados.classList.add("dados");

  const name = document.createElement("h2");
  name.innerHTML = person.name;
  dados.appendChild(name);

  const status = document.createElement("p");
  status.innerHTML = `status: ${person.status}`;
  dados.appendChild(status);

  const species = document.createElement("p");
  species.innerHTML = `espécie: ${person.species}`;
  dados.appendChild(species);

  cardDiv.appendChild(dados);
  container.appendChild(cardDiv);
}


runApi();
