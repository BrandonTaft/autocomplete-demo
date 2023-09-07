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
    setOpenCard,
    setOpenDynamic,
    setOpenSubmit,
    setShowSubmit,
    setAnimal,
    setShowAnimal
}) {

    useEffect(() => {
        setShowSubmit(false)
    }, [openDropDown, setShowSubmit]);

    const toggleDropDown = (() => {
        setOpenCard(false)
        setOpenDynamic(false)
        setOpenSubmit(false)
        setOpenDropDown(!openDropDown)
    })


    const handleCode = (() => {
        setShowPopUp(!showPopUp)
        setCodeString(codeString)
    })

    const codeString = `


 const [isOpen, setIsOpen] = useState(false);
 
 <button className='ignore' onClick={() => {
     setIsOpen(!isOpen)
 }}/>

 <AutoComplete
     list={users}
     showAll={true}
     disableOutsideClick={true}
     open={isOpen}
     onDropDownChange={(open) => {
        setOpenDropDown(open)
     }}
     onSelect={(item) => console.log(item)}
 />
 
     `;

    return (
        <>
            <section>
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
                    onDropDownChange={(open) => {
                        setOpenDropDown(open)
                        setAnimal()
                        setShowAnimal(false)
                    }}
                    handleHighlight={(item) => {
                        setUser(item)
                    }}
                    onSelect={(item) => console.log(item)}
                />
            </section>
        </>
    );
}

export default Preview;
