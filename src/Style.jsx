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
  setOpen,
  openStyle,
  setOpenStyle
}) {

  useEffect(() => {
    if (openStyle) {
      setShow(true)
      setOpen(false)
    } else {
      setShow(false)
    }
  }, [openStyle, setOpen, setShow])

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `.wrapper {
  display: inline-block;
}
.autocomplete-input {
  box-shadow: black 3px 3px 6px;
}
.dropdown-container {
  overflow-y: auto;
}

  <Autocomplete 
      inputProps={{
        placeholder: "search...",
        onMouseOver: () => {
          setOpenDropDown(true)
        }}}
      highlightedItemStyle={{
        backgroundColor:"#76d8f9"
      }}
      handleHighlightedItem={(element, item) => {
        highlightedElement.style.fontSize='2em'
      }}
  />`

  return (
    <section className='style'>
      <span className='green title'>Style The Component</span>
      <span className='top horizontal-bar'></span>
      <ul className='description-container'>
        <li className='description'>Style can be added using existing <span className='highlight'>class names</span> or by passing in an <span className='highlight'>Object Variable</span> for each element's style prop.</li>
        <li className='description'>The <span className='highlight'>highlighted element</span> can also be styled using the <span className='highlight'>HTMLelement</span> passed in the <span className='highlight'>handleHighlightedItem</span> function.</li>
        <li className='description'>The input element's attributes can be set using <span className='highlight'>inputProps</span>.</li>
        <li className='description'>Some Event handlers can be used in <span className='highlight'>inputProps</span>.</li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <AutoComplete
        list={numberArray}
        showAll={true}
        isOpen={openStyle}
        inputProps={{
          placeholder: "search...",
          onMouseOver: () => {
            setOpenStyle(true)
          },
        }}
        highlightedItemStyle={{
          backgroundColor: "#76d8f9",
          color: "blue",
          fontSize: "inherit"
        }}
        updateIsOpen={(openMe) => {
          setOpenStyle(openMe)
        }}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {
          highlightedElement.style.fontSize = '2em';
          setCard(display[highlightedItem])
        }}
      />
    </section>
  );
}

export default Style;
