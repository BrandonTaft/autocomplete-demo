import { useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import { animals } from './animals'
import './App.css';

function Simple({
  showPopUp,
  setShow,
  setShowPopUp,
  setAnimal,
  setCodeString,
  setOpenDropDown,
  openSimple,
  setOpenSimple,
  setShowSubmit,
  setShowAnimal,
  setNumber
}) {
    
  useEffect(() => {
    setShowSubmit(false)
    if (openSimple) {
      setShow(true)
      setOpenDropDown(false)
    } 

  }, [openSimple, setOpenDropDown, setShow, setShowSubmit])


  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `

const animals = [
    "Aardvark",
    "Albatross",
    "Alligator",
    ...,
];

const [animal, setAnimal] = useState();

<AutoComplete
    list={animals}
    onSelect={(item) => {
        setAnimal(item)
    }}
/>

`

  return (
    <section>
      <span className='title'>Basic Array</span>
      <span className='top horizontal-bar'></span>
      <ul className='description-container'>
        <li className='description'>Just add an array and an <span className='highlight'>onSelect</span> function. </li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <i>Search for an animal</i>
      <AutoComplete
        list={animals}
        open={openSimple}
        onDropDownChange={(openMe) => {
          setOpenSimple(openMe)
          setNumber()
        }}
        onSelect={(item) => {
            setShow(true)
            setAnimal(item)
            setShowAnimal(true)
        }}
      />
    </section>
  );
}

export default Simple;
