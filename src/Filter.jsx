import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import axios from 'axios';
import './App.css';

function Filter({
  showPopUp,
  setShowPopUp,
  setCodeString,
  setAnotherUser,
  filter,
  setFilter,
  openFilterDropDown,
  setOpenFilterDropDown,
  setOpenDropDown
}) {

  const [response, setResponse] = useState();

  const toggleFilter = (() => {
    setFilter(filter => !filter)
  })

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `
  
<button className='ignore btn' onClick={toggleFilter}>
  {filter ? 'NAME' : 'I.D.'}
</button>

<AutoComplete
   list={response}
   showAll={true}
   getPropValue={
     filter ? (item) => item.name : (item) => item.id
   }
   handleHighlightedItem={(element, item) => {
     setUser(item)
   }}
/>
  `


  useEffect(() => {
    const requestAPI = async () => {
      try {
        const res = await axios.get("https://dummyapi.io/data/v1/user?limit=100", {
          headers: {
            'app-id': '6430b84d15c85b6800a8f933'
          },
          params: {}
        });
        setResponse(res.data.data)
      } catch (err) {
        console.log(err);
      }
    };
    requestAPI()
  }, [filter])

  useEffect(() => {
    if (openFilterDropDown) {
      setOpenDropDown(false)
    }
  }, [openFilterDropDown, setOpenDropDown])

  return (
    <section>
      <span className='green title'>
        Toggle Property Values
      </span>
      <span className='description'>
        - Create a filter by changing the values in <span className='highlight'>getPropValue</span>
      </span>
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
      />


    </section>
  );
}

export default Filter;
