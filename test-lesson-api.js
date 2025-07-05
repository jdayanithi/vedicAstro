// Simple test script to test the lesson API
const fetch = require('node-fetch');

async function testLessonAPI() {
    const url = 'http://localhost:8080/api/secure/lessons/get-by-topic';
    const payload = { id: 1 };
    
    console.log('Testing lesson API...');
    console.log('URL:', url);
    console.log('Payload:', JSON.stringify(payload));
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        
        const responseText = await response.text();
        console.log('Response:', responseText);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testLessonAPI();
