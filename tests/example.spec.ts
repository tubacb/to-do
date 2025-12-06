import { test, expect } from '@playwright/test';

test('verify to do creation', async ({ page }) => {
  await page.goto('https://todo-app.tallinn-learning.ee/');
  await page.getByTestId('text-input').fill('buy milk');
  await page.getByTestId('text-input').press('Enter');
await expect(page.getByTestId('todo-item-label')).toBeVisible();
});

test('verify two items creation', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy milk');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy bread');
    await page.getByTestId('text-input').press('Enter');
    await expect(page.getByTestId('todo-item-label')).toHaveCount(2);
});

test('verify "Completed" filter', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy milk');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy bread');
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('link',{ name:'Completed' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
});

test('verify "Active" filter', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy milk');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy bread');
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('link',{ name:'Active' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(2);
});

test('verify "All" filter', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy milk');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy bread');
    await page.getByTestId('text-input').press('Enter');
    await page.getByRole('link',{ name:'All' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(2);
});

test('verify "active" and "completed" filters for completed task', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy eggs');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-toggle').click();
    await page.getByRole('link',{ name:'Active' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
});

test('verify "Clear Completed" filter', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy eggs');
    await page.getByTestId('text-input').press('Enter');
    await expect(page.getByRole('button',{ name:'Clear Completed' })).toBeVisible()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(1);
    await page.getByTestId('todo-item-toggle').click();
    await page.getByRole('button',{ name:'Clear Completed' }).click()
    await expect(page.getByTestId('todo-item-label')).toHaveCount(0);
});

test('verify item can be deleted', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy eggs');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-label').hover();
    await page.getByTestId('todo-item-button').click();
});

test('verify after item deletion only one item is visible', async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
    await page.getByTestId('text-input').fill('buy milk');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('buy bread');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-label').filter({ hasText:'buy milk' }).hover();
    await page.getByRole('button',{ name:'×' }).click();
    await expect(page.getByTestId('todo-item-label')).toHaveCount(1);
});

