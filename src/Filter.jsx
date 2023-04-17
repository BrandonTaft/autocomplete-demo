import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import axios from 'axios';
import './App.css';

function Filter() {
  const [isOpen, setIsOpen] = useState();
  const [user, setUser] = useState();
  const [response, setResponse] = useState();
  const [filter, setFilter] = useState(true)
  
  const toggleFilter = (() => {
    setFilter(filter => !filter)
  })


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
  })

  return (
    <section className='filter'>
      <div className='column'>
      <span>Sort By:</span>
      <button className='ignore btn' onClick={toggleFilter}>{filter === false ? 'I.D.' : 'NAME'}</button>
      </div>
      <AutoComplete
        list={response}
        getPropValue={
          filter === false ? (listName) => listName.id.slice(-5) : (listName) => `${listName.firstName} ${listName.lastName}`
        }
       
        showAll={true}
        updateIsOpen={(updatedState) => {
          setIsOpen(updatedState)
        }}
        isOpen={isOpen}
        handleHighlightedItem={(highlightedElement, highlightedItem) => {

          setUser(highlightedItem)
        }}
      />


    </section>
  );
}

export default Filter;
