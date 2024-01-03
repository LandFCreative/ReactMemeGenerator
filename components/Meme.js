import React from "react"

// save the meme-related data as an object (meme)
export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "walk into Mordor",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
// Create a state for all memes images. Leave blank to add to it.
    const [allMemes, setAllMemes] = React.useState([])

// useEffect: Onfirst render of Meme component, fetch api to link.
// With incoming data => save just the array part of that data to the `allMemes` state

  // useEffect takes a function as its parameter. If that function
  // returns something, it needs to be a cleanup function. Otherwise,
  // it should return nothing. 
   
    React.useEffect(()=> {
            fetch ("https://api.imgflip.com/get_memes")
            .then (res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    

  // Create a function to get a new random meme using Math.Random and cycling through the length of allMemes. 
  function getMemeImage () {
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNum].url;
    setMeme((prevState) => {
       return {...prevState,randomImage: url };
  });
}

// Create a function to get ahold of the buttonclick event.  
  function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevState => ({
            prevState,
            [name]: value
        }))
    }

// JSX area for rendering html
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                Get a new meme image
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}