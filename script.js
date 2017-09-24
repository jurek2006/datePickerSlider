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
    let currFirstEl = 0; //aktualny pierwszy (po lewej) element
    let activeElInd; //indeks (w tablicy) aktywnego elementu

    // select elements
    const btnPrev = document.querySelector('.btn--prev');
    const btnNext = document.querySelector('.btn--next');
    const btnPlus = document.querySelector('.btn--plus');
    const btnMinus = document.querySelector('.btn--minus');
    const contBox = document.querySelector('.contBox');
    let elBoxesArr = [...contBox.children];
    const activatedSection = document.querySelector('section.activated');
    

    // ------------------------------ metody prywatne
    // funkcja dodająca pole sliderIndex (z numerem indeksu) do każdego elementu w sliderze
    const addSliderIndexToAllEl = () => {
        elBoxesArr.forEach((el, ind) => {
            el.sliderIndex = ind;
        });
    }

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
        if( currFirstEl + moveDef >= 0 && currFirstEl + moveDef + numElementsVis <= elBoxesArr.length){
            currFirstEl += moveDef;

            // sprawdzenie czy aktywny element "zmieści się" w wyświetlanych elementach po przesunięciu
            // jeśli nie - przesunięcie aktywnego elementu
            if(activeElInd < currFirstEl){
                // jeśli element nie mieści się "po lewej stronie" widocznej zawartości
                // aktywacja pierwszego widocznego elementu po lewej
                activateElInd(currFirstEl);
            } else if (activeElInd > currFirstEl + numElementsVis - 1){
                // jeśli element nie mieści się "po prawej stronie" widocznej zawartości
                // aktywacja pierwszego widocznego elementu po prawej
                activateElInd(currFirstEl + numElementsVis - 1);
            }


            showElements(currFirstEl);
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
        showElements(currFirstEl);

    }

    // funkcja aktywująca element clickedEl (button - przycisk - element zostal wlaśnie kliknięty - nadajemy mu klasę btn--active i wykonujemy zadaną akcję)
    const activateEl = clickedEl => {

        // deaktywacja do tej pory aktywnego elementu (jeśli taki byl)
        const toDeactivateEl = document.querySelector('.btn--active');
        if(toDeactivateEl !== undefined && toDeactivateEl !== null){
            toDeactivateEl.classList.remove('btn--active');
        }

        // aktywowanie klikniętego elementu
        clickedEl.classList.add('btn--active');

        // uaktualnienie wartości activeElInd (indeks aktywnego elementu)
        activeElInd = clickedEl.sliderIndex;
        console.log(clickedEl.sliderIndex);

        // wykonanie akcji
        // tymczasowo - przekazanie zawartości button
        activatedSection.innerText = clickedEl.innerText;
    };

    // funkcja aktywująca element w sliderze wg podanego indeksu (np. pierwszy - 0 itd)
    // jeśli podano niewlaściwy identyfikator (taki element nie istnieje) to nie zostanie nic wykonane tylko wyświetlony do konsoli komunikat
    const activateElInd = elToActInd => {
        // jeśli nie podano indeksu to ustawiany na pierwszy element (0)
        if(elToActInd === undefined || elToActInd === null){
            elToActInd = 0;
        }
        // sprawdzenie czy istnieje w sliderze element o indeksie elToActInd
        if(elBoxesArr[elToActInd] !== undefined && elBoxesArr[elToActInd] !== null){
            //pobranie elementu i uruchomieni na nim funkcji activateEl 
            activateEl(elBoxesArr[elToActInd]);
        } else {
            console.log(`datePickerSlider.activateElInd - nie istnieje element w sliderze o indeksie ${elToActInd}`);
        }
    }

    // set event listeners 
    btnNext.addEventListener('click', () => moveElement(1) );
    btnPrev.addEventListener('click', () => moveElement(-1) );
    btnPlus.addEventListener('click', () => changeSliderSize(1) );
    btnMinus.addEventListener('click', () => changeSliderSize(-1) );

    // // event listener dla wszystkich elementów slidera
    elBoxesArr.forEach(el => el.addEventListener('click', el => activateEl(el.target)));
    // ZMIENIĆ na delegację

    //------------------------------- metody publiczne

    // funkcja inicjalizująca datepicker
    self.init = () => {
        addSliderIndexToAllEl();
        activateElInd(0);
        showElements(currFirstEl, numElementsVis);
        console.log(elBoxesArr);
    }

    // ------------------------------------------------------------------
    // zwracamy element główny
    return self;

}());
    
datePickerSlider.init();
    