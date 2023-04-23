import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import axios from 'axios';

import './App.css';

function Preview({
    showPopUp,
    setShowPopUp,
    setCodeString,
    setUser,
    openDropDown,
    setOpenDropDown,
    setOpenCardDropDown,
    setOpenAnotherDropDown,
    setOpenFilterDropDown,
    setOpenOrderDropDown
}) {

    const [response, setResponse] = useState();


    useEffect(() => {
        const requestAPI = async () => {
            try {
                const res = await axios.get("https://dummyapi.io/data/v1/user?limit=100", {
                    headers: {
                        'app-id': '6430b84d15c85b6800a8f933'
                    },
                    params: {}
                });
                setResponse(res.data.data)
            } catch (err) {
                console.log(err);
            }
        };
        requestAPI()
    }, []);

    const toggleDropDown = (() => {
        setOpenDropDown(!openDropDown)
        setOpenCardDropDown(false)
        setOpenAnotherDropDown(false)
        setOpenFilterDropDown(false)
        setOpenOrderDropDown(false)
    })

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `
 <button className='ignore' onClick={() => {
     setOpenDropDown(!openDropDown)
 }}/>

 <AutoComplete
     list={response}
     getPropValue={ (item) => item.firstName }
     showAll={true}
     disableOutsideClick={true}
     isOpen={openDropDown}
     updateIsOpen={(openMe) => {
         setOpenDropDown(openMe)
     }}
     handleHighlightedItem={(element, item) => {
         setUser(item)
     }}
 />`;

    return (
        <>
            <section>

                <span className='green title'>Toggle Open / Close</span>
                <div className='description-container'>
                    <span className='preview-description'>- Use the isOpen prop to control the dropdown</span>
                    <span className='description'>- Use updateIsOpen to pass in a function to update state</span>
                </div>

                <div className='btn-box'>
                    <button className='ignore btn' onClick={toggleDropDown} >{openDropDown === false ? 'OPEN' : 'CLOSE'}</button>
                    <button className='ignore btn' onClick={handleCode}>See Code</button>
                </div>
                <AutoComplete
                    list={response}
                    getPropValue={(listName) => listName.firstName}
                    showAll={true}
                    disableOutsideClick={true}
                    isOpen={openDropDown}
                    updateIsOpen={(isOpen) => {
                        setOpenDropDown(isOpen)
                    }}
                    handleHighlightedItem={(element, item) => {
                        setUser(item)
                    }}
                />
            </section>
        </>
    );
}

export default Preview;
