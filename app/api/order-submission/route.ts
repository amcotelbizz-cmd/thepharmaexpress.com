import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const url = 'https://script.google.com/macros/s/AKfycbye7ro1idkVguqau2vBPx1LeZ4L5pbGgPPSiCPox_pOVp3EsiXadMkthbUmNbiOyn64/exec';

  const formData = await request.formData();
  const params = new URLSearchParams();
  
  // Add each form field to the URL parameters
  for (const [key, value] of formData.entries()) {
    params.append(key, value as string);
  }

  try {
    console.log('Sending order data to Google Sheet:', params.toString());
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'follow',
    });

    // Log the response status
    console.log('Google Sheet order submission response status:', response.status);
    
    // Handle non-JSON responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.log('Non-JSON response from order submission:', text);
      // Try to parse as JSON anyway in case content-type is incorrect
      try {
        data = JSON.parse(text);
      } catch (e) {
        // Handle Java object references which indicate a successful submission
        if (text.includes('[Ljava.lang.Object;@')) {
          data = { 
            success: true, 
            message: "Order submitted successfully to Google Sheets.",
            note: "The Google Apps Script returned Java object references which indicates data was received."
          };
        } else {
          data = { success: response.ok, message: text };
        }
      }
    }

    // Log the response data
    console.log('Google Sheet order response data:', data);
    
    if (!response.ok && !data.success) {
      return new Response(
        JSON.stringify({ error: 'Order submission to Google Sheet failed', details: data }),
        { status: response.status || 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(JSON.stringify(data || { success: true, message: "Order submitted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in order submission to Google Sheet:', error);
    return new Response(
      JSON.stringify({ error: 'Order submission failed', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
