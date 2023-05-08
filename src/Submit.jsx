import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Submit({
    response,
    showPopUp,
    setShowPopUp,
    setCodeString,
    setAnotherUser,
    openSubmitDropDown,
    setOpenSubmitDropDown,
    setOpenDropDown,
    setShowSubmit
}) {
    const [submit, setSubmit] = useState(false);

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `
    
const [submit, setSubmit] = useState(false);

<button onClick={() => {setSubmit(true)}}>
    Submit
</button>
<AutoComplete
    showAll={true}
    list={array}
    submit={submit}
    updateSubmit={setSubmit}
    handleSubmit={(item) => {
        setUser(item)
    }}   
/>
`

    useEffect(() => {
        if (openSubmitDropDown) {
            setOpenDropDown(false)
        };

    }, [openSubmitDropDown, setOpenDropDown])


    return (
        <section className='style'>
            <span className='title dynamic'>Submit Button</span>
            <span className='top horizontal-bar'></span>
            <ul className='description-container'>
                <li className='description'>Enable a submit button by using the <span className='highlight'>submit</span> prop.</li>
                <li className='description'>The <span className='highlight'>handleSubmit</span> function will run every time the <span className='highlight'>submit</span> prop is <span className='highlight'>true</span>.</li>
                <li className='description'>If the <span className='highlight'>handleSubmit</span> prop is not passed in, the <span className='highlight'>onSelect</span> function will run.</li>
                <li className='description'>The <span className='highlight'>handleNewValue</span> function will still run if there is not a match for the input text.</li>
                <li className='description'>The <span className='highlight'>updateSubmit</span> prop is used to reset the state passed in the <span className='highlight'>submit</span> prop.</li>
            </ul>
            <div className='btn-box'>
                <button className='ignore btn' onClick={() => {setSubmit(true)}}>Submit</button>
                <button className='ignore btn' onClick={handleCode}>See Code</button>
            </div>
            <AutoComplete
                showAll={true}
                list={response}
                getPropValue={
                    (item) => `${item.firstName} ${item.lastName}`
                }
                isOpen={openSubmitDropDown}
                updateIsOpen={(openMe) => {
                    setOpenSubmitDropDown(openMe)
                }}
                
                submit={submit}
                updateSubmit={setSubmit}
                handleSubmit={(selectedItem, originalIndex) => {
                    console.log(selectedItem)
                    setAnotherUser(selectedItem)
                    setShowSubmit(true)
                }}
            />


        </section>
    );
}

export default Submit;
