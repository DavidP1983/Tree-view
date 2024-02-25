"use strict";

// Здесь нужно не просто поработать с UI, но подумать как распределить данные, и как это сделать оптимизированее

class Tree {

    constructor(parent) {
        this.parent = document.querySelector(parent);
    }

    //Create Node Tree
    createTree(data) {

        const arr = [];
        data.forEach((item, i) => {
            switch (item.head) {
                case null:
                    const mainHeadElms = document.createElement('li');
                    mainHeadElms.setAttribute("id", i);
                    item.node === 0 ? mainHeadElms.textContent += `${item.name} ${item.price ? item.price : ''}` :
                        mainHeadElms.innerHTML +=
                        `<span class="caret">${item.name} ${item.price ? item.price : ''}</span>
                        <ul class="nested">
                        </ul>`;
                    this.parent.append(mainHeadElms);
                    break;
                case 2:
                    document.querySelector('[id = "1"] ul').innerHTML += `
                    <li id=${i}><span class="caret">${item.name} ${item.price ? item.price : ''}</span>
                        <ul class="nested subcaret">

                        </ul>
                    </li>
                    `;
                    break;
                case 3:
                    arr.push(item);
                    document.querySelector('[id = "2"] ul').innerHTML += `
                        <li id=${i} data-head=${item.sorthead}>${item.name} ${item.price ? item.price : ''}</li>
                    `;
                    break;
                case 8:
                    document.querySelector('[id = "7"] ul').innerHTML += `
                            <li id=${i} data-head=${item.sorthead}>${item.name} ${item.price ? item.price : ''}</li>
                       `;
                    break;
                default:
                    throw new Error();
            }
        });
        getAttribut(document.querySelectorAll('.caret'));
        sortArr(arr);

    }

}


function compare(a, b) {
    if (a.dataset.head < b.dataset.head) {
        return -1;
    }
    if (a.dataset.head > b.dataset.head) {
        return 1;
    }
    return 0;
}


function sortArr() {
    const node = document.querySelectorAll('[id = "2"] [data-head]');
    const transformNode = Array.from(node);
    let transformedNode = transformNode.sort(compare);
    transformedNode.forEach((elem) => {
        document.querySelector('.wrapper [id = "2"] ul').appendChild(elem);

    });
}


// Request
const getRequestData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};


function showService() {

    const message = {
        loading: 'spinner/loading.svg',
        failure: 'Samething went wrong'
    };

    const statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.classList.add('spinner');
    document.body.append(statusMessage);


    getRequestData("http://localhost:3000/services")
        .then((data) => {
            new Tree('.wrapper').createTree(data);
            document.body.style.backgroundColor = 'white';
            statusMessage.remove();
        }).catch((e) => {
            statusMessage.remove();
            showTErrorMessage(message.failure);
        });

}

showService();

// Error message
function showTErrorMessage(message) {
    const errorMessage = document.createElement('div');
    errorMessage.style.cssText =
        `position: absolute; 
         margin: 0 px auto;
         height: 100%;
         width: 100%;
         left: 0;
         top: 0;`;
    errorMessage.innerHTML = `
    <span class="error">${message}</span>`;
    document.body.style.cssText = "background-color: rgba(0,0,0, 0.5);";
    document.body.append(errorMessage);
}


//Click Caret
// const toggler = document.querySelector(".caret");

function openTab(i, e, toggler) {
    toggler[i].classList.toggle("caret-down");
    e.target.nextElementSibling.style.maxHeight = document.querySelector('.accordion-body').scrollHeight + "px";
}

function closeTab(i, e, toggler) {
    toggler[i].classList.toggle("caret-down");
    e.target.nextElementSibling.style.maxHeight = 0 + 'px';
}

function getAttribut(toggler) {
    toggler.forEach((item, i) => {
        toggler[i].addEventListener("click", (e) => {
            if (e.target === item && !e.target.classList.contains('caret-down')) {
                openTab(i, e, toggler);
            } else {
                closeTab(i, e, toggler);
            }
        });
    });
}




