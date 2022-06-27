(function() {
    const chartTickerListDiv = document.getElementsByClassName('chart-ticker-list')[0];
    const chartTickerListCanvas = document.getElementsByClassName('chart-ticker-list-canvas')[0];
    let chartTickerListCanvasText = chartTickerListCanvas.getContext("2d");
    const runOneYearSelectorText = document.getElementsByClassName('run-one-year-selector')[0];
    const runOneYearButton = document.getElementsByClassName('run-one-year-button')[0];
    let selectedYear = runOneYearSelectorText.value;
    const yearCurrent = document.getElementsByClassName('one-year-current')[0];
    const manyYearCurrent = document.getElementsByClassName('many-multiple-year')[0];
    runOneYearButton.addEventListener('click', () => {
        playOneYear();
    });
    const runOneYearPrevButton = document.getElementsByClassName('run-one-year-prev-button')[0];
    runOneYearPrevButton.addEventListener('click', () => {
        playOneYearPrev();
    });
    const runOneYearNextButton = document.getElementsByClassName('run-one-year-next-button')[0];
    runOneYearNextButton.addEventListener('click', () => {
        playOneYearNext();
    });
    // Init run multiple year panel
    const runMultipleYearSelectorStartText = document.getElementsByClassName('run-multiple-year-selector-start')[0];
    const runMultipleYearSelectorEndText = document.getElementsByClassName('run-multiple-year-selector-end')[0];
    const runMultipleYearButton = document.getElementsByClassName('run-multiple-year-button')[0];
    runMultipleYearButton.addEventListener('click', () => {
        playMultipleYear();
    });
    // Init data
    // const maxCapitalImgWidth = 1000;
    function createDiv(className, innerHTML) {
        let divElement = document.createElement('DIV');
        divElement.setAttribute('class', className);
        if (innerHTML) {
            divElement.innerHTML = innerHTML;
        }
        return divElement;
    }
    
    function createTickerItem(tickerData, index) {
        // Create ticker item div
        let tickerItemDiv = createDiv('chart-ticker-item'); 
        tickerItemDiv.setAttribute('name', tickerData.ticker);
        tickerItemDiv.setAttribute('id', tickerData.ticker);
        // tickerItemDiv.style.width = tickerData.capitalItem + 'px';
        // tickerItemDiv.style.height = tickerData.capitalItem + 'px'; 
        tickerItemDiv.style.background = tickerData.color;
        // Create ticker item name div
        let tickerItemNameDiv = createDiv('chart-ticker-item-name', tickerData.ticker);
        // Create ticker item capital text div
        let tickerItemCapitalTextDiv = createDiv('chart-ticker-item-capital-text', tickerData.capitalItem);
        // Construct ticker item div by append all children div
        tickerItemDiv.append(tickerItemNameDiv);
        tickerItemDiv.append(tickerItemCapitalTextDiv);
        return tickerItemDiv;     
    }

    function calculateCapitalWidth(sortedTickerDataList) {
        // const maxCapital = createWidthTickerDataDiv(sortedTickerDataList.capital);
        for(let tickerData of sortedTickerDataList) {
            tickerData.capitalItem = tickerData.capital;
        }
        return sortedTickerDataList;
    }

    function createTickerItemOfASpecificTime(tickerDataList) {
        // 1. Clear the chart ticker list
        chartTickerListDiv.innerHTML = '';
        // 2. Sort the data list
        tickerDataList.sort((item1, item2) => {
            return item1.capital > item2.capital ? -1 : item1.capital < item2.capital? 1 : 0;
        });
        // 3. Calculate capital width
        tickerDataList = calculateCapitalWidth(tickerDataList);
        // 4. Create ticker item div and append to the chart-ticker-list div
        let linesContainingCircle = 5;
        for ( let i = 0; i < linesContainingCircle; i++) {
            for( let j = 0; j < tickerDataList.length; j++) {
                let tickerData = tickerDataList[j];
                let areaOfPreviousSquare;
                if (j = 0) {
                    areaOfPreviousSquare = tickerData.capitalItem * tickerData.capitalItem;
                } else {
                    let tickerDataPrev = tickerDataList[j - 1];
                    console.log(tickerDataPrev);
                    areaOfPreviousSquare = tickerDataPrev.capitalItem * tickerDataPrev.capitalItem;
                }
                console.log(areaOfPreviousSquare);
                const tickerItemDiv = createTickerItem(tickerData, j);
                chartTickerListCanvasText.beginPath();
                // Trục hoành x của đồ thị
                let graphHorizontalAxis = areaOfPreviousSquare + (tickerData.capitalItem/2);
                // Trục tung y của đồ thị 
                let graphVerticalAxis = areaOfPreviousSquare + tickerData.capitalItem/2;
                // Bán kính đường tròn
                let circleRadius = tickerData.capitalItem;
                // Vị trí của đường tròn 
                chartTickerListCanvasText.arc(graphHorizontalAxis, graphVerticalAxis, circleRadius, 0, Math.PI * 2, true);
                // stroke Để hiển thị các nét vẽ mà mình đã định.
                chartTickerListCanvasText.stroke();
                chartTickerListCanvas.append(tickerItemDiv);
                chartTickerListDiv.append(chartTickerListCanvas);
            }
            return;
        }
    }

    function playOneYear() {
        let selectedYear = runOneYearSelectorText.value;
        yearCurrent.innerHTML = 'Year current: ' + ( +selectedYear );
        try {
            if (+selectedYear < 2000) throw "no data below 2000";
            if (+selectedYear > 2100) throw "no data below 2100";
        } catch(e) {
            alert(' ' + e);
        }
        playAYear(selectedYear);
    }
    function playAYear(year) {
        let specificYearTickerData = fakeData[year];
        if(specificYearTickerData) {
            createTickerItemOfASpecificTime(specificYearTickerData);
        }
    }
    function playOneYearPrev() {
        let selectedYear = runOneYearSelectorText.value;
        yearCurrent.innerHTML = 'Year current: ' + ( +selectedYear - 1 );
        try {
            if (+selectedYear < 2000) throw "no data below 2000";
            selectedYear = parseInt(selectedYear);
            runOneYearSelectorText.value = --selectedYear;
        } catch(e) {
            alert('' + e);
        }
        playAYear(selectedYear);
    }

    function playOneYearNext() {
        runMultipleYearSelectorStartText.innerHTML = '';
        let selectedYear = runOneYearSelectorText.value; // Year
        yearCurrent.innerHTML = 'Year current: ' + (+selectedYear + 1);
        try {
            if (+selectedYear > 2100) throw "no data below 2100";
            selectedYear = parseInt(selectedYear);
            runOneYearSelectorText.value = ++selectedYear; // todo: validate min and max year depend on vn30 data
        } catch(e) {
            alert('' + e);
        }
        playAYear(selectedYear);
    }
    function playMultipleYear() {
        try {
            let startYear = parseInt(runMultipleYearSelectorStartText.value);
            let endYear = parseInt(runMultipleYearSelectorEndText.value);
            manyYearCurrent.innerHTML = 'Capital chart of VN30 from ' + startYear + ' to ' + endYear;
            if(endYear < startYear || runMultipleYearSelectorStartText === ' ' || runMultipleYearSelectorEndText === ' ') {
                return;
            }
            runOneYearSelectorText.value = startYear;
            setInterval(() => {
                let selectedYear = parseInt(runOneYearSelectorText.value);
                if(selectedYear < endYear && selectedYear >= 2000 && endYear <= 2100) {
                    playOneYearNext(fakeData);
                }
            }, 1000);
        } catch(e) {
            console.log('invalid year');
        }
    }
    let fakeData = generateData(vn30Data, initialCapital, velocity, 2000, 2100);
    createTickerItemOfASpecificTime(fakeData['2000']);
})()
