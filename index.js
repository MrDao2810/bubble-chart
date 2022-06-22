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
    
    function createTickerItem(tickerData, index) {
        // Create ticker item div
        let tickerItemDiv = createDiv('chart-ticker-item');
        tickerItemDiv.setAttribute('name', tickerData.ticker);
        tickerItemDiv.setAttribute('id', tickerData.ticker);
        // Create ticker item name div
        let tickerItemNameDiv = createDiv('chart-ticker-item-name');
        let tickerNameDiv = createDiv('chart-ticker-name', tickerData.ticker);
        // Create ticker item capital img div
        let tickerItemCapitalImgDiv = createDiv('chart-ticker-item-img');
        tickerItemCapitalImgDiv.style.setProperty('width', tickerData.capitalImgWidth + 'px');
        tickerItemCapitalImgDiv.style.setProperty('height', tickerData.capitalImgWidth + 'px');
        tickerItemCapitalImgDiv.style.background = tickerData.color;
        // Create ticker item capital text div
        let tickerItemCapitalTextDiv = createDiv('chart-ticker-item-capital-text');
        let tickerCapitalTextDiv = createDiv('chart-ticker-item-text', tickerData.capital);
        tickerItemCapitalTextDiv.append(tickerCapitalTextDiv);
        // Construct ticker item div by append all children div
        tickerItemNameDiv.append(tickerNameDiv);
        tickerItemDiv.append(tickerItemCapitalImgDiv);
        tickerItemDiv.append(tickerItemNameDiv);
        tickerItemDiv.append(tickerItemCapitalTextDiv);
        return tickerItemDiv;

    }
    function calculateCapitalWidth(sortedTickerDataList) {
        const maxCapital = sortedTickerDataList[0].capital;
        for(let tickerData of sortedTickerDataList) {
            tickerData.capitalImgWidth = tickerData.capital;
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
        for( let i = 0; i < tickerDataList.length; i++) {
            let tickerData = tickerDataList[i];
            const tickerItemDiv = createTickerItem(tickerData, i);
            chartTickerListDiv.append(tickerItemDiv);
        }
    }
    function playOneYear() {
        playAYear(selectedYear);
    }
    function playAYear(year) {
        let specificYearTickerData = vn30Data[year];
        if(specificYearTickerData) {
            createTickerItemOfASpecificTime(specificYearTickerData);
        }
    }
    createTickerItemOfASpecificTime(vn30Data['2000']);
})()