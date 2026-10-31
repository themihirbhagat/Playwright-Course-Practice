import { Page } from '@playwright/test';

export class BooksPage {

    readonly page: Page;

    constructor(page: Page) {
    this.page = page;
    }

    async goto() {
    await this.page.goto('http://localhost:3000/books');
    }

    async searchForBook(bookTitle: string) {
    await this.page.fill('#search-box', bookTitle);
    await this.page.press('#search-box', 'Enter');
    }
    
    async getBooks() {
        return await this.page.locator('.book-title');
    }
    
    bookTitle(title: string) {
        return this.page.locator(`text=${title}`);
    }
  
    // TODO: Implement the method `bookAuthor(author: string)` that locates the author's name
    bookAuthor(author: string) {
        return this.page.locator(`//p[contains(normalize-space(),"${author}")]`);
    }
    
    // TODO: Implement the method `selectCategory(category: string)` that selects the given category
    async selectCategory(category: string) { 
        await this.page.selectOption('select#categories', category);
    }
    
    // TODO: Implement the method `getBookTitles` that gets the array of titles. 
    async getBookTitles(): Promise<any> { 
        return await this.page.locator('.book-title').allTextContents();
    }
}