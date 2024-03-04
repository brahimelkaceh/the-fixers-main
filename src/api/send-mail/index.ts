// In your React component or any client-side code

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export async function sendDataToApi(data: any): Promise<void> {
  try {
    const apiEndpoint = '/api'; // Assuming your API route is /api/sendData

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may include additional headers if required
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData: ApiResponse = await response.json();
      console.log('API Response:', responseData);
      // Do something with the successful response data
    } else {
      const errorData: ApiResponse = await response.json();
      console.error('API Error:', errorData);
      // Handle the error or show a user-friendly message
    }
  } catch (error) {
    console.error('Client-Side Error:', error);
    // Handle unexpected client-side errors
  }
}
