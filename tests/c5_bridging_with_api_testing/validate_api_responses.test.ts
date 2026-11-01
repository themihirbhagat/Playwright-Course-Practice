import { test, expect } from '@playwright/test';

// =================================================================
// ============ Testing API Response Structure =====================
// =================================================================

test('validate API response structure', async ({ request }) => {
  const response = await request.get('http://localhost:3000/api/books');
  const data = await response.json();
  
  data.forEach((book: any) => {
    expect(book).toMatchObject({
      id: expect.any(Number),
      // TODO: Add the check for the title property data type here
      title: expect.any(String),
      // TODO: Add the check for the author property data type here
      author: expect.any(String),
      // TODO: Add the check for the price property data type here
      price: expect.any(Number),
      // TODO: Add the check for the category property data type here
      category: expect.any(String)
    });
  });
});

// =================================================================
// ============ Master API Response Validation =====================
// =================================================================

// TODO: Write a test named 'check API response for movies'
test('check API response for movies', async ({ request }) => {
  // TODO: Use async function with request object
  // TODO: Fetch data from 'http://localhost:3000/api/movies' endpoint
  const response = await request.get('http://localhost:3000/api/movies');
  // TODO: Parse the response as JSON
  const data = await response.json();
  // TODO: Validate that each movie object has the correct properties and data types:
  data.forEach((book: any) => {
    expect(book).toMatchObject({
      // - 'id' as Number
      id: expect.any(Number),
      // - 'title' as String
      title: expect.any(String),
      // - 'director' as String
      director: expect.any(String),
      // - 'genre' as String
      genre: expect.any(String),
      // - 'releaseYear' as Number
      releaseYear: expect.any(Number)
    });
  });
});