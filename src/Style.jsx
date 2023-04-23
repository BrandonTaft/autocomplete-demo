import { useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Style({
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
  handleHighlightedItem={(element, item) => {
      setCard(item)
  }}
/>`

  return (
    <section >
      
        <span className='green title'>Style</span>
        <div className='description-container'>
        <span className='description'>- Style can be added using existing class names or by passing in an Object Variable for the seperate element.</span>
        <span className='description'>- The input element can be styled using inputProps.</span>
        <span className='description'>- The highlighted element can be styled using the HTMLelement passed in the handleHighlightedItem </span>
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

export default Style;
