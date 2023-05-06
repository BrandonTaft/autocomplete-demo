import { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import Preview from './Preview';
import Numbers from './Numbers';
import Filter from './Filter';
import Dynamic from './Dynamic';
import Order from './Order';
import Submit from './Submit';
import Style from './Style';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

function App() {
  const [response, setResponse] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [codeString, setCodeString] = useState("");
  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openDynamic, setOpenDynamic] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [filter, setFilter] = useState(true)
  const [show, setShow] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [user, setUser] = useState();
  const [number, setNumber] = useState();
  const [card, setCard] = useState([]);
  const [display, setDisplay] = useState([]);
  const [numberArray, setNumberArray] = useState([])

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

    setNumberArray([...Array(52).keys()])
    const cards = new Array(52);
    for (let i = 0; i < cards.length; i++) {
      cards[i] = i;
    }

    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♠︎', '♥︎', '♣︎', '♦︎'];

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
          <span className="close-btn" onClick={() => setShowPopUp(!showPopUp)}>CLOSE</span>
          <SyntaxHighlighter language="jsx" style={dracula} >
            {codeString}
          </SyntaxHighlighter>
        </div>
        : null
      }
      <div className='header'>
        <h1 className='green'>AUTOCOMPLETE DEMO</h1>
      </div>
      <div className='App-content'>
        <section className='preview-section'>
          {!open && !openFilter && !openDynamic && !openCard && !openOrder && !openStyle && !showSubmit ?
            <img src={logo} className="App-logo" alt="logo" />
            : null
          }
          {user && (open || openFilter || openDynamic || openOrder || showSubmit) ?
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
          {card && (openDynamic || openStyle) && show ?
            <>
              <div className='preview-display'>
                <div className='card' style={{ color: card.color % 2 === 0 ? 'black' : 'red' }}>
                  <div className='top-left'>
                    <span >{card.value}</span>
                    <span className='suit-top' >{card.suit}</span>
                  </div>
                  <span className='middle-card'>{card.value}</span>
                  <div className='bottom-right'>
                    <span >{card.value}</span>
                    <span className='suit-top'>{card.suit}</span>

                  </div>
                </div>
              </div>
            </>
            : null}
          {number && openCard && show ?
            <>
              <div className='preview-display'>
                <div className='card' style={{ color: 'black' }}>
                  <span className='middle-card'>{number}</span>
                </div>
              </div>
            </>
            : null}


        </section>
        <Dynamic
          response={response}
          setAnotherUser={setUser}
          setShow={setShow}
          setCard={setCard}
          display={display}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpen}
          openAnotherDropDown={openDynamic}
          setOpenAnotherDropDown={setOpenDynamic}
          numberArray={numberArray}
          setShowSubmit={setShowSubmit}
        />
        <Filter
          response={response}
          filter={filter}
          setFilter={setFilter}
          setAnotherUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpen}
          openFilterDropDown={openFilter}
          setOpenFilterDropDown={setOpenFilter}
          setShowSubmit={setShowSubmit}
        />
        <Preview
          response={response}
          setUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          openDropDown={open}
          setOpenDropDown={setOpen}
          setOpenFilterDropDown={setOpenFilter}
          setOpenAnotherDropDown={setOpenDynamic}
          setOpenCardDropDown={setOpenCard}
          setOpenOrderDropDown={setOpenOrder}
          setOpenSubmitDropDown={setOpenSubmit}
          setOpenStyle={setOpenStyle}
          setShowSubmit={setShowSubmit}
        />
        <Submit
          response={response}
          setAnotherUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpen}
          openSubmitDropDown={openSubmit}
          setOpenSubmitDropDown={setOpenSubmit}
          setShowSubmit={setShowSubmit}
        />
        <Numbers
          setShowPopUp={setShowPopUp}
          showPopUp={showPopUp}
          setShow={setShow}
          setCodeString={setCodeString}
          setNumber={setNumber}
          setOpenDropDown={setOpen}
          openCardDropDown={openCard}
          setOpenCardDropDown={setOpenCard}
          setShowSubmit={setShowSubmit}
        />
        <Order
          response={response}
          setAnotherUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpen}
          openOrderDropDown={openOrder}
          setOpenOrderDropDown={setOpenOrder}
          setShowSubmit={setShowSubmit}
        />

        <Style
          setShowPopUp={setShowPopUp}
          showPopUp={showPopUp}
          setShow={setShow}
          setCodeString={setCodeString}
          setCard={setCard}
          display={display}
          numberArray={numberArray}
          setOpen={setOpen}
          openStyle={openStyle}
          setOpenStyle={setOpenStyle}
          setShowSubmit={setShowSubmit}
        />
      </div>
    </>
  );
}
export default App;
