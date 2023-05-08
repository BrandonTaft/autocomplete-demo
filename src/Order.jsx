import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Order({
  response,
  showPopUp,
  setShowPopUp,
  setCodeString,
  setAnotherUser,
  openOrderDropDown,
  setOpenOrderDropDown,
  setOpenDropDown,
  setShowSubmit
}) {

  const [sort, setSort] = useState(false);
  const [showList, setShowList] = useState(true);

  const toggleSort = (() => {
    setSort(sort => !sort)
  })

  const toggleShowAll = (() => {
    setShowList(showList => !showList)
  })

  const handleCode = (() => {
    setShowPopUp(!showPopUp)
    setCodeString(codeString)
  })

  const codeString = `
  
<button className='ignore btn' onClick={toggleShowAll}>
  {showList ? 'Dont Show' : 'Show All'}
</button>
<button className='ignore btn' onClick={toggleSort}>
  { sort ? 'Descending' : 'Ascending'}
</button>

<AutoComplete
    list={response}
    showAll={showList}
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
    setShowSubmit(false)
    if (openOrderDropDown) {
      setOpenDropDown(false)
    }
  }, [openOrderDropDown, setOpenDropDown, setShowSubmit])

  return (
    <section className='order'>
      <span className='green title'>Customize</span>
      <span className='top horizontal-bar'></span>
      <ul className='description-container'>
      <li className='description'>If <span className='highlight'>showAll</span> is not set to <span className='highlight'>true</span>, text must be entered matching a stored value for the dropdown to open.</li>
        <li className='description'>Change the order of the values shown in the drop down by changing the value in <span className='highlight'>descending</span> prop.</li>
      </ul>
      <div className='btn-box'>
      <button className='ignore btn' onClick={toggleShowAll}>{showList ? 'Dont Show' : 'Show All'}</button>
        <button className='ignore btn' onClick={toggleSort}>Sort By</button>
        <button className='ignore btn' onClick={handleCode}>See Code</button>
      </div>
      <div className='descending'>{sort ? 'Descending' : 'Ascending'}</div>
      <AutoComplete
        list={response}
        getPropValue={
          (item) => `${item.firstName} ${item.lastName}`
        }
        showAll={showList}
        descending={sort}
        isOpen={openOrderDropDown}
        updateIsOpen={(openMe) => {
          setOpenOrderDropDown(openMe)
        }}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {
          setAnotherUser(highlightedItem)
        }}
        onSelect={(element,item) => {
          console.log(element,item)
        }}
      />


    </section>
  );
}

export default Order;
