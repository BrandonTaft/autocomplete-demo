import { useEffect, useRef, useState } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Numbers({
  showPopUp,
  setShow,
  setShowPopUp,
  setNumber,
  setCodeString,
  setOpenDropDown,
  openCardDropDown,
  setOpenCardDropDown
}) {

  const [newList, setNewList] = useState();

  useEffect(() => {
    if (openCardDropDown) {
      setShow(true)
      setOpenDropDown(false)
    } else {
      setShow(false)
    }

  }, [openCardDropDown, setOpenDropDown, setShow])

  useEffect(() => {
    setNewList([2,4,6,8,10,15,20,30,40,50])
  }, [])

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })



  const codeString = `

const [newList, setNewList] = useState();

<AutoComplete
    list={newList}
    showAll={true}
    handleNewValue={(value,list) => {
      setNewList(prevState => [...prevState, Number(value)])
    }}
    onSelect={(element,item) => {
      console.log(element,item)
    }}
/>
`

  return (
    <section className='numbers'>
      <span className='green title'>Add New Values</span>
      <ul className='description-container'>
        <li className='description'>If there are no matching values, pressing enter will fire the <span className='highlight'>handleNewValue</span> function with the input value and original <span className='highlight'>list</span> array passed into it.</li>
        <li className='description'>This can be used to dynamically add a new value to your <span className='highlight'>list</span> array.</li>
        <li className='description'>If the <span className='highlight'>handleNewValue</span> function is not passed in, the <span className='highlight'>onSelect</span> function will still run.</li>

      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <span>Type in a number greater than 9 and press enter</span>
      <AutoComplete
        list={newList}
        isOpen={openCardDropDown}
        updateIsOpen={(openMe) => {
          setOpenCardDropDown(openMe)
        }}
        highlightFirstItem={false}
        showAll={true}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {
          setNumber(highlightedItem)
        }}
        handleNewValue={(value, list) => {
          setNewList(prevState => [...prevState, Number(value)])
        }}
        onSelect={(element, item) => {
          console.log(element, item)
        }}
      />
    </section>
  );
}

export default Numbers;
