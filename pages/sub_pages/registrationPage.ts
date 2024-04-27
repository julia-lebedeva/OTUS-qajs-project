import { FrameLocator, expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class RegistrationPage extends BasePage {
    readonly page: Page;
    readonly personalButton: Locator;
    readonly corporateButton: Locator;
    readonly card: Locator;
    readonly tariffDescription: Locator;
    readonly onlinePersonalButton: Locator;
    readonly onlineCorporateButton: Locator;
    readonly widgetContents: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;

        this.personalButton = page.getByRole('link', { name: 'Для частных лиц' });
        this.corporateButton = page.getByRole('link', { name: 'Для организаций' });

        this.card = page.locator('#main__anchor >> ul').nth(1).getByRole('listitem');
        this.tariffDescription = page.locator('.RegistrationCategoryContent_registrationCategoryContent__description__SJzYI');
        this.onlinePersonalButton = page.locator('#personal-online-popup-btn');
        this.onlineCorporateButton = page.locator('#corporate-online-popup-btn');
        // this.widgetContents = this.page.frameLocator("//iframe[contains(@name, 'popup')]").locator('#eventreg_form');
        this.widgetContents = this.page.locator('#eventreg_form');
    }

    async register(locator: Locator) {
        await locator.click();
    }

    async goToPersonalPage() {
        this.personalButton.click();
    };

    async goToCorporatePage() {
        this.corporateButton.click();
    };
}