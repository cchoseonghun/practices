import React from 'react';

const StreamExample = () => {
  const handleClick = async () => {
    const response = await fetch('index1.html');
    const fileBlob = await response.blob();
    const fileStream = fileBlob.stream();

    try {
      const uploadResponse = await fetch('http://192.168.0.114:4000/api/v1/meta-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: fileStream,
      });

      if (uploadResponse.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data:', uploadResponse.status, uploadResponse.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Send Data</button>
    </div>
  );
};

export default StreamExample;
