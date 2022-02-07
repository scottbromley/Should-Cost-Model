import React, {useRef, useState, useEffect} from 'react';
import './IngredientsLinkPage.css';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getDatabase, ref, set, onValue} from "firebase/database";
import {HiLink} from 'react-icons/hi';
import {AutocompleteSelectCellEditor} from "ag-grid-autocomplete-editor";
import InputNewOtherPriceIngredientForm from './InputNewOtherPriceIngredientForm.js';
import LoadingSpinner from '../../LoadingSpinner';



function IngredientsLinkPage({LPFSearchedOption}) {

    const gridRef = useRef(null);
    const [gridApi, setGridApi] = useState(null);
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [dummyData, setDummyData]  = useState([]);
    const [LPFIngredientsList, setLPFIngredientsList] = useState([]);
    const [otherPriceDataList, setOtherPriceDataList] = useState([]);
    const [LPFIngredientFullInfo, setLPFIngredientFullInfo] = useState([]);
    const [otherPriceIngredientFullInfo, setOtherPriceIngredientFullInfo] = useState([]);
    const [showNewIngredientFormToggle, setShowNewIngredientFormToggle] = useState(false);
    const [inputOtherPriceIngFormData, setInputOtherPriceIngFormData] = useState('');

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };
    
    // function performingATaskOnSelectedRows(e){
    //     const selectedNodes = gridRef.current.api.getSelectedNodes()
    //     const selectedData = selectedNodes.map( node => node.data )
    //     const selectedDataStringPresentation = selectedData.map( node => `${node.subcomponent} ${node.quantity}`).join(', ')
    //     alert(`Selected nodes: ${selectedDataStringPresentation}`)
    // }

    const autoSizeAll = (skipHeader) => {
        const allColumnIds = [];
        gridColumnApi.getAllColumns().forEach((column) => {
          allColumnIds.push(column.colId);
        });
        gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
    };

    const sizeToFit = () => {
        gridApi.sizeColumnsToFit();
    };

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    useEffect(()=>{
        setShowLoadingSpinner(true)

        const db = getDatabase();
        const recipeDataRef = ref(db, 'RECIPE/');
        const assignedDataRef = ref(db, 'ASSIGNED/' + LPFSearchedOption);

        onValue(assignedDataRef, (snapshot) => {
            const assignedData = snapshot.val();

            if(assignedData){
                //Value present - so set the table to be the assigned data.
                setDummyData(assignedData);

            } else {
                //Value not present - so set the table to be the recipe data.
                onValue(recipeDataRef, (snapshot) => {
                    const data = snapshot.val();
                    setDummyData(data.filter(item => {
                        return item.LPF_CODE === LPFSearchedOption
                    }))
                });
            }
        });

        const LPFDataRef = ref(db, 'LPF/');
        onValue(LPFDataRef, (snapshot) => {
        const LPFdata = snapshot.val();
        setLPFIngredientsList(LPFdata.map(item => ({value: item.LPF_CODE, label: item.LPF_CODE})));
        setLPFIngredientFullInfo(LPFdata.map(item => ({value: item.LPF_CODE, label: item.LPF_CODE, price: item.LPF_PRICE, rebate: item.REBATE})))
        });

        const otherPriceRef = ref(db, 'OTHER/');
        onValue(otherPriceRef, (snapshot) => {
        const otherPriceData = snapshot.val();

        const otherPriceListDataMapped = otherPriceData.map(item => ({value: item.UNIQUE_ID_STRING, label: item.UNIQUE_ID_STRING}));
        const otherPriceListRemoveDuplicates = otherPriceListDataMapped.filter((value, index, self) =>
        index === self.findIndex((t) => (
        t.value === value.value
            ))
        );
        setOtherPriceDataList(otherPriceListRemoveDuplicates);
        
        const otherPriceFullDataMapped = otherPriceData.map(item => ({value: item.UNIQUE_ID_STRING, label: item.UNIQUE_ID_STRING, price: item.PRICE}))
        const otherPriceFullDataRemoveDuplicaes = otherPriceFullDataMapped.filter((value, index, self) =>
            index === self.findIndex((t) => (
            t.value === value.value
                ))
            );
        setOtherPriceIngredientFullInfo(otherPriceFullDataRemoveDuplicaes);
        });

        setShowLoadingSpinner(false);

    }, [LPFSearchedOption])

    
    function percentageConverter(params){
        const output = (Number(params.value)*100).toFixed(2) + '%'
        return output
    }


    // function linkageArray(){
    //     const linkedInfo = dummyData.map(item => {
    //         if(item.SUBCOMPONENT_STRING  && item.PRICE_DATA_SOURCE && item.GC_CODE_OR_IDENTIFIER.value){
    //             return {...item, "LINKAGE_MADE": "LINKED"}
    //         } else {
    //             return {...item, "LINKAGE_MADE": "NOT_LINKED"}
    //         }
    //     })
    //     const db = getDatabase();
    //     set(ref(db, 'ASSIGNED/' + LPFSearchedOption), linkedInfo);
    //     setDummyData(linkedInfo);
    // }

    function updateCellValues(){
        const linkedInfo = dummyData.map(item => {
            if(item.SUBCOMPONENT_STRING  && item.PRICE_DATA_SOURCE && item.GC_CODE_OR_IDENTIFIER?.value){
                if(item.PRICE_DATA_SOURCE === 'LPF'){
                    const LPFData = LPFIngredientFullInfo.filter(lpfElement => {
                        return lpfElement.value === item.GC_CODE_OR_IDENTIFIER.value;
                    })
                    if(LPFData.length){
                    const gross_price = LPFData[0].price;
                    const rebate = LPFData[0].rebate;
                    const net_price = gross_price*(1-rebate);
                    const quantity = item.QUANTITY;
                    const cost_in_product = quantity*net_price;
                        return {...item, "GROSS_PRICE": LPFData[0].price, "LINKAGE_MADE": "LINKED", "NET_PRICE": net_price, "COST_IN_PRODUCT": cost_in_product }
                    } else {
                        return {...item, "GROSS_PRICE": '', "LINKAGE_MADE": "NOT_LINKED", "NET_PRICE": '', "COST_IN_PRODUCT": ''}
                    }
                } else if(item.PRICE_DATA_SOURCE === 'Other'){
                    const otherPriceData = otherPriceIngredientFullInfo.filter(element => {
                        return element.value === item.GC_CODE_OR_IDENTIFIER.value;
                    })
                    if (otherPriceData.length){
                    const quantity = item.QUANTITY;
                    const grossNetPrice = otherPriceData[0].price*1
                    const cost_in_product = quantity*otherPriceData[0].price;
                        return {...item, "GROSS_PRICE": grossNetPrice, "LINKAGE_MADE": "LINKED", "NET_PRICE": grossNetPrice, "COST_IN_PRODUCT": cost_in_product}
                    } else {
                        return {...item, "GROSS_PRICE": '', "LINKAGE_MADE": "NOT_LINKED", "NET_PRICE": '', "COST_IN_PRODUCT": ''}
                    }
                } else {
                    return {...item, "GROSS_PRICE": '', "LINKAGE_MADE": "NOT_LINKED", "NET_PRICE": '', "COST_IN_PRODUCT": ''}
                }
             } else {
                return {...item, "GROSS_PRICE": '', "LINKAGE_MADE": "NOT_LINKED", "NET_PRICE": '', "COST_IN_PRODUCT": ''}
             }
        })
        console.log(linkedInfo);
        const db = getDatabase();
        set(ref(db, 'ASSIGNED/' + LPFSearchedOption), linkedInfo);
        setDummyData(linkedInfo);
    }


    function onCellValueChanged(event){
        // console.log(event.colDef.field + ' changed from ' + event.oldValue +' to ' + event.newValue + ' on row ' + event.data.SUBCOMPONENT_STRING);
        if(event.colDef.field === 'PRICE_DATA_SOURCE' || event.colDef.field === "GC_CODE_OR_IDENTIFIER"){
            if(event.colDef.field === 'PRICE_DATA_SOURCE' && event.newValue === 'Input'){
                setInputOtherPriceIngFormData(event.data.SUBCOMPONENT_STRING);
                setShowNewIngredientFormToggle(true);
            } else {
                updateCellValues()          
            }
        } else {
            const db = getDatabase();
            set(ref(db, 'ASSIGNED/' + LPFSearchedOption), dummyData);
        }
    }

    function searchOptionCellParams(params){
        const dataSourceOption = params.data.PRICE_DATA_SOURCE;
        if(dataSourceOption === 'LPF'){
            return {
                required: true, selectData: LPFIngredientsList, placeholder: "Select an option"
            }
        } else if(dataSourceOption === 'Other'){
            return {
                required: true, selectData: otherPriceDataList, placeholder: "Select an option"
            }
        } else {
            return {
                values: ['Please select a price source option...']
            }
        }
    }


    function renderLinkIcon(params){
        return (
            <span>
                {params.value === 'LINKED' ? 
                <React.Fragment>
                    <HiLink size={15}/>
                </React.Fragment>
                 : ""}
            </span>
        )
    }

    function dropDownIdentifierFormatter(params){
        if (params.value) {
          return params.value.label || params.value.value;
        }
        return "";
    }

    function currencyFormat(params){
        if(params.value){
            return '£' + params.value.toFixed(2)
        }
    }
    
    return (
        <div className='ingredients__link__page__outer'>
            {showLoadingSpinner && <LoadingSpinner/>}
            <div>
                {showNewIngredientFormToggle && <InputNewOtherPriceIngredientForm setShowNewIngredientFormToggle={setShowNewIngredientFormToggle} inputOtherPriceIngFormData={inputOtherPriceIngFormData}/>}
            </div>
            <div className='ingredients__link__page__pre__table__info'>
                <div className='ingredients__link__page__pre__table__model__info'>Model Info</div>
                <div className='ingrediDents__link__page__pre__table__title'>Pre Table Information</div>
                <div className='ingredients__link__page__pre__table__table__settings'>
                    <button onClick={()=>autoSizeAll(false)}>Autosize Columns</button>
                    {/* <button onClick={()=>autoSizeAll(true)}>Autosize Ignore Headers</button> */}
                    <button onClick={sizeToFit}>Size To Fit Window</button>
                </div>
            </div>
            <div className='ingredients__link__page__table'>
                <div className="ag-theme-alpine" style={{height: 600, left: '0px', right:'0px'}}>
                    <AgGridReact rowData={dummyData} ref={gridRef} checkboxSelection={true} rowSelection="multiple" suppressRowClickSelection={true} onGridReady={onGridReady} onFirstDataRendered={onFirstDataRendered} singleClickEdit={true} onCellValueChanged={onCellValueChanged} animateRows={true} >
                        <AgGridColumn field="SUBCOMPONENT_STRING" headerName="Ingredient" sortable={true} filter={true} checkboxSelection={true} ></AgGridColumn>
                        <AgGridColumn field="QUANTITY" headerName="Quantity" sortable={ true } filter={ true } valueFormatter={percentageConverter}  ></AgGridColumn>
                        <AgGridColumn field="PRICE_DATA_SOURCE" headerName="Price Data Source" sortable={ true } filter={ true } editable={true} cellEditor="agSelectCellEditor" cellEditorParams={{values: ['LPF', 'Other', 'Input', 'Proposed']}} ></AgGridColumn>
                        <AgGridColumn field="GC_CODE_OR_IDENTIFIER" headerName="Greencore Code or Other Source Identifier" sortable={ true } filter={ true } editable={true} cellEditor={AutocompleteSelectCellEditor} cellEditorParams={searchOptionCellParams} valueFormatter={dropDownIdentifierFormatter}></AgGridColumn>
                        <AgGridColumn field="LINKAGE_MADE" headerName="" width={50} sortable={ true } filter={ true } cellRendererFramework={renderLinkIcon}></AgGridColumn>
                        <AgGridColumn field="GROSS_PRICE" headerName="Gross Price (per kg)" sortable={ true } filter={ true } valueFormatter={currencyFormat} ></AgGridColumn>
                        <AgGridColumn field="NET_PRICE" headerName="Net Price (per kg)" sortable={ true } filter={ true } valueFormatter={currencyFormat}></AgGridColumn>
                        <AgGridColumn field="COST_IN_PRODUCT" headerName="Cost in UOM of Product" sortable={ true } filter={ true } valueFormatter={currencyFormat}></AgGridColumn>
                        
                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}

export default IngredientsLinkPage


//  <AgGridColumn field="PRICE_DATA_SOURCE" headerName="Price Data Source" sortable={ true } filter={ true } cellRenderer="sourceDropdown" cellRendererParams={{onColorChange: onSourceChange}} ></AgGridColumn>