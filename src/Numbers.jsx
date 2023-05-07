import { useEffect, useState } from 'react';
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
  setOpenCardDropDown,
  setShowSubmit
}) {

  const [newList, setNewList] = useState();

  useEffect(() => {
    setShowSubmit(false)
    if (openCardDropDown) {
      setShow(true)
      setOpenDropDown(false)
    } else {
      setShow(false)
    }

  }, [openCardDropDown, setOpenDropDown, setShow, setShowSubmit])

  useEffect(() => {
    setNewList([2, 4, 6, 8, 10, 15, 20, 30, 40, 50])
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
    highlightFirstItem={false}
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
      <span className='title'>Add New Values</span>
      <span className='top horizontal-bar'></span>
      <ul className='description-container'>
        <li className='description'>Any time there are no matching values, the <span className='highlight'>handleNewValue</span> function will run if the prop is passed in. </li>
        <li className='description'>This can be used to add a new value to your <span className='highlight'>list</span> array.</li>
        <li className='description'>If the <span className='highlight'>handleNewValue</span> function is not passed in, the <span className='highlight'>onSelect</span> or <span className='highlight'>handleSubmit</span> function will still run.</li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <i>Type in a number that is not listed - then press enter</i>
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
