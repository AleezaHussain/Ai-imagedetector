import React, { useState } from 'react';
import BasicButtons from '../components/uploadbutton';
import UploadImage from './api/imageupload'; 

export default function Home() {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [sentence, setSentence] = useState(''); // State for the generated sentence

  // Handler for image upload completion
  const handleImageUpload = (imageUrl, imageTags, generatedSentence) => {
    console.log("Image URL:", imageUrl);
    console.log("Image Tags:", imageTags);
    console.log("Generated Sentence:", generatedSentence); // Log generated sentence

    setImage(imageUrl);
    setTags(imageTags);
    setSentence(generatedSentence); // Set the generated sentence
  };

  return (
    <div>
      <div>
        <h1>Image<span className='scribe'> Scribe </span></h1>
      </div>
      <video autoPlay muted loop className="videoBackground">
        <source src="/2611250-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className='upload-button'>
        <BasicButtons onUpload={handleImageUpload} />
        
      </div>
    </div>
  );
}
