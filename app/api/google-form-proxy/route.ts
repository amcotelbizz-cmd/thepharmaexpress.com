import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const url = 'https://script.google.com/macros/s/AKfycbw9vJcJfHbQsrJuFCcJbjyWmo1ugGJ2Qk32ikR6ys0P7TZ2o7Lnm9uwiGqj3ZD2ggdi/exec';
  const formData = await request.formData();
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    params.append(key, value as string);
  }

  try {
    console.log('Sending data to Google Sheet:', params.toString());
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'follow',
    });

    // Log the response status
    console.log('Google Sheet response status:', response.status);
    
    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.log('Non-JSON response:', text);
      
      // Check for Java object references which indicate a successful submission
      // but improper response formatting in the Google Apps Script
      if (text.includes('[Ljava.lang.Object;@')) {
        console.log('Detected Java object references in response');
        data = { 
          success: true, 
          message: "Form submitted successfully, but Google Apps Script returned object references instead of formatted data.", 
          rawResponse: text 
        };
      } else {
        // Try to parse as JSON anyway in case content-type is incorrect
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = { success: response.ok, message: text };
        }
      }
    }

    // Log the response data
    console.log('Google Sheet response data:', data);
    
    // If we have Java object references but response is OK, it's likely a successful submission
    // with improperly formatted response from Google Apps Script
    if (data && data.rawResponse && data.rawResponse.includes('[Ljava.lang.Object;@')) {
      console.log('Processing submission with Java object references as success');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Form submitted successfully to Google Sheets.",
          note: "The Google Apps Script returned Java object references which indicates data was received."
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Google Sheet submission failed', details: data }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in Google Sheet proxy:', error);
    return new Response(
      JSON.stringify({ error: 'Proxy failed', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
