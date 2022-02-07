import React, {useEffect, useState, useRef} from 'react';
import './ModellingSidePane.css';
import { getDatabase, ref, onValue} from "firebase/database";
import '../Model_Setup/SelectSearch.css';
import SelectSearch from 'react-select-search';
import ModellingVariableSliders from './ModellingVariableSliders';

function ModellingSidePane({LPFOptionSelected, LPFSearchedOption, flexCoefficients, handleSliderChange}) {

    const [LPFIngredientsList, setLPFIngredientsList] = useState([]);
    // const [searchedDetails, setSearchedDetails] = useState({});
    const searchInput = useRef();
    
    useEffect(()=>{
        const db = getDatabase();
        const LPFDataRef = ref(db, 'LPF/');
        onValue(LPFDataRef, (snapshot) => {
        const data = snapshot.val();
        setLPFIngredientsList(data.map(item => ({name: item.LPF_CODE, value: item.LPF_CODE})));
        // setSearchedDetails(data.filter((item)=>{
        //     return item.LPF_CODE === LPFSearchedOption;
        // }))
        
    });
    }, [LPFSearchedOption])


    const handleFilter = (items) => {
        return (searchValue) => {
          if (searchValue.length === 0) {
            return LPFIngredientsList;
          }
        const updatedItems = items.filter((item => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
        }))
          return updatedItems;
        };
      };


    return (
        <div className='modelling__side__pane__outer'>
            <p>Should Cost Model</p>
            <div className='setupsearchpane__search__bar'>
                <SelectSearch  ref={searchInput} options={LPFIngredientsList} filterOptions={handleFilter}  search placeholder="Search for an Ingredient..." onChange={(args)=>LPFOptionSelected(args)}/>
            </div>
            <ModellingVariableSliders flexCoefficients={flexCoefficients} handleSliderChange={handleSliderChange}/>
        </div>
    )
}

export default ModellingSidePane
