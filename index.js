(function() {

    const chartTickerListDiv = document.getElementsByClassName('chart-ticker-list')[0];
    const runOneYearSelectorText = document.getElementsByClassName('run-one-year-selector')[0];
    const runOneYearButton = document.getElementsByClassName('run-one-year-button')[0];
    let selectedYear = runOneYearSelectorText.value;
    const yearCurrent = document.getElementsByClassName('one-year-current')[0];
    const manyYearCurrent = document.getElementsByClassName('many-multiple-year')[0];
    runOneYearButton.addEventListener('click', () => {
        playOneYear();
    })
    const runOneYearPrevButton = document.getElementsByClassName('run-one-year-prev-button')[0];
    runOneYearPrevButton.addEventListener('click', () => {
        playOneYearPrev();
    });
    const runOneYearNextButton = document.getElementsByClassName('run-one-year-next-button')[0];
    runOneYearNextButton.addEventListener('click', () => {
        playOneYearNext();
    });

    // Init data
    const maxCapitalImgWidth = 1000;
    function createDiv(className, innerHTML) {
        let divElement = document.createElement('DIV');
        divElement.setAttribute('class', className);
        if (innerHTML) {
            divElement.innerHTML = innerHTML;
        }
        return divElement;
    }
    
    function createTickerItem() {
        
    }

})()