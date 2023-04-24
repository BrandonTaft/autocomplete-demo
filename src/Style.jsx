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
  openStyleDropDown,
  setOpenStyleDropDown
}) {

  useEffect(()=> {
    if(openStyleDropDown){
      setShow(true)
      setOpenDropDown(false)
    } else {
      setShow(false)
    }
},[openStyleDropDown, setOpenDropDown, setShow])

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `/********* CSS *********/
  .wrapper {
    display: inline-block;
  }
  .autocomplete-input {
    background-color: #181c238a;
    box-shadow: black 3px 3px 6px;
  }
  .autocomplete-input:focus {
    background-color: white;
  }
  .dropdown-container {
    overflow-y: auto;
  }
  /**********************/
  <Autocomplete 
      inputProps={{
        placeholder: "search...",
        onMouseOver: () => {
          setOpenDropDown(true)
        },
      }}
      listItemStyle={{ cursor: "pointer" }}
      highlightedItemStyle={{
        backgroundColor:"#76d8f9",
        color: "blue",
        fontSize:"inherit"
      }}
      handleHighlightedItem={(element, item) => {
        highlightedElement.style.fontSize='2em'
      }}
  />`

  return (
    <section className='style'>
        <span className='green title'>Style The Component</span>
        <span className='description'>- Style can be added using existing <span className='highlight'>class names</span> or by passing in an <span className='highlight'>Object Variable</span> for each element's style prop.</span>
        <span className='description'>- The <span className='highlight'>highlighted element</span> can also be styled using the <span className='highlight'>HTMLelement</span> passed in the <span className='highlight'>handleHighlightedItem</span> function</span>
        <span className='description'>- The input element's attributes can be set using <span className='highlight'>inputProps</span>.</span>
        <span className='description'>- Some Event handlers such as onClick can be used</span>
        <span className='description'>- onClick, onChange, onKeyDown, onFocus cannot be overridden</span>
      <div className='btn-box'>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <AutoComplete
        list={numberArray}
        showAll={true}
        isOpen={openStyleDropDown}
        inputProps={{
          placeholder: "search...",
          onMouseOver: () => {
            setOpenStyleDropDown(true)
          },
        }}
        highlightedItemStyle={{
          backgroundColor:"#76d8f9",
          color: "blue",
          fontSize:"inherit"
        }}
        updateIsOpen={(openMe) => {
          setOpenStyleDropDown(openMe)
        }}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {
          highlightedElement.style.fontSize='2em';
          setCard(display[highlightedItem])
        }}
      />
    </section>
  );
}

export default Style;
