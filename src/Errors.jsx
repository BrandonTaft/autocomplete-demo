import { useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Errors({
  showPopUp,
  setShow,
  setShowPopUp,
  setCodeString,
  setOpenDropDown,
  openErrors,
  setOpenErrors,
  setShowSubmit,
  setNumber,
  setAnimal,
  setShowAnimal
}) {
    
  useEffect(() => {
    setShowSubmit(false)
    if (openErrors) {
      setShow(false)
      setShowAnimal(false)
      setOpenDropDown(false)
    } 

  }, [openErrors, setOpenDropDown, setShow, setShowAnimal, setShowSubmit])


  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `


<AutoComplete
    list={['Bob', 'Joe', 'Dan']}
    showAll={true}
    noMatchMessage={"No matches found"}
    onSelectError={(value) => {
        window.alert(value + 'is not an option')
    }}
    onSelect={(item) => {
        console.log(item)
    }}
/>

`

  return (
    <section className='bottom'>
      <span className='title'>Customize Behavior</span>
      <span className='top horizontal-bar'></span>
      <ul className='description-container'>
        <li className='description'><span className='highlight'>noMatchMessage</span> can be used to display a message in the dropdown when no matches are available.</li>
        <li className='description'><span className='highlight'>onSelectError</span> is a function that is invoked if <span className='highlight'>onSelect</span> is fired with a value that is not in the list and a <span className='highlight'>handleNewValue</span> function is not passed in.</li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <i>Search for a name not listed - then press enter</i>
      <AutoComplete
        list={['Bob', 'Joe', 'Dan']}
        showAll={true}
        noMatchMessage={"No matches found"}
        onSelectError={(value) => window.alert(`${value} - is not an option`)}
        open={openErrors}
        onDropDownChange={(openMe) => {
          setOpenErrors(openMe)
          setNumber()
          setAnimal()
        }}
        onSelect={(item) => {
            console.log(item)
        }}
      />
    </section>
  );
}

export default Errors;
