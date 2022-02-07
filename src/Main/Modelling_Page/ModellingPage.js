import React, {useState} from 'react';
import './ModellingPage.css';
import WaterfallChart from './WaterfallChart';
import ModellingSidePane from './ModellingSidePane';


// const dummyGraphData = [
//     {ingredients_cost: 2.12, packaging_cost: 1.08, yield_cost: 0.03, labour_cost: 0.05, waste_cost: 0.13, transport_cost: 0.15, overheads_cost: 0.14, byproduct_value: 0, margin_cost: 0.18, incoming_price: 4.12}
// ]


function ModellingPage() {

    const [LPFSearchedOption, setLPFSearchedOption] = useState('');

    function LPFOptionSelected(args){
        setLPFSearchedOption(args);
    }

     //Sliders---
     const [flexCoefficients, setFlexCoefficients] = useState(
        [
            {label: 'Ingredients', flexValue: 0},
            {label: 'Packaging', flexValue: 0},
            {label: 'Yield', flexValue: 0},
            {label: 'Labour', flexValue: 0},
            {label: 'Waste', flexValue: 0},
            {label: 'Transport', flexValue: 0},
            {label: 'Overheads', flexValue: 0},
            {label: 'Byproduct', flexValue: 0},
            {label: 'Margin', flexValue: 0},
        ]);

    function handleSliderChange(event, newValue){
        const sliderName = event.toElement.childNodes[0].name;
        setFlexCoefficients(
            flexCoefficients.map(item => {
                if(item.label === sliderName){
                    return {...item, flexValue: newValue}
                } else {
                    return item
                }
            })
        )
    }
    //Sliders---


    const incomingPrice = 4.55;
    const incomingPriceWaterfallData = [incomingPrice];
    const priceBreakdown = [2.12, 1.08, 0.03, 0.05, 0.13, 0.15, 0.14, 0, 0.18];
    const priceBreakdownWithFlex = priceBreakdown.map((item, index)=> {
        return item * ((flexCoefficients[index].flexValue/100) + 1)
    })
    const totalShouldCost = priceBreakdownWithFlex.reduce((partial_sum, a) => partial_sum + a, 0);
    const bottomOfWaterfall = [0, totalShouldCost];
    const topOfWaterFall = [0, (incomingPrice-totalShouldCost)];

    priceBreakdownWithFlex.forEach(item => {
        bottomOfWaterfall.push((bottomOfWaterfall.slice(-1)-item))
    });

    priceBreakdownWithFlex.forEach(item => {
        topOfWaterFall.push(item)
    });

    priceBreakdownWithFlex.forEach(item => {
        incomingPriceWaterfallData.push(0)
    });

   
    

    return (
        <div className='modelling__page__outer'>
            <ModellingSidePane LPFOptionSelected={LPFOptionSelected} LPFSearchedOption={LPFSearchedOption} flexCoefficients={flexCoefficients} handleSliderChange={handleSliderChange} />
            <div className='modelling_page__graph__pane'>
                <WaterfallChart incomingPriceWaterfallData={incomingPriceWaterfallData} bottomOfWaterfall={bottomOfWaterfall} topOfWaterFall={topOfWaterFall} />
            </div>
        </div>
    )
}

export default ModellingPage


