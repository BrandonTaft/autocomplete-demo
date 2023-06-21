import { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import Preview from './Preview';
import Numbers from './Numbers';
import Dynamic from './Dynamic';
import Submit from './Submit';
import yellowLogo from './logo.png';
import logo from './logo.svg';
import purpleLogo from './logo-purple.png';
import axios from 'axios';
import './App.css';

SyntaxHighlighter.registerLanguage('jsx', jsx);

function App() {
  const [response, setResponse] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [codeString, setCodeString] = useState("");
  const [open, setOpen] = useState(false);
  const [openDynamic, setOpenDynamic] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [show, setShow] = useState(true);
  const [showSubmit, setShowSubmit] = useState(false);
  const [user, setUser] = useState();
  const [number, setNumber] = useState();
  const [card, setCard] = useState([]);
  const [display, setDisplay] = useState([]);
  const [numberArray, setNumberArray] = useState([]);
  const [theme, setTheme] = useState("dark")

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

  const toggleTheme = () => {
    if(theme === "dark") {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    }
  }

  return (
    <div className={theme}>
      {showPopUp ?
        <div className='popup'>
          <div className="close-btn" onClick={() => setShowPopUp(!showPopUp)}>CLOSE</div>
          <SyntaxHighlighter language="jsx" style={dracula} >
            {codeString}
          </SyntaxHighlighter>
        </div>
        : null
      }
      <div className='header'>
        <h1 className='green'>AUTOCOMPLETE DEMO</h1>
        <button className='ignore btn switch' onClick={toggleTheme}>{theme.toUpperCase()}</button>
      </div>
      <div className='App-content'>
        <section className='preview-section'>
          {!open && !openDynamic && !openCard && !showSubmit ?
            <img 
              src={ theme === 'dark' ? yellowLogo : theme === 'lightest' ? purpleLogo : logo }
              className="App-logo"
              alt="logo"
              width={ theme === 'dark' ? 200 : null}
              height={theme === 'dark' ? 200 : null}
              />
            : null
          }
          {user && (open || openDynamic  || showSubmit ) ?
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
          {card && (openDynamic) && show ?
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
        
        <Preview
          response={response}
          setUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          openDropDown={open}
          setOpenDropDown={setOpen}
          setOpenAnotherDropDown={setOpenDynamic}
          setOpenCardDropDown={setOpenCard}
          setOpenSubmitDropDown={setOpenSubmit}
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
        
        
      </div>
    </div>
  );
}
export default App;
