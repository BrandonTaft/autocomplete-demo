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

<button className='ignore btn' onClick={toggleSort}>
  { sort ? 'Descending' : 'Ascending'}
</button>

const toggleSort = (() => {
    setSort(sort => !sort)
})

<AutoComplete
    list={response}
    showAll={true}
    descending={sort}
    getPropValue={
      (item) => {item.firstName}
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
  }, [sort])

  useEffect(() => {
    if (openOrderDropDown) {
      setOpenDropDown(false)
    }
  }, [openOrderDropDown, setOpenDropDown])

  return (
    <section className='order'>
      <span className='green title'>Toggle Ascending / Descending</span>
      <ul className='description-container'>
        <li className='description'>Change the order of the values shown in the drop down by changing the value in <span className='highlight'>descending</span> prop</li>
      </ul>
      <div className='btn-box'>
        <button className='ignore btn' onClick={toggleSort}>Sort By</button>
        <div className='descending'>{sort ? 'Descending' : 'Ascending'}</div>
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
