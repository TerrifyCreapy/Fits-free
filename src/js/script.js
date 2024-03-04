const max_sauce_count = 10;
const sauce_price = 60;
const default_price = 220;

const state = [];
let totalCount = 0;

const saucesButtons = document.querySelectorAll(".action__button");
const sauceFree = document.querySelector(".sauces__title_free");
const saucePrice = document.querySelectorAll(".sauces__price");
const resultPrice = document.querySelector(".sauces__result_price");



function changeSauces(totalCount, price, free) { //Change result price, 0 or 1 free sauce and price of sauces.
    if(totalCount <= 1) { //Here we change when totalCount 0/1. The other variants aren't need.
        free.innerText = `${totalCount}/1 за 0₽`;
        Array.from(price).forEach(e => {
            e.innerText = `+${totalCount?60:0} ₽`;
        })
    }

    const total = totalCount === 0? 0: totalCount - 1;

    resultPrice.innerText = `${default_price + total * sauce_price} ₽`
    

}

function makeDisabled(button) {
    button.classList.add("disabled");  //Need this class, because we use color style in css and disabled doesn't work on styles. But this style help us to avoid extra triggers of button
    button.disabled = true;
}

function makeAble(button) {
    button.classList.remove("disabled");
    button.disabled = false;
}


window.onload = () => {
    if(!saucesButtons) return; //if we doesn't have any sauces.
    
    for(let i = 0; i < saucesButtons.length; i+=2) {

        /* 
        
          We have objects in format 
          {
            id: 0,
            changeEl: *node* , the node is count of chosen sauces. We need this, because
            value: 0
          }


        */
        state.push({
            id: state.length?state[state.length-1].id+1:0, 
            changeEl: saucesButtons[i].nextElementSibling, //There are is value in DOM
            value: 0,
        });
        makeDisabled(saucesButtons[i]); //We make decrease buttons disabled because we could not take sauces less than 0.
    }

    for(let i = 1; i < saucesButtons.length; i+=2) {
        saucesButtons[i].onclick = (event) => { 
            const index = Math.floor(i/2);
            const elem = state[index];
            changeStateButtonOnClick(elem, saucePrice, sauceFree, true);

            makeAble(saucesButtons[i-1]);
            if(totalCount === 10) {
                for(let i = 1; i < saucesButtons.length; i+=2) {
                    makeDisabled(saucesButtons[i]);
                }
            }
        }
    }

    for(let i = 0; i < saucesButtons.length; i+=2) {
        saucesButtons[i].onclick = (event) => {
            const index = Math.floor(i/2);
            const elem = state[index];
            changeStateButtonOnClick(elem, saucePrice, sauceFree, false);

            for(let i = 1; i < saucesButtons.length; i+=2) {
                makeAble(saucesButtons[i]);
            }
            if(elem.value === 0) {
                makeDisabled(saucesButtons[i]);
            }

        }
    }
}

function changeStateButtonOnClick(element, saucePrice, sauceFree, isIncrease) {
    
    if(isIncrease) {
        element.value += 1;
        totalCount+=1;
    }
    else {
        element.value -= 1;
        totalCount -= 1;
    }
    
    element.changeEl.innerText = element.value;
    changeSauces(totalCount, saucePrice, sauceFree);
}
