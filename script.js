( function() {
    let numElementsVis = 3; //ilość widocznych elementów
    let currEl = 0;


    // select elements
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const btnPlus = document.querySelector('.btn-plus');
    const btnMinus = document.querySelector('.btn-minus');
    const contBox = document.querySelector('.contBox');
    const elBoxes = contBox.children;

    // set event listeners 
    btnNext.addEventListener('click', () => moveElementLeft() );
    btnPrev.addEventListener('click', () => moveElementRight() );
    btnPlus.addEventListener('click', () => expandSlider(numElementsVis + 1) );
    

    const showElements = (firstElInd, numOfElem) => {
        let elBoxesArr = [...elBoxes];

        // ukrycie wszystkich elementów (nie najbardziej efektywne - poprawić)
        for(let i = 0; i < elBoxesArr.length; i++){
            elBoxesArr[i].style.display = "none";  
        }

        for(let i = firstElInd; i < firstElInd + numOfElem; i++ ){
            elBoxesArr[i].style.display = "block";      
        }
    }

    // na początku wszystkie elementy są ukryte
    // więc trzeba odkryć numElementsVis (czyli zadane np. 3) elementów [od currEl]:
    showElements(currEl, numElementsVis);

    

// number of all elements
    const countAllEl = () => elBoxes.length;

    const moveElementLeft = () => showElements(++currEl, numElementsVis);

    const moveElementRight = () => showElements(--currEl, numElementsVis);

    const expandSlider = numOfElem => {
        numElementsVis = numOfElem;
        showElements(currEl, numElementsVis);
    }
})();


