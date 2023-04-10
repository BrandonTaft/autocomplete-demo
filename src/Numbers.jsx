import { useState, useRef, useEffect, useMemo } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import './App.css';

function Numbers() {
  const [isOpen, setIsOpen] = useState();
  const numbers = useRef([]);
  const toggleDropDown = () => {
    setIsOpen(isOpen ? false : true)
  }
  let x = 30
  const numberArray = useMemo(() => getArray(x), [x])


  return (
      <section className='content-container' >
        <AutoComplete
          list={numberArray}
          showAll={true}
          updateIsOpen={(updatedState) => {
            setIsOpen(updatedState)
          }}
          isOpen={isOpen}
        />
      </section>
  );

  function getArray(x) {
    return (
      [...Array(x).keys()]
    )
  }
}

export default Numbers;
