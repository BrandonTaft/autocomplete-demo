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

  useEffect(()=> {
    if(openCardDropDown){
      setShow(true)
      setOpenDropDown(false)
    } else {
      setShow(false)
    }
},[openCardDropDown, setOpenDropDown, setShow])

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `<AutoComplete
  list={numberArray}
  showAll={true}
  isOpen={openCardDropDown}
  updateIsOpen={(openMe) => {
    setOpenCardDropDown(openMe)
  }}
  handleHighlightedItem={(element, item) => {
      setCard(display[item])
  }}
/>`

  return (
    <section >
      <div>
        <span className='green title'>Numbers</span>
      </div>
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
