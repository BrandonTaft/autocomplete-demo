import { useState, useEffect } from 'react';
import { AutoComplete } from 'react-autocomplete-input-component';
import axios from 'axios';
import './App.css';

function Preview() {
    const [isOpen, setIsOpen] = useState();
    const [user, setUser] = useState();
    const [response, setResponse] = useState();

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

    return (
        <section className='preview'>
             <div className="preview-container">
                { user && isOpen ?
                    <>
                        <span className='green'>Name:</span>
                        <span>{user.firstName}</span>
                        <img src={user.picture} alt="profile-pic" width={100} height={100} />
                    </>
                    : ""}
            </div>
            <AutoComplete
                list={response}
                getPropValue={(listName) => listName.firstName}
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

export default Preview;
