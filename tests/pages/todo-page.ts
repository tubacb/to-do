import {expect, Locator, Page} from "@playwright/test";

export class PageObject {
    readonly page: Page
    readonly inputText: Locator
    readonly itemLabel: Locator
    readonly itemToggle: Locator
    readonly itemButton: Locator
    readonly completedLink: Locator
    readonly allLink: Locator
    readonly activeLink: Locator
    readonly clearCompletedButton: Locator

    constructor(page:Page) {
        this.inputText = page.getByTestId('text-input');
        this.itemLabel = page.getByTestId('todo-item-label')
        this.itemToggle = page.getByTestId('todo-item-toggle')
        this.itemButton = page.getByTestId('todo-item-button')
        this.completedLink = page.getByRole('link',{ name:'Completed' })
        this.allLink = page.getByRole('link',{ name:'All' })
        this.activeLink = page.getByRole('link',{ name:'Active' })
        this.clearCompletedButton = page.getByRole('button',{ name:'Clear Completed' })
    }

    async addITem(text:string) {
        await this.fillText(text);
        await this.addText();
    }

    async fillText(text:string) {
        await this.inputText.fill(text);
    }

    async addText() {
        await this.inputText.press('Enter');
    }

    async expectedCountItems(item:number) {
        await expect(this.itemLabel).toHaveCount(item);
    }

    async clickLink(link:Locator) {
        await link.click();
    }

    async deleteItemByName(deletedItem: string,page:Page) {
        await this.itemLabel.filter({ hasText:deletedItem }).hover();
        await page.getByRole('button',{ name:'×' }).click();

    }
}

