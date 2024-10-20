import { useState } from 'react';

export default function UploadImage({ onUpload, onButtonClick }) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    setUploading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      setUploading(false);

      // Fetch tags for the uploaded image
      const tagResponse = await fetch('/api/imageTags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: data.secure_url }),
      });

      const tagsData = await tagResponse.json();
      const tagNames = tagsData.result.tags.map(tagObject => tagObject.tag.en);
      console.log('Tags:', tagNames);

      const sentencesResponse = await fetch('/api/sentencesapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: tagNames }),
      });

      const sentencesData = await sentencesResponse.json(); // Get the sentences from the response
      console.log('Generated Sentence:', sentencesData.sentence);
      // Pass the uploaded image URL and sentences to the parent component (index.js)
      onUpload(data.secure_url, tagNames, sentencesData.sentence);
    } catch (error) {
      console.error('Error fetching image tags or sending to sentencesapi:', error);
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={onButtonClick}
        onChange={handleImageUpload}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
