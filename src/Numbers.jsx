import { useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Numbers({
  showPopUp,
  setShow,
  setShowPopUp,
  numberArray,
  setCard,
  display,
  setCodeString,
  setOpenDropDown,
  openCardDropDown,
  setOpenCardDropDown
}) {

  useEffect(() => {
    if (openCardDropDown) {
      setShow(true)
      setOpenDropDown(false)
    } else {
      setShow(false)
    }
  }, [openCardDropDown, setOpenDropDown, setShow])

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `
  
<AutoComplete
    list={numberArray}
    showAll={true}
    handleHighlightedItem={(element, item) => {
      setCard(item)
    }}
/>`

  return (
    <section >
      <span className='green title'>Numbers</span>
      <ul className='description-container'>
        <li className='description'>Values can include <span className='highlight'>Numbers</span> or <span className='highlight'>Strings</span></li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <AutoComplete
        list={numberArray}
        showAll={true}
        isOpen={openCardDropDown}
        updateIsOpen={(openMe) => {
          setOpenCardDropDown(openMe)
        }}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {
          console.log(display[highlightedItem])
          setCard(display[highlightedItem])
        }}
      />
    </section>
  );
}

export default Numbers;
