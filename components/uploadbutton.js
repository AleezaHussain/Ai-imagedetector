import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({ onUploadClick }) { // Accepting onUploadClick prop
  return (
    <Stack spacing={2} direction="row">
      <Button 
        variant="contained" 
        className='upload-button' 
        onClick={onUploadClick} // Correctly using the onUploadClick prop
      >
        Upload Here
      </Button>
    </Stack>
  );
}
