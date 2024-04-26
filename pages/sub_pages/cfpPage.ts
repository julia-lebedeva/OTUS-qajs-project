import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class CfpPage extends BasePage {
    readonly page: Page;
    readonly cfpBanner: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.cfpBanner = page.getByRole('heading', { name: 'Прием заявок на Mobius 2024 Autumn' });
        this.submitButton = page.getByRole('link', { name: 'Подать заявку' }).first();
    }

    async submitProposal() {
        this.submitButton.click();
    }
}
