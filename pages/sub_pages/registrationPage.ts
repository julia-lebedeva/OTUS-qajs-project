import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';
export class RegistrationPage extends BasePage {
    readonly page: Page;
    readonly personalButton: Locator;
    readonly corporateButton: Locator;
    readonly card: Locator;
    readonly tariffDescription: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.personalButton = page.getByRole('link', { name: 'Для частных лиц' });
        this.corporateButton = page.getByRole('link', { name: 'Для организаций' });

        this.card = page.locator('#main__anchor >> ul').nth(1).getByRole('listitem');
        this.registerButton = page.getByRole('button', { name: /Купить билет/ });
        this.tariffDescription = page.locator('.RegistrationCategoryContent_registrationCategoryContent__description__SJzYI');
    }

    async register() {
        this.registerButton.click();
    }
    
    async goToPersonalPage() {
        this.personalButton.click();
    };

    async goToCorporatePage() {
        this.corporateButton.click();
    };
}