 // Conversor de Pesos a dolar,euro,libra y reales //

 const cotizador = document.getElementById("cotizador");
cotizador.addEventListener("click", conversorDeMoneda);

function conversorDeMoneda() {

  const valor = parseInt(document.getElementById("valor").value);
  const radios = document.getElementsByName("cambio");

  const tasasDeCambio = {

    euro: 203,
    dolar: 187,
    real: 36.5,
    libra: 207,
  };

  let resultado = 0;

  for (const radio of radios) {

    if (radio.checked) {

      const tasa = tasasDeCambio[radio.id];
      
      resultado = valor / tasa;
      document.getElementById("resultado").value = resultado;
      localStorage.setItem(radio.id.charAt(0).toUpperCase() + radio.id.slice(1), resultado);

      return;
    } 
  } 

}


//  FILTRADO DE DIVISAS Y SUS VALORES //

const monedas = Array.from(document.querySelectorAll("#tablaMonedas tr"));

let inputBuscarMoneda = document.getElementById("moneda");

inputBuscarMoneda.addEventListener("input", () =>{

  // value del input
  let monedaABuscar = inputBuscarMoneda.value.toLowerCase();
  
  // filter de la tabla de monedas
  const filterMonedas = monedas.filter((moneda) => {
    return moneda.textContent.toLowerCase().includes(monedaABuscar);
  });

  // Mostrar solo las monedas filtradas
  monedas.forEach((moneda) => {

    if (filterMonedas.includes(moneda)) {
      moneda.style.display = "table-row";

    } else {
      moneda.style.display = "none";
    }

  });

});

// Obtener valor de Divisas dependiendo su base//

document.getElementById("boton").addEventListener("click", obtenerTasa);

function obtenerTasa() {

    var baseSeleccionada = document.getElementById("base").value;
    var url = "https://api.apilayer.com/exchangerates_data/latest?symbols=gbp%2Ceur%2Cusd%2Cjpy%2Ccad" + "&base=" + baseSeleccionada;
    
    var myHeaders = new Headers();
    myHeaders.append("apikey", "UYL5wKOxSLvMIZFWm7nWT7lZZPZoiNlm");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}



