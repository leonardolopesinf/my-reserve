const nomeEmpresa = document.getElementById("name")
const emailEmpresa = document.getElementById("email")
const cnpjEmpresa = document.getElementById("cnpj")
const firstTelefoneEmpresa = document.getElementById("telefone_um")
const secondeTelefoneEmpresa = document.getElementById("telefone_dois")
const categoriaEmpresa = document.getElementById("categoia")
const horaDe = document.getElementById("hora_de")
const horaAte = document.getElementById("hora_ate")

const cepEmpresa = document.getElementById("cep")
const cidadeEmpresa = document.getElementById("localidade")
const ufEmpresa = document.getElementById("uf")
const bairroEmpresa = document.getElementById("bairro")
const logradouroEmpresa = document.getElementById("logradouro")
const numeroEmpresa = document.getElementById("numero")

const fieldSetDados = document.getElementById("fieldset-dados")
const catPeople = document.querySelector(".group-categ-people")

const btnSubmit = document.getElementById("submit-estab")

function mostrar(e) {
  var tipo = e.parentNode.querySelector("[name='senha']");
  if (tipo.type == "password") {
    tipo.type = "text";
  } else {
    tipo.type = "password";
  }

  tipo.type = tipo.type; //aplica o tipo que ficou no primeiro campo

  if (e.classList.contains("glyphicon-eye-close")) { //se tem olho fechado
    e.classList.remove("glyphicon-eye-close"); //remove classe olho fechado
    e.classList.add("glyphicon-eye-open"); //coloca classe olho aberto
  } else {
    e.classList.remove("glyphicon-eye-open"); //remove classe olho aberto
    e.classList.add("glyphicon-eye-close"); //coloca classe olho fechado
  }
}

// localização por CEP - start
const cep = document.querySelector("#cep")

const showData = (result) => {
  for (const campo in result) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = result[campo]
    }
  }
}

cep.addEventListener("blur", (e) => {
  let search = cep.value.replace("-", "")
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }

  fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then(response => {
      response.json()
        .then(data => showData(data))
    })
    .catch(e => console.log('Deu Erro: ' + e, message))
})
// localização por CEP - end

//Busca categorias na API
window.addEventListener("load", (event) => {
  fetch("http://localhost:8080/categoria")
    .then(res => res.json())
    .then(categorias => {
      const fieldConteiner = document.createElement("div")
      const categoriaLabel = document.createElement("label")
      const selectCategoria = document.createElement("select")

      fieldConteiner.setAttribute("class", "field")
      categoriaLabel.setAttribute("for", "categoria")
      categoriaLabel.textContent = "Categoria:"

      selectCategoria.setAttribute("name", "categoria")
      selectCategoria.setAttribute("id", "categoria-option")

      categorias.forEach(categoria => {
        const options = document.createElement("option")

        options.setAttribute("value", categoria.id_categoria)
        options.textContent = categoria.tipo_categoria

        selectCategoria.appendChild(options)
      })

      fieldConteiner.appendChild(categoriaLabel)
      fieldConteiner.appendChild(selectCategoria)

      catPeople.appendChild(fieldConteiner)
      //fieldSetDados.appendChild(fieldConteiner)

    })
    .catch(err => console.log(err))
})
//------------------------------------

//Envio do cadastro do Estabelecimento p/ a API
btnSubmit.addEventListener("click", (e) => {
  let optionCategoria = document.getElementById("categoria-option")

  let nome = nomeEmpresa.value
  let email = emailEmpresa.value
  let cnpj = cnpjEmpresa.value
  let firstTel = firstTelefoneEmpresa.value
  let secondTel = secondeTelefoneEmpresa.value
  let categoria = optionCategoria.value
  let cep = cepEmpresa.value
  let cidade = cidadeEmpresa.value
  let bairro = bairroEmpresa.value
  let logradouro = logradouroEmpresa.value
  let numero = numeroEmpresa.value
  let horaStart = verificaAmOrPm(horaDe.value)
  let horaFinish = verificaAmOrPm(horaAte.value)
  let horaFunciona = `${horaStart} às ${horaFinish}`

  console.log(horaFunciona)

  let bodyDados = {
    nome: nome,
    email: email,

  }
})
//-------------------------------------------------------------

function verificaAmOrPm(hora) {
  if (hora.substr(0, 2) < 12) {
    hora += "am"
  } else {
    hora += "pm"
  }
  return hora
}