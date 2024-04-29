import { test, expect } from '@playwright/test';
import { CfpPage } from '../pages/sub_pages/cfpPage';
import { RegistrationPage } from '../pages/sub_pages/registrationPage';
import { MainPage } from '../pages/mainPage';
import { users } from '../fixtures/.authData';
import { data } from '../fixtures/testData';

test.only('trial', async({ page }) => {
    const mainPage = new MainPage(page);
    const registrationPage = new RegistrationPage(page);
   
    await mainPage.open();
    await mainPage.goToRegisterPage(mainPage.menuPurchaseItem);
    await registrationPage.registerButton.nth(0).click();
    await expect(registrationPage.form).toBeVisible();
  })

test('should be able to subscribe for news', async({ page }) => {
    const mainPage = new MainPage(page);
    const registrationPage = new RegistrationPage(page);
   
    await mainPage.open();
    await expect(mainPage.newsSection).toBeVisible()
    await mainPage.subscribe(`${users[0].email}`);
    await expect(mainPage.newsSection).toContainText(`${data.newsSectionText}`);
    await expect(registrationPage.form).toBeVisible();
  })

test('should be able to submit proposal', async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const mainPage = new MainPage(page);
    const cfpPage = new CfpPage(page);
    
    await mainPage.open();
    await mainPage.goToCfpPage();
    await expect(cfpPage.cfpBanner).toBeVisible();
    // Переход к форме подачи заявки    
    await cfpPage.submitProposal();     
    const newPage = await context.waitForEvent('page');
    await expect(newPage).toHaveTitle(`${data.cfpTitile}`);
  })

test.describe('Should be able buy a ticket', () => {
test('should be able to buy a personal ticket', async({page }) => {
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

  test('should be able to buy a corporate ticket', async({ page }) => {
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