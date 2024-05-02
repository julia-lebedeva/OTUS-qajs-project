import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { CocPage } from '../pages/sub_pages/cocPage';
import { SpeakersPage } from '../pages/sub_pages/speakersPage';
import { RegistrationPage } from '../pages/sub_pages/registrationPage';
import { data } from '../fixtures/testData';

test('check CoC page', async({ page }) => {
    const mainPage = new MainPage(page);
    const cocPage = new CocPage(page);

    await mainPage.open();
// Проверяем, что страница есть и содержит ключевые разделы
    await mainPage.goToCocPage();
    await expect(cocPage.codeTitle).toBeVisible();
    await expect(cocPage.codeBody).toBeVisible();
    await expect(cocPage.safeHarborTitle).toBeVisible();
  })

test('check speakers page', async({ page }) => {
    const mainPage = new MainPage(page);
    const speakersPage = new SpeakersPage(page);
    
    await mainPage.open();
// Проверяем, что страница есть и содержит карточку хотя бы 1 спикера    
    await mainPage.goToSpeakersPage();
    await expect(speakersPage.speakersHeader).toBeVisible();
    const totalNumber = await speakersPage.countSpeakers();
    expect(totalNumber).toBeGreaterThanOrEqual(1);
  })

  test.describe('check registration pages', () => {
    test('check personal tickets page', async({page }) => {
        const mainPage = new MainPage(page);
        const registrationPage = new RegistrationPage(page);
       
        await mainPage.open();
        await mainPage.goToRegisterPage(mainPage.menuPurchaseItem);
        await expect(page).toHaveURL('/registration/personal/');  
        // Поверка страницы покупки персонального билета
        await expect(registrationPage.personalButton).toBeVisible();
        await expect(registrationPage.corporateButton).toBeVisible();
        await expect(registrationPage.tariffDescription).toContainText(`${data.personalREgText}`);
        // Проверка наличия тарифнфх карточек
        const totalNumber = await registrationPage.card.count();
        expect(totalNumber).toBeGreaterThanOrEqual(1);
    
        for (let i=0; i < totalNumber; i++) {
            await expect(registrationPage.registerButton.nth(i)).toBeVisible();
        }
      })
    
      test('check corporate tickets page', async({ page }) => {
        const mainPage = new MainPage(page);
        const registrationPage = new RegistrationPage(page);
        
        await mainPage.open();
        await mainPage.goToRegisterPage(mainPage.menuPurchaseItem);
        await expect(page).toHaveURL('/registration/personal/');  
        await registrationPage.goToCorporatePage();
        // Проверка старницы покупки корпоративного билета
        await expect(page).toHaveURL('/registration/corporate/'); 
        await expect(registrationPage.personalButton).toBeVisible();
        await expect(registrationPage.corporateButton).toBeVisible();
        await expect(registrationPage.tariffDescription).toContainText(`${data.corporateRegText}`);
        // Проверка наличия тарифнфх карточек
        const totalNumber = await registrationPage.card.count();
        expect(totalNumber).toBeGreaterThanOrEqual(1);
        
        for (let i=0; i < totalNumber; i++) {
            await expect(registrationPage.registerButton.nth(i)).toBeVisible();
        }
      })
    })
