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
    setOpenFilterDropDown,
    setOpenOrderDropDown,
    setOpenSubmitDropDown,
    setOpenStyle,
    setShowSubmit
}) {

    useEffect(() => {
        setShowSubmit(false)
    },[openDropDown, setShowSubmit]);

    const toggleDropDown = (() => {
        setOpenDropDown(!openDropDown)
        setOpenCardDropDown(false)
        setOpenAnotherDropDown(false)
        setOpenFilterDropDown(false)
        setOpenOrderDropDown(false)
        setOpenSubmitDropDown(false)
        setOpenStyle(false)
    })

    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `

 const [open, setOpen] = useState(false);
 <button className='ignore' onClick={() => {
     setOpen(!open)
 }}/>

 <AutoComplete
     list={response}
     getPropValue={(item) => item.firstName}
     showAll={true}
     disableOutsideClick={true}
     isOpen={open}
     updateIsOpen={(update) => {
         setOpen(update)
     }}
     `;

    return (
        <>
            <section className='preview'>
                <span className='title'>Toggle Open / Close</span>
                <span className='top horizontal-bar'></span>
                <ul className='description-container'>
                    <li className='description'>Use the <span className='highlight'>isOpen</span> prop to control the dropdown.</li>
                    <li className='description'>Use <span className='highlight'>updateIsOpen</span> to pass in a set function to update the state that controls the <span className='highlight'>isOpen</span> prop.</li>
                    <li className='description'>Use <span className='highlight'>disableOutsideClick</span> so the dropdown only closes when <span className='highlight'>isOpen</span> is set to false.</li>
                </ul>
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
                    updateIsOpen={(update) => {
                        setOpenDropDown(update)
                    }}
                    handleHighlightedItem={(element, item) => {
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
