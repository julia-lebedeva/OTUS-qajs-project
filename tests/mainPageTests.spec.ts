import { test, expect } from '@playwright/test'
import { MainPage } from '../pages/mainPage';
import { SchedulePage } from '../pages/sub_pages/schedulePage';
import { data } from '../fixtures/testData';

test.describe('Check main page sections', () => {
  test('should have Hero Block with 2 buttons', async({ page }) => {
    const mainPage = new MainPage(page);
    const schedulePage = new SchedulePage(page);

    await mainPage.open();
    await expect(mainPage.heroBlockSection).toBeVisible();
    await expect(mainPage.heroBlockSection).toContainText(`${data.heroBlockText}`);
// Проверка кнопки "Расписание"
    await expect(mainPage.heroBlockScheduleButton).toBeVisible();
    await mainPage.goToSchedulePage(mainPage.heroBlockScheduleButton);
    await expect(page).toHaveURL('/schedule/days/');
    await schedulePage.returnToMainPage();
// Проверка кнопки "Купить билет"
    await expect(mainPage.heroBlockBuyButton).toBeVisible();
    await mainPage.goToRegisterPage(mainPage.heroBlockBuyButton);
    await expect(page).toHaveURL('/registration/personal/');
    })

  test('should have offline section and to go to offline page', async({ page }) => {
      const mainPage = new MainPage(page);
      
      await mainPage.open();
      await expect(mainPage.offlineSection).toBeVisible();
      await expect(mainPage.offlineSection).toContainText(`${data.offlineSectionText}`);
// Проверка кнопки "Подробнее"
      await expect(mainPage.detailsButton).toBeVisible();
      await mainPage.goToOfflinePage(mainPage.detailsButton);
      await expect(page).toHaveURL('/offline/');
    })

  test('should have schedule section', async({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.open();
      await expect(mainPage.scheduleSection).toBeVisible();    
    })
  
  test('should have news section', async({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.open();
      await expect(mainPage.newsSection).toBeVisible();
    })

    test('should have speakers section', async({ page }) => {
      const mainPage = new MainPage(page);
      await mainPage.open();
      await expect(mainPage.speakersSection).toBeVisible();  
    })
  })