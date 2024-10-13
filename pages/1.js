import UploadImage from './api/imageupload'; 
import { useState } from 'react';


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
    <div className="container">

      <video autoPlay muted loop className="videoBackground">
        <source src="/2611250-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h1>Image Upload</h1>
        <UploadImage onUpload={handleImageUpload} />
        
        {image && (
          <div>
            <p>Image Uploaded Successfully!</p>
            {/* Display the uploaded image */}
            <img src={image} alt="Uploaded" style={{ width: '300px' }} />
            
            {/* Display the image URL */}
            <p>Image URL: <a href={image} target="_blank" rel="noopener noreferrer">{image}</a></p>

            {/* Display the generated sentence */}
            {sentence && (
              <div>
                <h3>Generated Sentence:</h3>
                <p>{sentence}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
