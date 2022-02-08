import React, {useEffect, useState, useRef} from 'react';
import './SetupSearchPane.css';
import { getDatabase, ref, onValue} from "firebase/database";
import './SelectSearch.css';
import NavigationBar from './NavigationBar';

import SelectSearch from 'react-select-search';

function SetupSearchPane({LPFOptionSelected, LPFSearchedOption, handlePageSelection, selectedPage}) {

    const [LPFIngredientsList, setLPFIngredientsList] = useState([]);
    const [searchedDetails, setSearchedDetails] = useState({});
    const searchInput = useRef();
    
    useEffect(()=>{
        const db = getDatabase();
        const LPFDataRef = ref(db, 'LPF/');
        onValue(LPFDataRef, (snapshot) => {
        const data = snapshot.val();
        setLPFIngredientsList(data.map(item => ({name: item.LPF_CODE, value: item.LPF_CODE})));
        setSearchedDetails(data.filter((item)=>{
            return item.LPF_CODE === LPFSearchedOption;
        }))
        
    });
    }, [LPFSearchedOption])
    
    const searchedIngredientDetails = [
        {label: 'Code', field: 'LPF_CODE'},
        {label: 'Description', field: 'LPF_NAME'},
        {label: 'Supplier', field: 'SUPPLIER'},
        {label: 'UOM', field: 'UOM'},
        {label: 'Gross Price', field: 'LPF_PRICE'},
        {label: 'Net Price', field: 'NET_PRICE'}
    ]

    // const modelCompletionList = [
    //     'Linked Components', 
    //     'Packaging Items Assigned', 
    //     'Variables Set',
    //     'Ready to Model'
    // ]

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
        <div className='setupsearchpane__outer'>
            <NavigationBar handlePageSelection={handlePageSelection} selectedPage={selectedPage}/>
            <div className='setupsearchpane__search__bar'>
                <SelectSearch  ref={searchInput} options={LPFIngredientsList} filterOptions={handleFilter}  search placeholder="Search for an Ingredient..." onChange={(args)=>LPFOptionSelected(args)}/>
            </div>
            <div className='setupsearchpane__search__details'>
                <p>Search Details</p>
            {searchedIngredientDetails.map((item, index) => (
                <div className='setupsearchpane__search__details__row' key={index}>
                    <div className='setupsearchpane__search__details__label'>
                        {item.label}
                    </div>
                    <div className='setupsearchpane__search__details__value'>
                        {searchedDetails[0] && 
                        <div>
                        {item.field === 'NET_PRICE' ? "£" + (searchedDetails[0].LPF_PRICE*(1-searchedDetails[0].REBATE)).toFixed(2)
                        : item.field === 'LPF_PRICE' ? "£" + searchedDetails[0][item.field].toFixed(2) : searchedDetails[0][item.field]}
                        </div>}
                    </div>
                </div>
            ))}
            </div>
            <div className='setupsearchpane__search__details'>
            {/* <p>Model Completion</p>
            {modelCompletionList.map((item, index) => (
                <div className='setupsearchpane__search__details__row' key={index}>
                    <div className='setupsearchpane__search__details__label'>
                        {item}
                    </div>
                    <div className='setupsearchpane__search__details__value'>
                        Value
                    </div>
                </div>
            ))} */}
            </div>
        </div>
    )
}

export default SetupSearchPane
