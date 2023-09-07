import { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { a11yDark, atomDark, coldarkCold, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Preview from './Preview';
import Simple from './Simple';
import Numbers from './Numbers';
import Dynamic from './Dynamic';
import Submit from './Submit';
import Errors from './Errors';
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
  const [openSimple, setOpenSimple] = useState(false);
  const [openDynamic, setOpenDynamic] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [openErrors, setOpenErrors] = useState(false);
  const [show, setShow] = useState(true);
  const [showAnimal, setShowAnimal] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [user, setUser] = useState();
  const [number, setNumber] = useState();
  const [animal, setAnimal] = useState();
  const [card, setCard] = useState([]);
  // eslint-disable-next-line
  const [theme, setTheme] = useState("light")

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
  }, [])


  // const toggleTheme = () => {
  //   if(theme === "dark") {
  //     setTheme('light')
  //   } else if (theme === 'light') {
  //     setTheme('dark')
  //   }
  // }

  return (
    <div className={theme}>
      {showPopUp ?
        <div className='popup'>
          <div className="close-btn" onClick={() => setShowPopUp(!showPopUp)}>CLOSE</div>
          <SyntaxHighlighter language="jsx" style={coldarkDark} >
            {codeString}
          </SyntaxHighlighter>
        </div>
        : null
      }
      <div className='header'>
        <h1 className='app-title'>AUTOCOMPLETE DEMO</h1>
        {/* <div class="title horizontal-bar"></div> */}
        {/* <button className='ignore btn switch' onClick={toggleTheme}>{theme.toUpperCase()}</button> */}
      </div>
      <div className='App-content'>
        <section className='preview-section'>
          {!open && !openDynamic && !openCard && !showSubmit && !showAnimal ?
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
          {((number && openCard) || (animal && showAnimal)) && show ?
            <>
              <div className='preview-display'>
                <div className='card' style={{ color: 'black' }}>
                  { number && <span className='middle-card'>{number}</span>}
                  { animal && <span className='middle-card animal'>{animal}</span>}
                </div>
              </div>
            </>
            : null}


        </section>
        <Simple
          setShowPopUp={setShowPopUp}
          showPopUp={showPopUp}
          setShow={setShow}
          setAnimal={setAnimal}
          setCodeString={setCodeString}
          openSimple={openSimple}
          setOpenSimple={setOpenSimple}
          setOpenDropDown={setOpen}
          setShowSubmit={setShowSubmit}
          setShowAnimal={setShowAnimal}
          setNumber={setNumber}
        />
        <Dynamic
          response={response}
          setUser={setUser}
          setShow={setShow}
          setCard={setCard}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpen}
          openAnotherDropDown={openDynamic}
          setOpenAnotherDropDown={setOpenDynamic}
          setShowSubmit={setShowSubmit}
          setAnimal={setAnimal}
          setShowAnimal={setShowAnimal}
        />
        <Preview
          response={response}
          setUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          openDropDown={open}
          setOpenDropDown={setOpen}
          setShowSubmit={setShowSubmit}
          setOpenCard={setOpenCard}
          setOpenSubmit={setOpenSubmit}
          setOpenDynamic={setOpenDynamic}
          setAnimal={setAnimal}
          setShowAnimal={setShowAnimal}
        />
        <Submit
          response={response}
          setUser={setUser}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          setCodeString={setCodeString}
          setOpenDropDown={setOpen}
          openSubmitDropDown={openSubmit}
          setOpenSubmitDropDown={setOpenSubmit}
          setShowSubmit={setShowSubmit}
          setAnimal={setAnimal}
          setShowAnimal={setShowAnimal}
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
          setAnimal={setAnimal}
          setShowAnimal={setShowAnimal}
        />
        <Errors
          setShowPopUp={setShowPopUp}
          showPopUp={showPopUp}
          setShow={setShow}
          setCodeString={setCodeString}
          openErrors={openErrors}
          setOpenErrors={setOpenErrors}
          setOpenDropDown={setOpen}
          setNumber={setNumber}
          setShowSubmit={setShowSubmit}
          setAnimal={setAnimal}
          setShowAnimal={setShowAnimal}
        />
      </div>
    </div>
  );
}
export default App;
