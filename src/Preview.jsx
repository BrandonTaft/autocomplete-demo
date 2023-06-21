import { useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Preview({
    response,
    showPopUp,
    setShowPopUp,
    setCodeString,
    setUser,
    openDropDown,
    setOpenDropDown,
    setOpenCardDropDown,
    setOpenAnotherDropDown,
    setOpenSubmitDropDown,
    setShowSubmit
}) {

    useEffect(() => {
        setShowSubmit(false)
    }, [openDropDown, setShowSubmit]);

    const toggleDropDown = (() => {
        setOpenDropDown(!openDropDown)
        setOpenCardDropDown(false)
        setOpenAnotherDropDown(false)
        setOpenSubmitDropDown(false)
    })

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `

 const [openDropDown, setOpenDropDown] = useState(false);
 <button className='ignore' onClick={() => {
     setOpenDropDown(!openDropDown)
 }}/>

 <AutoComplete
     list={response}
     getDisplayValue={(list) => list.map((item) => item.name)}
     showAll={true}
     disableOutsideClick={true}
     open={openDropDown}
     onDropDownChange={(isOpen) => {
        setOpenDropDown(isOpen)
     }}
 />
     `;

    return (
        <>
            <section className='preview'>
                <span className='title'>Toggle Open / Close</span>
                <span className='top horizontal-bar'></span>
                <ul className='description-container'>
                    <li className='description'>Use the <span className='highlight'>open</span> prop to control the dropdown.</li>
                    <li className='description'>The <span className='highlight'>onDropDownChange</span> function is invoked with the current state of the dropdown passed in each time the dropdown opens or closes.</li>
                </ul>
                <div className='btn-box'>
                    <button className='ignore btn' onClick={toggleDropDown} >{openDropDown === false ? 'OPEN' : 'CLOSE'}</button>
                    <button className='ignore btn' onClick={handleCode}>See Code</button>
                </div>
                <AutoComplete
                    list={response}
                    getDisplayValue={
                        (list) => list.map((listName) => listName.firstName)
                    }
                    showAll={true}
                    disableOutsideClick={true}
                    open={openDropDown}
                    onDropDownChange={(update) => {
                        setOpenDropDown(update)
                    }}
                    handleHighlight={(item) => {
                        setUser(item)
                    }}
                    onSelect={(element, item) => {
                        console.log(element, item)
                    }}
                />
            </section>
        </>
    );
}

export default Preview;
