import React, {useState, useEffect} from 'react';
import './InputNewOtherPriceIngredientForm.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {GiRaddish} from 'react-icons/gi';
import {IoIosAdd} from 'react-icons/io';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getDatabase, ref, set, onValue} from "firebase/database";
import Button from '@mui/material/Button';
import { formatRelative } from 'date-fns';
import firebase from 'firebase/compat';



const formatDate = date => {
    let formattedDate = '';
    if (date) {
        formattedDate = formatRelative(date, new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};



function InputNewOtherPriceIngredientForm({setShowNewIngredientFormToggle, inputOtherPriceIngFormData}) {

    const [formType, setFormType] = useState('NEW_INGREDIENT');
    const [otherPriceDataList, setOtherPriceDataList] = useState([]);
    const [otherPriceFullData, setOtherPriceFullData] = useState([]);
    const [lastUpdatedOn, setLastUpdatedOn] =useState('');
    const [currentPrice, setCurrentPrice] = useState('')
    const [isUniqueChecker, setIsUniqueChecker] = useState(false);
    const [typedUniqueIdentifier, setTypedUniqueIdentifier] = useState('');
    const [typedPriceSource, setTypedPriceSource] = useState('');
    const [typedPriceValue, setTypedPriceValue] = useState('');
    const [warningMessage, setWarningMessage] = useState(false);

    useEffect(()=>{
        const db = getDatabase();
        const otherPriceRef = ref(db, 'OTHER/');
        onValue(otherPriceRef, (snapshot) => {
            const otherPriceData = snapshot.val();
            
            const otherPriceDataMapped = otherPriceData.map(item => (
                {value: item.UNIQUE_ID_STRING, label: item.UNIQUE_ID_STRING, timstamp: item.TIMESTAMP}
                ));
            const otherPriceSorted = otherPriceDataMapped.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1);
            const otherPriceDataRemoveDuplicates = otherPriceSorted.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.value === value.value
                ))
            );
            setOtherPriceDataList(otherPriceDataRemoveDuplicates);


            const otherPriceFullDataMapped = otherPriceData.map(item => (
                {value: item.UNIQUE_ID_STRING, label: item.UNIQUE_ID_STRING, price: item.PRICE, timestamp: item.TIMESTAMP}
            ))
            const otherPriceFullDataSorted = otherPriceFullDataMapped.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1);
            const otherPriceFullDataRemoveDuplicates = otherPriceFullDataSorted.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.value === value.value
                ))
            );
            setOtherPriceFullData(otherPriceFullDataRemoveDuplicates);
        })
    }, [])


    function handleFormTypeToggle(event, newValue){
        if(newValue){
            setFormType(newValue);
            setIsUniqueChecker(null);
            setLastUpdatedOn(null);
            setCurrentPrice(null);
        }
    }

    function closeForm(){
        setShowNewIngredientFormToggle(false);
    }

    function handleUniqueIDChange(e, newValue){
        setWarningMessage(false);
        const searchValue = newValue;
        const filteredOtherPriceList = otherPriceFullData.filter(item => {
            return item.value.toLowerCase().includes(searchValue.toLowerCase());
        })
        if(formType === 'UPDATE_INGREDIENT'){
            setIsUniqueChecker(null);
            //Update the last upated value and price
            if(filteredOtherPriceList.length === 1){
                setLastUpdatedOn(formatDate(new Date(filteredOtherPriceList[0].timestamp)));
                setCurrentPrice(filteredOtherPriceList[0].price);
            } 
        } else {
            setLastUpdatedOn(null);
            setCurrentPrice(null);
            //Update the last upated value
            if(filteredOtherPriceList.length === 0){
                setIsUniqueChecker('This is a unique identifier.');
            } else {
                setIsUniqueChecker('This is NOT unique.');
            }
        }
        setTypedUniqueIdentifier(searchValue);
    }

    function handleDataSourceChange(e){
        setWarningMessage(false);
        setTypedPriceSource(e.target.value);
    }

    function handlePriceValueChange(e){
        setWarningMessage(false);
        setTypedPriceValue(e.target.value);
    }


    function handleSubmitForm(){
        // e.preventDefault();
        const typedPriceValueType = typedPriceValue*2;
        if(typedPriceValueType && typedPriceSource.length >= 10 && typedUniqueIdentifier){
            //Update the DB and close the input form.
            const otherPriceDataLength = otherPriceDataList.length;
            const db = getDatabase();
            const dataToPushToDatabase = {"SUBCOMPONENT_STRING": inputOtherPriceIngFormData, "UNIQUE_ID_STRING": typedUniqueIdentifier, "PRICE_SOURCE": typedPriceSource, "PRICE": typedPriceValue, "TIMESTAMP": firebase.database.ServerValue.TIMESTAMP}
            set(ref(db, 'OTHER/' + otherPriceDataLength), dataToPushToDatabase);
            setWarningMessage('Success!'); 
            setShowNewIngredientFormToggle(false);

        } 
        if(!typedUniqueIdentifier){
            if(formType==='NEW_INGREDIENT'){
                setWarningMessage('Please create a unique identifier for this ingredient!');
                return
            } else {
                setWarningMessage('Please select an ingredient to update the price!');
                return
            }
        }
        if(typedPriceSource.length < 10){
            setWarningMessage('Please enter information for the price data source. This must be at least 10 characters! ');
            return
        }
        if(!typedPriceValueType) {
            setWarningMessage('The price value must be a number!');
            return
        }
    }



    return (
        <div className='overlay__backdrop'>
            <div className='input__new__ingredient__form__outer'>
                <div className='input__new__ingredient__form__header'>
                    <div className='input__new__ingredient__form__header__icon'>
                        <IoIosAdd size={20}/>
                        <GiRaddish size={25}/>
                    </div>
                    <div className='input__new__ingredient__form__header__title'>
                        Add or Update Ingredients
                    </div>
                    <div className='input__new__ingredient__form__close__button'>
                        <AiOutlineCloseCircle size={25} onClick={closeForm}/>
                    </div>
                </div>
                <div className='input__new__ingredient__form__update__or__add__toggle'>
                    <ToggleButtonGroup value={formType} exclusive onChange={handleFormTypeToggle} aria-label="text alignment" size='small' >
                        <ToggleButton value="NEW_INGREDIENT" aria-label="left aligned">Add New Ingredient</ToggleButton>
                        <ToggleButton value="UPDATE_INGREDIENT" aria-label="right aligned">Update Ingredient Price</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className='input__new__ingredient__form__select__identifier'>
                    {formType === "NEW_INGREDIENT" ? <div className='input__new__ingredient__form__label'>Create a unique identifier</div> : <div className='input__new__ingredient__form__label'>Search for the ingredient identifier</div>}
                    {formType === 'UPDATE_INGREDIENT' ? 
                    <Autocomplete onInputChange={handleUniqueIDChange} onClick={handleUniqueIDChange} disablePortal id='combo__search__box' size='small' options={otherPriceDataList} sx={{ width: '100%' }}  renderInput={(params) => <TextField {...params} label="Search Ingredients..." />}/> 
                    : 
                    <Autocomplete onInputChange={handleUniqueIDChange} onClick={handleUniqueIDChange}  disablePortal id='combo__search__box'  size='small' freeSolo={true} options={otherPriceDataList} sx={{ width: '100%' }}  renderInput={(params) => <TextField {...params} label="Unique Text..." />}/> 
                    }
                    <div className='input__new__ingredient__form__search__info'>
                        {lastUpdatedOn && <div>Last Updated: {lastUpdatedOn}</div> }
                        {currentPrice && <div>Current Price: £{currentPrice}</div> }
                        {isUniqueChecker && <div>{isUniqueChecker}</div>}
                        
                    </div>
                </div>
                <div className='input__new__ingredient__from__price__source'>
                    <div className='input__new__ingredient__form__label'>Enter The Source Of This Ingredient Data (Be Descriptive!)</div>
                    <div>
                        <TextField onChange={handleDataSourceChange} id='combo__search__box' size='small' label="Data Source..."  sx={{ width: '100%' }} variant="outlined" />   
                    </div>
                </div>
                <div className='input__new__ingredient__from__price__value'>
                    <div className='input__new__ingredient__form__label'>Please Enter The Price Per Unit Of Measure</div>
                    <div>
                        <TextField onChange={handlePriceValueChange} id='combo__search__box' size='small' label="Price..."  sx={{ width: '100%' }} variant="outlined" />   
                    </div>
                </div>
                <div className='input__new__ingredient__form__submit__button'>
                    <Button 
                        style={{
                        borderColor: "rgb(141, 198, 63)",
                        color: 'rgb(141, 198, 63)',
                        fontSize: "12px"}} 
                        size='small' color='secondary' variant="outlined" sx={{ width: '100%' }} 
                        onClick={handleSubmitForm}>Add Ingredient To Database</Button>
                </div>
                {warningMessage && 
                <div className ='input__new__ingredient__form__warning__message'>
                    {warningMessage}    
                </div>}
            </div>
        </div>
    )
}

export default InputNewOtherPriceIngredientForm
