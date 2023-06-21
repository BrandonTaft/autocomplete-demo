import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Dynamic({
    response,
    setCard,
    setShow,
    display,
    showPopUp,
    setShowPopUp,
    setCodeString,
    setAnotherUser,
    openAnotherDropDown,
    setOpenAnotherDropDown,
    numberArray,
    setOpenDropDown,
    setShowSubmit
}) {

    const [originalList, setOriginalList] = useState(true)

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `
<AutoComplete
    showAll={true}
    list={originalList ? response : numberArray}
    getDisplayValue={(list) => list.map((item) => item.name)}
    handleHighlight={(item) => {
        setDisplay(item)
    }}
    onSelect={(item) => {
        console.log(item)
      }}
/>`

    useEffect(() => {
        setShowSubmit(false)
        if (openAnotherDropDown) {
            setOpenDropDown(false)
        };

        if (originalList) {
            setShow(false)
        } else {
            setShow(true)
        };
    }, [openAnotherDropDown, setOpenDropDown, originalList, setShow, setShowSubmit])


    return (
        <section>
            <span className='title dynamic'>Toggle List</span>
            <span className='top horizontal-bar'></span>
            <ul className='description-container'>
                <li className='description'>Toggle the array passed into the <span className='highlight'>list</span> prop.</li>
            </ul>
            <div className='btn-box'>
                <button className='ignore btn' onClick={() => { setOriginalList(true) }}>List #1</button>
                <button className='ignore btn' onClick={() => { setOriginalList(false) }}>List #2</button>
                <button className='ignore btn' onClick={handleCode}>See Code</button>
            </div>
            <AutoComplete
                showAll={true}
                list={originalList ? response : numberArray}
                getDisplayValue={
                    originalList ? (list) => list.map((item) => `${item.firstName} ${item.lastName}`) : () => { }
                }
                open={openAnotherDropDown}
                onDropDownChange={(openMe) => {
                    setOpenAnotherDropDown(openMe)
                }}
                handleHighlight={(highlightedElement, highlightedItem) => {
                    if (typeof highlightedItem === 'number') {
                        setAnotherUser()
                        setCard(display[highlightedItem])
                    } else {
                        setAnotherUser(highlightedItem)
                    }
                }}
                onSelect={(element, item) => {
                    console.log(element, item)
                }}
            />


        </section>
    );
}

export default Dynamic;
