import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import axios from 'axios';
import './App.css';

function Dynamic({
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
    setOpenDropDown
}) {
    const [response, setResponse] = useState();
    const [originalList, setOriginalList] = useState(true)

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `
<button className='ignore btn' onClick={() => {setList(true)}}>List #1</button>
<button className='ignore btn' onClick={() => {setList(false)}}>List #2</button>

<AutoComplete
    showAll={true}
    list={originalList ? response : numberArray}
    getPropValue={
        originalList ? (item) => {item.firstName} {item.lastName} : () => {}
    }
    isOpen={openAnotherDropDown}
    updateIsOpen={(openMe) => {
        setOpenAnotherDropDown(openMe)
    }}
    handleHighlightedItem={(highlightedElement, highlightedItem) => {
        if (typeof highlightedItem === 'number') {
            setAnotherUser()
            setCard(display[highlightedItem])
        } else {
            setAnotherUser(highlightedItem)
        }
    }}
/>`



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
    }, [])

    useEffect(() => {
        if (openAnotherDropDown) {
            setOpenDropDown(false)
        }
    }, [openAnotherDropDown, setOpenDropDown])

    useEffect(() => {
        if (originalList) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [openAnotherDropDown, setOpenDropDown, originalList, setShow])


    return (
        <section>
            
                <span className='green title'>Toggle List</span>
                <div className='description-container'>
                    <span className='description'>- Create a filter by changing the array passed into the list prop</span>
                    </div>
            <div className='btn-box'>
                <button className='ignore btn' onClick={() => { setOriginalList(true) }}>List #1</button>
                <button className='ignore btn' onClick={() => { setOriginalList(false) }}>List #2</button>
                <button className='ignore btn' onClick={handleCode}>See Code</button>
            </div>
            <AutoComplete
                showAll={true}
                list={originalList ? response : numberArray}
                getPropValue={
                    originalList ? (item) => `${item.firstName} ${item.lastName}` : () => { }
                }
                isOpen={openAnotherDropDown}
                updateIsOpen={(openMe) => {
                    setOpenAnotherDropDown(openMe)
                }}
                handleHighlightedItem={(highlightedElement, highlightedItem) => {
                    if (typeof highlightedItem === 'number') {
                        setAnotherUser()
                        setCard(display[highlightedItem])
                    } else {
                        setAnotherUser(highlightedItem)
                    }
                }}
            />


        </section>
    );
}

export default Dynamic;
