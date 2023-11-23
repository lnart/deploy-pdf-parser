
export const validateToken = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  
    if (response.ok) {
      return true;
    } else {
      throw new Error('Token validation failed');
    }
  };

  export const uploadFile = async (file: string | Blob) => {
    const formData = new FormData();
    formData.append('file', file);
  
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/upload`, {
      method: 'POST',
      body: formData,
    });
  };


  export const fetchUploadedFiles = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/uploads`);
    const files = await response.json();
    return files;
  };

  export const deleteFile = async (filename: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/delete/${filename}`, {
      method: 'DELETE',
    });
  };
  