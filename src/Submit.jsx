import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Submit({
    response,
    showPopUp,
    setShowPopUp,
    setCodeString,
    setUser,
    openSubmitDropDown,
    setOpenSubmitDropDown,
    setOpenDropDown,
    setShowSubmit,
    setAnimal,
    setShowAnimal
}) {
    const [submit, setSubmit] = useState(false);

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `
    

const [submit, setSubmit] = useState(false);

<button onClick={() => setSubmit(true)}>
    Submit
</button>

<AutoComplete
    list={array}
    showAll={true}
    submit={submit}
    controlSubmit={true}
    onSelect={(item) => {
        setUser(item)
        setSubmit(false)
    }}   
/>

`

    useEffect(() => {
        if (openSubmitDropDown) {
            setOpenDropDown(false)
        };

    }, [openSubmitDropDown, setOpenDropDown])


    return (
        <section>
            <span className='title dynamic'>Submit Button</span>
            <span className='top horizontal-bar'></span>
            <ul className='description-container'>
                <li className='description'>Enable a submit button by using the <span className='highlight'>submit</span> prop.</li>
                <li className='description'><span className='highlight'>controlSubmit</span> must be passed in as true to give control to the <span className='highlight'>submit</span> prop.</li>
                <li className='description'>The <span className='highlight'>onSelect</span> or <span className='highlight'>handleNewValue</span> function is invoked each time the <span className='highlight'>submit</span> prop is <span className='highlight'>true</span>.</li>
            </ul>
            <div className='btn-box'>
                <button className='ignore btn' onClick={() => setSubmit(true)}>Submit</button>
                <button className='ignore btn' onClick={handleCode}>See Code</button>
            </div>
            <AutoComplete
                showAll={true}
                list={response}
                getDisplayValue={
                    (list) => list.map((item) => `${item.firstName} ${item.lastName}`)
                }
                open={openSubmitDropDown}
                onDropDownChange={(openMe) => {
                    setOpenSubmitDropDown(openMe)
                    setAnimal()
                    setShowAnimal(false)
                }}

                submit={submit}
                controlSubmit={true}
                onSelect={(selectedItem) => {
                    console.log(selectedItem)
                    setUser(selectedItem)
                    setSubmit(false)
                    setShowSubmit(true)
                }}
                handleNewValue={(newValue) => {
                    console.log(newValue)
                    setSubmit(false)
                }}
            />


        </section>
    );
}

export default Submit;
