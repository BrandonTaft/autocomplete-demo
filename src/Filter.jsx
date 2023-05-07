import { useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Filter({
  response,
  showPopUp,
  setShowPopUp,
  setCodeString,
  setAnotherUser,
  filter,
  setFilter,
  openFilterDropDown,
  setOpenFilterDropDown,
  setOpenDropDown,
  setShowSubmit
}) {

  const toggleFilter = (() => {
    setFilter(filter => !filter)
  })

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `
  
<AutoComplete
   list={response}
   showAll={true}
   getPropValue={
     filter ? (item) => item.name : (item) => item.id
   }
   handleHighlightedItem={(element, item) => {
     setUser(item)
   }}
   onSelect={(element,item) => {
    console.log(element,item)
  }}
/>
  `

  useEffect(() => {
    setShowSubmit(false)
    if (openFilterDropDown) {
      setOpenDropDown(false)
    }
  }, [openFilterDropDown, setOpenDropDown, setShowSubmit])

  return (
    <section>
      <span className='title'>
        Toggle Property Values
      </span>
      <span className='top horizontal-bar'></span>
      <ul className='description-container'>
        <li className='description'>
          Create a filter by changing the values in <span className='highlight'>getPropValue.</span>
        </li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={toggleFilter}>
          Sort By
        </button>
        <div className='filter-sort'>
          {filter ? 'NAME' : 'I.D.'}
        </div>
        <button className='ignore btn' onClick={handleCode}>
          See Code
        </button>
      </div>

      <AutoComplete
        list={response}
        getPropValue={
          filter ? (item) => `${item.firstName} ${item.lastName}`
            : (item) => item.id.slice(-5)
        }
        showAll={true}
        isOpen={openFilterDropDown}
        updateIsOpen={(openMe) => {
          setOpenFilterDropDown(openMe)
        }}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {
          setAnotherUser(highlightedItem)
        }}
        onSelect={(element, item) => {
          console.log(element, item)
        }}
      />


    </section>
  );
}

export default Filter;
