const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"), // moneda base
toCurrency = document.querySelector(".to select"),// moneda que queremos obtener
getButton = document.querySelector("form button"); //boton con la funcionalidad de obtener el resultado de la conversion


// funcion qque contiene el evento para obtener el resultado de la conversion
getButton.addEventListener("click", e =>{
    e.preventDefault(); //IMPEDIR que el formulario se envíe// 
    getExchangeRate();
});

//codigo que permite intercambiar la moneda/pais como base ej.(usd/ars => ars/usd)
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})
//funcion para obtener el valor 
function getExchangeRate(){

    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    //esto sirve para impedir que el usuario ingrese "0",entonces se obtenga por default "1"//
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1"; 
        amountVal = 1;
    }
    //API del valor de la moneda de cada pais//
    exchangeRateTxt.innerText = "Obteniendo valor del intercambio...";
    let url = `https://v6.exchangerate-api.com/v6/ae7d65cd30407aeb61d3175b/latest/${fromCurrency.value}`;

    //obteniendo la respuesta de la API y devolviéndola con el análisis en js obj y en otro el método que recibe ese obj
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Algo ha fallado...";
    });
}


//este codigo hace la animacion de "obteniendo el valor del intercambio"
window.addEventListener("load", ()=>{
    getExchangeRate();
});

// Lo que hace este codigo es mostrar el listado de divisas//
for (let i = 0; i < dropList.length; i++) {

    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

//funcion para obtener las banderas del pais dependiendo la moneda elegida//
function loadFlag(element){

    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}