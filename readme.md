# TodoMVC Testing Framework

This project was done as an assignment for Houseware internship application. This repository contains a testing framework for the TodoMVC app using Playwright and @playwright/test. The framework is designed to test various aspects of the TodoMVC application, including CRUD operations and toggle functionalities.

## Test Cases

### Test Group 1 : CRUD Operations

#### Before Test Method 
Add 2 dummy items to the List and check if they are correctly added by verifying the number of items and their text value

#### 1. Check Addition of New Item

This test case checks the addition of a new item to the TodoMVC app. It verifies that the new item is correctly added to the list.

#### 2. Check Deletion of Item

This test case checks the deletion of a todo item. It hovers over the first item, clicks the delete button, and ensures that the item is removed from the list.

#### 3. Check Updation of Todo Item

This test case checks the updation of a todo item. It double-clicks on the first item, updates the text, and ensures that the item is correctly updated in the list.

### Test Group 2 : Toggle Functionalities

#### Before Test Method : 
Add 3 dummy items to the List and check if they are correctly added by verifying the number of items and their text value

#### 4. Check Toggle for Single Item

This test case checks the toggle functionality for a single todo item. It toggles the completion status, navigates to the Active and Completed sections, and ensures that the items are correctly filtered based on their completion status.

#### 5. Check Toggle All Button

This test case checks the "Toggle All" button functionality. It toggles all items, verifies that all items are completed, and then checks the behavior in the Active and Completed sections.

## Project Structure


- **`/testConstants`**: Defines constants used across tests.
- **`/tests`**: Contains test files organized by functionality.

## Dependencies

- **@playwright/test**: Testing library for end-to-end testing.
- **constants**: Node.js built-in module for constants.

