( function() {
    const numElementsVis = 3; //ilość widocznych elementów
    let currEl = 0;


    // select elements
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const contBox = document.querySelector('.contBox');
    const elBoxes = document.querySelectorAll('.elBox');

    // set event listeners 
    btnNext.addEventListener('click', () => moveElementLeft() );
    btnPrev.addEventListener('click', () => moveElementRight() );

    // number of all elements
    const countAllEl = () => elBoxes.length;

    // indeks ostatniego aktualnie widocznego elementu
    const lastVisElement = () => currEl + numElementsVis;

    const moveElementLeft = () => {
        if(lastVisElement() < countAllEl()){
        // dopóki nie jest widoczny po prawej ostatni element - możliwe jest przesunięcie w prawo
            currEl++;
            moveElement();
        }
    }

    const moveElementRight = () => {
        if(currEl>0){
        // dopóki nie jest widoczny po prawej ostatni element - możliwe jest przesunięcie w prawo 
            currEl--;
            moveElement();
        }
    }

    const moveElement = () => {
        const translation = currEl * 102;
        contBox.style.transform = `translateX(-${translation}px)`;
        // console.log(translation);
    }
})();
