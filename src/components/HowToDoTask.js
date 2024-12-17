import React, { useState } from 'react';
import axios from 'axios';

const HowToDoTask = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskTask = async () => {
    if (query.trim()) {
      setLoading(true);
      setResponse(''); // Clear previous responses while fetching new data
      try {
        // Replace with your Cohere API key
        const apiKey = 'yk50bTOIIZ5yhbbiHEBQ28sZ8QSScXjzMR8fg3c9'; // Replace with your Cohere API key

        // Cohere endpoint for text generation
        const endpoint = 'https://api.cohere.ai/v1/generate'; 

        // Set up the data payload for Cohere API
        const data = {
          prompt: query, // User's input query
          max_tokens: 150, // Max tokens for the generated response
          temperature: 0.7, // Creativity factor (adjust as needed)
        };

        // Make the request to Cohere's API
        const result = await axios.post(endpoint, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`, // Use Bearer token for authentication
          },
        });

        // Handle the API response
        const cohereResponse = result.data.generations[0].text.trim();
        setResponse(cohereResponse); // Display the generated response
      } catch (error) {
        console.error('Error fetching data from Cohere:', error);
        setResponse('Sorry, there was an error while fetching the response.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="how-to-do-task">
      <h3>How to do a task?</h3>
      <input
        type="text"
        placeholder="Ask how to do a task"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleAskTask} disabled={loading}>
        {loading ? 'Loading...' : 'Ask'}
      </button>
      {response && (
        <div className="response">
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default HowToDoTask;
