import { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import Preview from './Preview';
import Numbers from './Numbers';
import Filter from './Filter';
import Dynamic from './Dynamic';
import Order from './Order';
import Style from './Style';
import logo from './logo.svg';
import './App.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [codeString, setCodeString] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openFilterDropDown, setOpenFilterDropDown] = useState(false);
  const [openOrderDropDown, setOpenOrderDropDown] = useState(false);
  const [openDynamicDropDown, setOpenDynamicDropDown] = useState(false);
  const [openCardDropDown, setOpenCardDropDown] = useState(false);
  const [filter, setFilter] = useState(true)
  const [show, setShow] = useState(true);
  const [user, setUser] = useState();
  const [card, setCard] = useState([]);
  const [display, setDisplay] = useState([]);
  const [numberArray, setNumberArray] = useState([])

  useEffect(() => {
    setNumberArray([...Array(52).keys()])
    const cards = new Array(52);
    for (let i = 0; i < cards.length; i++) {
      cards[i] = i;
    }

    const values = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split(' ');
    const suits = '♠︎ ♥︎ ♣︎ ♦︎'.split(' ');

    const getProperties = (i) => {
      const color = i / 13 | 0;
      const suit = suits[i / 13 | 0];
      const value = values[i % 13];
      return { suit, value, color };
    };

    setDisplay(cards.map(getProperties))
  }, [])

  return (
    <>
      {showPopUp ?
        <div className='popup'>
          <span className="close-btn" onClick={() => setShowPopUp(!showPopUp)}>Close</span>
          <SyntaxHighlighter language="jsx" style={dracula} >
            {codeString}
          </SyntaxHighlighter>
        </div>
        : null
      }
      <div className='header'>
        <h1>DEMO</h1>
      </div>
      <div className='App-content'>
        <section className='preview-section'>
          {!openDropDown && !openFilterDropDown && !openDynamicDropDown && !openCardDropDown && !openOrderDropDown ?
            <img src={logo} className="App-logo" alt="logo" />
            : null
          }
          {user && (openDropDown || openFilterDropDown || openDynamicDropDown || openOrderDropDown) ?
            <>
              <img src={user.picture} alt="profile-pic" width={140} height={140} />
              <div className='horizontal-bar'></div>
              <div className='preview-display'>
                <span className='green'>User ID:</span>
                <span>{user.id.slice(-5)}</span>
                <span className='green'>Name:</span>
                <span>{user.firstName} {user.lastName}</span>
              </div>
            </>
            : null}
          {card && ( openCardDropDown || openDynamicDropDown ) && show ?
            <>
              <div className='preview-display'>
                <div className='card' style={{color: card.color % 2===0 ? 'black' : 'red'}}>
                <span className='top-left-value'>{card.value}</span>
                <span className='top-left-suit'>{card.suit}</span>
                <span className='middle-card'>{card.value}</span>
                <span className='bottom-right-suit'>{card.suit}</span>
                <span className='bottom-right-value'>{card.value}</span>
                </div>
              </div>
            </>
            : null}

        </section>
        <Preview
          setUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
          setOpenFilterDropDown={setOpenFilterDropDown}
          setOpenAnotherDropDown={setOpenDynamicDropDown}
          setOpenCardDropDown={setOpenCardDropDown}
          setOpenOrderDropDown={setOpenOrderDropDown}
        />
        {/* <section></section> */}
        <Filter
          filter={filter}
          setFilter={setFilter}
          setAnotherUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpenDropDown}
          openFilterDropDown={openFilterDropDown}
          setOpenFilterDropDown={setOpenFilterDropDown}
        />
        <Dynamic
          setAnotherUser={setUser}
          setShow={setShow}
          setCard={setCard}
          display={display}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpenDropDown}
          openAnotherDropDown={openDynamicDropDown}
          setOpenAnotherDropDown={setOpenDynamicDropDown}
          numberArray={numberArray}
        />
        {/* <section></section> */}
        <Order
          setAnotherUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpenDropDown}
          openOrderDropDown={openOrderDropDown}
          setOpenOrderDropDown={setOpenOrderDropDown}
        />
        <Numbers
        setShowPopUp={setShowPopUp}
          showPopUp={showPopUp}
          setShow={setShow}
          setCodeString={setCodeString}
          setCard={setCard}
          display={display}
          numberArray={numberArray}
          setOpenDropDown={setOpenDropDown}
          openCardDropDown={openCardDropDown}
          setOpenCardDropDown={setOpenCardDropDown}
        />
        {/* <section></section> */}
        <Style
        setShowPopUp={setShowPopUp}
          showPopUp={showPopUp}
          setShow={setShow}
          setCodeString={setCodeString}
          setCard={setCard}
          display={display}
          numberArray={numberArray}
          setOpenDropDown={setOpenDropDown}
          openCardDropDown={openCardDropDown}
          setOpenCardDropDown={setOpenCardDropDown}
        />
      </div>
    </>
  );
}
export default App;
