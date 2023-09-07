import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Dynamic({
    response,
    setCard,
    setShow,
    showPopUp,
    setShowPopUp,
    setCodeString,
    setUser,
    openAnotherDropDown,
    setOpenAnotherDropDown,
    setOpenDropDown,
    setShowSubmit,
    setAnimal,
    setShowAnimal
}) {

    const [originalList, setOriginalList] = useState(true);
    const [numberArray, setNumberArray] = useState();
    const [display, setDisplay] = useState([]);


    useEffect(() => {
        setNumberArray(Array.from({ length: 52 }, (_, i) => i + 1))

        const cards = new Array(52);
        for (let i = 0; i < cards.length; i++) {
            cards[i] = i;
        }

        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const suits = ['♠︎', '♥︎', '♣︎', '♦︎'];

        const getProperties = (i) => {
            const color = i / 13 | 0;
            const suit = suits[i / 13 | 0];
            const value = values[i % 13];
            return { suit, value, color };
        };
        setDisplay(cards.map(getProperties))

    }, [])

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `

    const originalList = [
    { name: 'Adina', id: 109cc },
    { name: 'Adrian', id: 109e5 },
    { name: 'Albert', id: 109f2 },
    ...,
    ];
    const numbers = [1, ..., 52];

<AutoComplete
    showAll={true}
    list={showListOne ? originalList : numbers}
    getDisplayValue={(list) => {
        list.map((item) => item.name)
    }}
    handleHighlight={(item) => {
        setDisplay(item)
    }}
    onSelect={(item) => console.log(item)}
/>

`

    useEffect(() => {
        setShowSubmit(false)
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
                <li className='description'>The <span className='highlight'>list</span> prop can be updated at any time.</li>
                <li className='description'>If <span className='highlight'>list</span> contains objects use <span className='highlight'>getDisplayValue</span> to filter out the property value to displayed.</li>
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
                    originalList ? (list) => list.map((item) => item.firstName) : () => { }
                }
                open={openAnotherDropDown}
                onDropDownChange={(openMe) => {
                    setOpenDropDown(false)
                    setOpenAnotherDropDown(openMe)
                    setAnimal()
                    setShowAnimal(false)
                }}
                handleHighlight={(highlightedItem) => {
                    if (typeof highlightedItem === 'number') {
                        setUser()
                        setCard(display[highlightedItem - 1])
                    } else {
                        setUser(highlightedItem)
                    }
                }}
                onSelect={(item) => {
                    console.log(item)
                }}
            />


        </section>
    );
}

export default Dynamic;
