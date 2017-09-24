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
    let numElementsVis = 4; //ilość widocznych elementów
    let currEl = 0; //aktualny element - pierwszy (po lewej)

    // select elements
    const btnPrev = document.querySelector('.btn--prev');
    const btnNext = document.querySelector('.btn--next');
    const btnPlus = document.querySelector('.btn--plus');
    const btnMinus = document.querySelector('.btn--minus');
    const contBox = document.querySelector('.contBox');
    const elBoxes = contBox.children;
    let elBoxesArr = [...elBoxes];
    const activatedSection = document.querySelector('section.activated');
    

    // ------------------------------ metody prywatne

    // funkcja wyświetlająca elementy w sliderze
    const showElements = firstElInd => {

        // sprawdzenie, czy można pokazać podane elementy
        // (czy nie jesteśmy poza zakresem)
        if( firstElInd >= 0 && firstElInd + numElementsVis <= elBoxesArr.length){

            // ukrycie wszystkich elementów (nie najbardziej efektywne - poprawić)
            for(let i = 0; i < elBoxesArr.length; i++){
                elBoxesArr[i].style.display = "none";  
            }

            // wyświetlenie elementów
            for(let i = firstElInd; i < firstElInd + numElementsVis; i++ ){
                elBoxesArr[i].style.display = "block";      
            }
        } else {
            console.log(`datePickerSlider.showElements - nie można wyświetlić elementów z zakresu ${firstElInd} - ${firstElInd + numElementsVis} bo elementy w elBoxesArr są tylko od 0 do ${elBoxesArr.length}`);
        }
    }

    // funkcja przesuwająca element na sliderze o zadaną ilość miejsc (np. 1, -1)
    const moveElement = moveDef => {
        // moveDef - określa przesunięcie - ilość miejsc i kierunek

        // !! Dodać przesunięcie "do końca" - jeśli elementów niewidocznych jest mniej niż krok

        // sprawdzenie czy jest możliwe przesunięcie (czy elementy nie wyjdą za zakres)
        if( currEl + moveDef >= 0 && currEl + moveDef + numElementsVis <= elBoxesArr.length){
            currEl += moveDef;
            showElements(currEl);
        }
    };

    // funkcja zmieniająca rozmiar (w sensie ilości elementów) slidera 
    const changeSliderSize = changeSize => {
        // changeSize określa zadaną zmianę (może być zwiększenie lub zmniejszenie o określoną liczbę elementów)

        // sprawdzenie czy w ogóle w sliderze jest tyle elementów, co miał by wyświetlać slider 
        if(changeSize + numElementsVis > elBoxesArr.length){
            // jeśli nowa ilość widocznych elementów przekraczała by ilość istniejących elementów to jako nowa ilość ustawiana jest ilość istniejących elementów
            numElementsVis = elBoxesArr.length;
        } else {
            numElementsVis += changeSize;
        }

        // wyświetlenie ponownie, z nową liczbą elementów
        showElements(currEl);

    }

    // set event listeners 
    btnNext.addEventListener('click', () => moveElement(1) );
    btnPrev.addEventListener('click', () => moveElement(-1) );
    btnPlus.addEventListener('click', () => changeSliderSize(1) );
    btnMinus.addEventListener('click', () => changeSliderSize(-1) );

    // // event listener dla wszystkich elementów slidera
    // // kiedy element (button) kliknięty otrzymuje klasę 
    // elBoxesArr.forEach(el => el.addEventListener('click', () => activatedSection.innerText = el.innerText) );

    // funkcja aktywująca element o indeksie elInd (przycisk - element zostal wlaśnie kliknięty - nadajemy mu klasę btn--active i wykonujemy zadaną akcję)
    const activateEl = elInd => {
        // deaktywacja do tej pory aktywnego elementu (jeśli taki byl)
        const toDeactivateEl = document.querySelector('.btn--active');
        if(toDeactivateEl !== undefined && toDeactivateEl !== null){
            toDeactivateEl.classList.remove('btn--active');
        }

        // aktywowanie klikniętego elementu
        elBoxesArr[elInd].classList.add('btn--active');

        // wykonanie akcji
        // tymczasowo - przekazanie zawartości button
        activatedSection.innerText = elBoxesArr[elInd].innerText;
    }

    //------------------------------- metody publiczne

    // funkcja inicjalizująca datepicker
    self.init = () => {
        activateEl(0);
        activateEl(3);
        showElements(currEl, numElementsVis);
    }

    // ------------------------------------------------------------------
    // zwracamy element główny
    return self;

}());
    
datePickerSlider.init();
    