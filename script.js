// moduł pickera daty
let datePickerSlider = ( function() {
    
    /*  // ---- PRZYKŁAD - MODULE PATTERN -------
        // 
        // let my = {}, 
        //     privateVar = 0; //pole prywatne
        // // metoda prywatna
        // function privateMethod() {
        //     // ...
        // }
        
        // // metoda publiczna
        // my.test = function(){
        //     console.log('testowo ' + privateVar);
        // };
    
        // //metoda publiczna
        // my.add = n => privateVar += n;

        // return my;
    */  // // -------------------------------------- 
    
    let self = {}; //element główny, taki 'this' dla modułu

    // ----------------------------- pola prywatne
    let numElementsVis = 3; //ilość widocznych elementów
    let currEl = 0; //aktualny element - pierwszy (po lewej)

    // select elements
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    const btnPlus = document.querySelector('.btn-plus');
    const btnMinus = document.querySelector('.btn-minus');
    const contBox = document.querySelector('.contBox');
    const elBoxes = contBox.children;

    // set event listeners 
    btnNext.addEventListener('click', () => moveElementNext() );
    btnPrev.addEventListener('click', () => moveElementPrev() );
    // btnPlus.addEventListener('click', () => expandSlider(numElementsVis + 1) );

    // ------------------------------ metody prywatne

    // funkcja wyświetlająca elementy w sliderze
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

    const moveElementNext = () => showElements(++currEl, numElementsVis);
    
    const moveElementPrev = () => showElements(--currEl, numElementsVis);

    
    // const setSizes = (){

    // }

    //------------------------------- metody publiczne

    // funkcja inicjalizująca datepicker
    self.init = () => {
        showElements(currEl, numElementsVis);
    }

    // ------------------------------------------------------------------
    // zwracamy element główny
    return self;

}());
    
datePickerSlider.init();
    