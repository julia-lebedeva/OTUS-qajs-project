import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../pages/basePage';


export class MainPage extends BasePage {
    readonly page: Page;
    readonly loginButton: Locator;

    readonly heroBlockSection: Locator;
    readonly heroBlockBuyButton: Locator;
    readonly heroBlockScheduleButton: Locator;

    readonly offlineSection: Locator;
    readonly detailsButton: Locator;

    readonly scheduleSection: Locator;
    readonly speakersSection: Locator;
    readonly newsSection: Locator;
    readonly emailField: Locator;
    readonly subscribeButton: Locator;
    readonly subscriptionAlert: Locator;
    

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.loginButton = page.getByRole('link', { name: 'Войти' });

        this.heroBlockSection = page.locator('.HomeHero_homeHero__content__TMqfr');
        this.heroBlockBuyButton = page.locator('.HomeHero_homeHero__content__TMqfr').getByRole('link', { name: 'Купить билет' });
        this.heroBlockScheduleButton = page.locator('.HomeHero_homeHero__content__TMqfr').getByRole('link', { name: 'Расписание' });

        this.offlineSection = page.locator('.OfflineHero_offlineHero__content__1tu02');
        this.detailsButton = page.getByRole('link', { name: 'Подробнее' });

        this.scheduleSection = page.locator('.HomeTalksByTopic_homeTalksByTopic__container__vA8SW');

        this.newsSection = page.locator('#subscription');
        this.emailField = page.locator('#subscriptionBanner__email');
        this.subscribeButton = page.getByRole('button', { name: 'Подписаться' });

        this.speakersSection = page.locator('.HomeContent_homeContent__persons__Eh0Pz').filter({ hasText: 'Спикеры'});
    }

    async open() {
        await this.page.goto('');
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'Принять' }).click();
    }

    async subscribe(email: string) {
        await this.emailField.fill(email);
        await this.subscribeButton.click();
    }

}