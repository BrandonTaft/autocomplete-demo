import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import axios from 'axios';
import './App.css';

function Preview() {
    const [user, setUser] = useState();
    const [response, setResponse] = useState();
    const [openDropDown, setOpenDropDown] = useState(false);

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
    }, []);

    const toggleDropDown = (() => {
        setOpenDropDown(openDropDown ? false : true)
      })

    return (
        <section className='preview'>
            <div className="preview-container">
                {user && openDropDown ?
                    <div className='preview-display-container'>
                        <div className='preview-display'>
                            <span className='green'>User ID:</span>
                            <span>{user.id.slice(-5)}</span>
                            <span className='green'>Name:</span>
                            <span>{user.firstName}</span>
                            <span>{user.lastName}</span>
                        </div>
                        <div className='vertical-bar'></div>
                        <img src={user.picture} alt="profile-pic" width={100} height={100} />
                    </div>
                    : ""}
            </div>
            <div className='preview-bottom'>
                <div className='column'>
                    <span>Sort By:</span>
                    <button className='ignore btn'  onClick={toggleDropDown} >{openDropDown === false ? 'OPEN' : 'CLOSE'}</button>
                </div>
                <AutoComplete
                    list={response}
                    getPropValue={(listName) => listName.firstName}
                    showAll={true}
                    updateIsOpen={(updatedState) => {
                        setOpenDropDown(updatedState)
                      }}
                      isOpen={openDropDown}
                    handleHighlightedItem={(highlightedElement, highlightedItem) => {

                        setUser(highlightedItem)
                    }}
                />
            </div>
        </section>
    );
}

export default Preview;
