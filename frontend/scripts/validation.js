const dataSpanError = document.getElementById("dataSpanError");
const smallDogsSpanError = document.getElementById("smallDogsSpanError");
const largeDogsSpanError = document.getElementById("largeDogsSpanError");



function validateInsertPetShop(distance, smallWeek, largeWeek, smallWeekend, largeWeekend){

    // não ter distância negativa
    if(distance < 0){
        return false;
    }

    // não ter preço negativo
    if(smallWeek < 0 || largeWeek < 0 || smallWeekend < 0 || largeWeekend < 0){
        return false;
    }

    return true;
}