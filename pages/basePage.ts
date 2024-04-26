import { expect, type Locator, type Page } from '@playwright/test';
import { data } from '../fixtures/testData';

export class BasePage {
    readonly page: Page;
    readonly toMainPageItem: Locator;
    
    readonly menuScheduleItem: Locator;
    readonly menuSpeakersItem: Locator;

    readonly menuMoreButton: Locator;
    readonly menuOfflineItem: Locator;
    readonly menuExpertsItem: Locator;
    readonly menuHostsItem: Locator;
    readonly menuCocItem: Locator;
    readonly menuRulesItem: Locator;

    readonly menuPurchaseItem: Locator;
    readonly menuCfpItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toMainPageItem = page.getByLabel('Основная').getByRole('link', { name: `${data.conferenceName}` });

        this.menuPurchaseItem = page.getByLabel('Важные разделы').getByRole('link', { name: 'Купить билет' });
        this.menuCfpItem = page.getByLabel('Важные разделы').getByRole('link', { name: 'Стать спикером'});

        this.menuScheduleItem = page.getByLabel('Основные разделы').getByRole('link', { name: 'Расписание' });
        this.menuSpeakersItem = page.getByLabel('Основные разделы').getByRole('link', { name: 'Спикеры' });
        this.menuMoreButton = page.getByLabel('Еще');
        this.menuOfflineItem = page.getByLabel('Основная').getByRole('link', { name: 'Офлайн-часть' });
        this.menuExpertsItem = page.getByLabel('Основная').getByRole('link', { name: 'Эксперты' });
        this.menuHostsItem = page.getByLabel('Основная').getByRole('link', { name: 'Ведущие' });
        this.menuCocItem = page.getByLabel('Основная').getByRole('link', { name: 'Code of Conduct' });
        this.menuRulesItem = page.getByLabel('Основная').getByRole('link', { name: 'Правила участия' });
    }
    
    async returnToMainPage () {
        await this.toMainPageItem.click();
    }
    
    async goToSchedulePage(locator: Locator) {
        await locator.click();
    } 

    async goToSpeakersPage () {
        await this.menuSpeakersItem.click();
    }

    async goToCocPage() {
        await this.menuMoreButton.click();
        await this.menuCocItem.click();
    }  
    
    async goToOfflinePage(locator: Locator) {
        await locator.click();
    }

    async goToCfpPage() {
        await this.menuCfpItem.click();
    }

    async goToRegisterPage(locator: Locator) {
        await locator.click();
    }
}
