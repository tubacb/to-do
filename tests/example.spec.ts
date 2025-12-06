import { test, expect } from '@playwright/test';
import {PageObject} from "./pages/todo-page";

let pageObject: PageObject;

test.beforeEach(async ({ page }) => {
    await page.goto(process.env.APP_URL);
    pageObject=new PageObject(page);
})
test('verify to do creation', async ({  }) => {
    await pageObject.addITem('buy milk');
    await expect(pageObject.itemLabel).toBeVisible();
});

test('verify two items creation', async ({  }) => {
    await pageObject.addITem('buy milk');
    await pageObject.addITem('buy bread');
    await pageObject.expectedCountItems(2);
});

test('verify "Completed" filter', async ({  }) => {
    await pageObject.addITem('buy milk');
    await pageObject.addITem('buy bread');
    await pageObject.clickLink(pageObject.completedLink)
    await pageObject.expectedCountItems(0);
});

test('verify "Active" filter', async ({  }) => {
    await pageObject.addITem('buy milk');
    await pageObject.addITem('buy bread');
    await pageObject.clickLink(pageObject.activeLink)
    await pageObject.expectedCountItems(2);
});

test('verify "All" filter', async ({  }) => {
    await pageObject.addITem('buy milk');
    await pageObject.addITem('buy bread');
    await pageObject.clickLink(pageObject.allLink)
    await pageObject.expectedCountItems(2);
});

test('verify "active" and "completed" filters for completed task', async ({  }) => {
    await pageObject.addITem('buy eggs');
    await pageObject.clickLink(pageObject.itemToggle);
    await pageObject.clickLink(pageObject.activeLink)
    await pageObject.expectedCountItems(0);
});

test('verify "Clear Completed" filter', async ({  }) => {
    await pageObject.addITem('buy eggs');
    await expect(pageObject.clearCompletedButton).toBeVisible();
    await pageObject.expectedCountItems(1);
    await pageObject.clickLink(pageObject.itemToggle);
    await pageObject.clickLink(pageObject.clearCompletedButton);
    await pageObject.expectedCountItems(0);
});

test('verify item can be deleted', async ({  }) => {
    await pageObject.addITem('buy eggs');
    await pageObject.itemLabel.hover();
    await pageObject.clickLink(pageObject.itemButton);
});

test('verify item can be reactivated after completed', async ({  }) => {
    await pageObject.addITem('buy eggs');
    await pageObject.clickLink(pageObject.itemToggle);
    await pageObject.clickLink(pageObject.activeLink);
    await pageObject.expectedCountItems(0);
    await pageObject.clickLink(pageObject.allLink);
    await pageObject.clickLink(pageObject.itemToggle);
    await pageObject.clickLink(pageObject.activeLink);
    await pageObject.expectedCountItems(1);
});

test('verify after item deletion only one item is visible', async ({ page }) => {
    await pageObject.addITem('buy milk');
    await pageObject.addITem('buy bread');
    await pageObject.deleteItemByName('buy milk',page)
    await pageObject.expectedCountItems(1);
});

