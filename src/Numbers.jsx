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
  setShowSubmit,
  setAnimal,
  setShowAnimal
}) {

  const [newList, setNewList] = useState([2, 4, 6, 8, 10, 15, 20, 30, 40, 50]);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    setShowSubmit(false)
    if (openCardDropDown) {
      setShow(true)
      setOpenDropDown(false)
    } else {
      setShow(false)
    }

  }, [openCardDropDown, setOpenDropDown, setShow, setShowSubmit])

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `


const [arr, setArr] = useState(array);
const [submit, setSubmit] = useState(false);

<button onClick={() => setSubmit(true)}>
  Submit
</button>

<AutoComplete
    list={arr}
    showAll={true}
    submit={submit}
    controlSubmit={true}
    onSelect={(item) => {
      console.log(item)
      setSubmit(false)
    }}
    handleNewValue={(value) => {
      setArr(prev => [...prev, Number(value)])
    }}
/>

`

  return (
    <section>
      <span className='title'>Add New Values</span>
      <span className='top horizontal-bar'></span>
      <ul className='description-container'>
        <li className='description'>Any time there are no matching values, the <span className='highlight'>handleNewValue</span> function will run if the prop is passed in. </li>
        <li className='description'>If the <span className='highlight'>handleNewValue</span> function is not passed in, the <span className='highlight'>onSelect</span> function will run with the input value passed in.</li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={() => { setSubmit(true) }}>Submit</button>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <i>Type in a number that is not listed - then click submit</i>
      <AutoComplete
        list={newList}
        open={openCardDropDown}
        onDropDownChange={(openMe) => {
          setOpenCardDropDown(openMe)
          setAnimal()
          setShowAnimal(false)
        }}

        showAll={true}
        handleHighlight={(highlightedItem) => {
          setNumber(highlightedItem)
        }}
        submit={submit}
        controlSubmit={true}
        handleNewValue={(value) => {
          setNewList(prev => [...prev, Number(value)])
          setSubmit(false)
        }}
        onSelect={(item) => {
          console.log(item)
          setSubmit(false)
        }}
      />
    </section>
  );
}

export default Numbers;
