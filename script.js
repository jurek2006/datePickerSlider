( function() {
    let currEl = 0;
    // select elements
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const contBox = document.querySelector('.contBox');

    // set event listeners 
    btnNext.addEventListener('click', () => moveElementLeft() );
    btnPrev.addEventListener('click', () => moveElementRight() );

    const moveElementLeft = () => {
        currEl++;
        moveElement();
    }

    const moveElementRight = () => {
        currEl--;
        moveElement();
    }

    const moveElement = () => {
        const translation = currEl * 102;
        contBox.style.transform = `translateX(-${translation}px)`;
        console.log(translation);
    }
})();
