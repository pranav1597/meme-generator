import React from "react"
import memesData from "../memesData.js"
import { saveAs } from 'file-saver'

export default function Meme() {
    
    
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemeImages, setAllMemeImages] = React.useState(memesData)
    
    
    function getMemeImage() {
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    const saveImage = meme.randomImage
    const fileName = getFileName(saveImage);

    const downloadImage = () => {
      saveAs(saveImage, fileName) // Put your image url here.
    }

    function getFileName(str){
        return str.substring(str.lastIndexOf('/')+1);
    }


    function handleChange(event){
        const {name,value} = event.target

        setMeme(prevChange => ({
            ...prevChange,
            [name] : value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value= {meme.topText}
                    onChange = {handleChange}
                    />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value= {meme.bottomText}
                    onChange = {handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>

            <div className="dbtn">
                <button className="download" onClick={downloadImage}>Download Image</button>
                </div>
        </main>
    )
}