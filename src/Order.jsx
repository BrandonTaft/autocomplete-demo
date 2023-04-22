import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import axios from 'axios';
import './App.css';

function Order({
  showPopUp,
  setShowPopUp,
  setCodeString,
  setAnotherUser,
  openOrderDropDown,
  setOpenOrderDropDown,
  setOpenDropDown
}) {
  
  const [response, setResponse] = useState();
  const [sort, setSort] = useState(false);
  
  const toggleSort = (() => {
    setSort(sort => !sort)
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
    filter ? (item) => {item.name} : (item) => item.id
  }
  handleHighlightedItem={(element, item) => {
    setUser(item)
  }}
/>`


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
  },[sort])

  useEffect(()=> {
    if(openOrderDropDown){
      setOpenDropDown(false)
    }
},[openOrderDropDown, setOpenDropDown])

  return (
    <section>
      
        <span className='green title'>Toggle Property Values</span>
        <span className='description'>- Set the order of the values by changing the value in descending prop</span>
      
      <div className='btn-box'>
        <button className='ignore btn' onClick={toggleSort}>Sort By</button>
        <div className='filter-sort'>{sort ? 'Ascending' : 'Descending'}</div>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      
      <AutoComplete
        list={response}
        getPropValue={
          (item) => `${item.firstName} ${item.lastName}`
        }
        showAll={true}
        descending={sort}
        isOpen={openOrderDropDown}
                    updateIsOpen={(openMe) => {
                      setOpenOrderDropDown(openMe)
                    }}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {
          setAnotherUser(highlightedItem)
        }}
      />


    </section>
  );
}

export default Order;
