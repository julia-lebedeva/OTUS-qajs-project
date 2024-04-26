import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class SpeakersPage extends BasePage {
    readonly page: Page;
    readonly speakersHeader: Locator;
    readonly speakersListItem: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.speakersHeader = page.getByRole('heading', { name: 'Спикеры' });
        this.speakersListItem = page.locator('.PersonList_personList__ydHvl >> article');
    }

    async countSpeakers() {
        return this.speakersListItem.count();
    }
}