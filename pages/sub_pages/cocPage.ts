import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class CocPage extends BasePage {
    readonly page: Page;
    readonly codeTitle: Locator;
    readonly safeHarborTitle: Locator;
    readonly codeBody: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.codeTitle = page.getByRole('heading', { name: 'Code of Conduct' });
        this.codeBody = page.getByText('На конференциях недопустимы');
        this.safeHarborTitle = page.getByRole('heading', { name: 'Safe Harbor Statement' });
    }
}
