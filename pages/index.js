import React, { useState, useRef } from 'react';
import BasicButtons from '../components/uploadbutton';
import UploadImage from './api/imageupload'; 

export default function Home() {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [sentence, setSentence] = useState(''); 
  const fileInputRef = useRef(null); 

  // Handler for image upload completion
  const handleImageUpload = (imageUrl, imageTags, generatedSentence) => {
    console.log("Image URL:", imageUrl);
    console.log("Image Tags:", imageTags);
    console.log("Generated Sentence:", generatedSentence); // Log generated sentence

    setImage(imageUrl);
    setTags(imageTags);
    setSentence(generatedSentence); // Set the generated sentence
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input when button is clicked
    }
  };

  return (
    <div>
      <h1>Image<span className='scribe'> Scribe </span></h1>
      <video autoPlay muted loop className="videoBackground">
        <source src="/2611250-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className='upload-button'>
        <BasicButtons onUploadClick={handleButtonClick} />
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              // Handle the image upload here
              handleImageUpload(file);
            }
          }} 
          style={{ display: 'none' }} // Hide the file input
          ref={fileInputRef} // Attach the ref here
        />
        {/* Move the UploadImage component out of this div */}
        {/* <UploadImage onUpload={handleImageUpload} /> */}
      </div>
    </div>
  );
}
