const { test, expect } = require("@playwright/test");
const { Input } = require("../src/todo/components/input");
const { ENTER, DUMMY_ITEMS } = require("./testConstants");
const exp = require("constants");
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8080/");
});

// This test checks the basic CRUD Operations on a Todo Item

test.describe("Test fro CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");

    await todoInput.fill(DUMMY_ITEMS[0]);
    await todoInput.press(ENTER);

    await todoInput.fill(DUMMY_ITEMS[1]);
    await todoInput.press(ENTER);

    await expect(page.getByTestId("todo-item-label")).toHaveCount(2);
    await expect(page.getByTestId("todo-item-label")).toHaveText([
      DUMMY_ITEMS[0],
      DUMMY_ITEMS[1],
    ]);
  });
  test("Check addition of new item", async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");
    //add new item
    await todoInput.fill(DUMMY_ITEMS[2]);
    await todoInput.press(ENTER);

    await expect(page.getByTestId("todo-item-label")).toHaveCount(3);
    await expect(page.getByTestId("todo-item-label")).toHaveText(DUMMY_ITEMS);
  });

  test("Check deletion of item", async ({ page }) => {
    // delete item
    const firstTodo = page.getByTestId("todo-item").nth(0);
    firstTodo.hover();
    const deleteButton = page.getByTestId("todo-item-button").nth(0);
    deleteButton.click();

    //Check if deleted
    await expect(page.getByTestId("todo-item-label")).toHaveCount(1);
    await expect(page.getByTestId("todo-item-label")).toHaveText([
      DUMMY_ITEMS[1],
    ]);
  });

  test("Check updation of todo item", async ({ page }) => {
    const firstTodo = page.getByTestId("todo-item").nth(0);
    firstTodo.dblclick();

    const editInput = page.getByTestId("text-input").nth(1);
    await editInput.clear();
    await editInput.fill("Updated Item 1");
    await editInput.press(ENTER);

    await expect(page.getByTestId("todo-item-label")).toHaveCount(2);
    await expect(page.getByTestId("todo-item-label")).toHaveText([
      "Updated Item 1",
      DUMMY_ITEMS[1],
    ]);
  });
});

test.describe("Tests for Toggle Functionalities", () => {
  test.beforeEach(async ({ page }) => {
    const todoInput = page.getByPlaceholder("What needs to be done?");

    await todoInput.fill(DUMMY_ITEMS[0]);
    await todoInput.press(ENTER);

    await todoInput.fill(DUMMY_ITEMS[1]);
    await todoInput.press(ENTER);

    await todoInput.fill(DUMMY_ITEMS[2]);
    await todoInput.press(ENTER);

    await expect(page.getByTestId("todo-item-label")).toHaveCount(3);
    await expect(page.getByTestId("todo-item-label")).toHaveText(DUMMY_ITEMS);
  });

  test("Check toggle for single item", async ({ page }) => {
    //check if all are incomplete
    await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);

    //check first toggle
    const firstToggle = page.getByTestId("todo-item-toggle").nth(0);
    firstToggle.check();
    await expect(page.getByTestId("todo-item")).toHaveClass([
      "completed",
      "",
      "",
    ]);

    //go to active page and check if one less active item
    const activeButton = page.getByText("Active");
    activeButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(2);
    await expect(page.getByTestId("todo-item")).toHaveClass(["", ""]);

    // go to completed and check if one completed item
    const completedButton = page.getByRole("link", { name: "Completed" });
    completedButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(1);
    await expect(page.getByTestId("todo-item")).toHaveClass(["completed"]);

    // go to all page and uncheck the first toggle
    const allButton = page.getByRole("link", { name: "All" });
    allButton.click();
    firstToggle.uncheck();
    await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);

    // go to active and check if all are active
    activeButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(3);
    await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);

    // go to completed and check if none is completed
    completedButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(0);
  });

  test("Check toggle All button", async ({ page }) => {
    //check if all are incomplete
    await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);

    //toggle all
    const toggleAllButton = page.getByTestId("toggle-all");
    await toggleAllButton.click();

    //check if all completed
    await expect(page.getByTestId("todo-item")).toHaveClass([
      "completed",
      "completed",
      "completed",
    ]);

    //check in active section
    const activeButton = page.getByText("Active");
    await activeButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(0);

    //check in completed section
    const completedButton = page.getByRole("link", { name: "Completed" });
    await completedButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(3);
    await expect(page.getByTestId("todo-item")).toHaveClass([
      "completed",
      "completed",
      "completed",
    ]);

    //got to all section
    const allButton = page.getByRole("link", { name: "All" });
    await allButton.click();
    await toggleAllButton.click();
    await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);
    await expect(page.getByTestId("todo-item")).toHaveCount(3);

    //go to active section
    await activeButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(3);
    await expect(page.getByTestId("todo-item")).toHaveClass(["", "", ""]);

    //go to completed section
    await completedButton.click();
    await expect(page.getByTestId("todo-item")).toHaveCount(0);
  });
});
