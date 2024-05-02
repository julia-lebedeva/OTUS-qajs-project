import { test, expect } from '@playwright/test';
import { CfpPage } from '../pages/sub_pages/cfpPage';
import { RegistrationPage } from '../pages/sub_pages/registrationPage';
import { MainPage } from '../pages/mainPage';
import { users } from '../fixtures/.authData';
import { data } from '../fixtures/testData';
test('should be able to subscribe for news', async({ page }) => {
    const mainPage = new MainPage(page);
   
    await mainPage.open();
    await expect(mainPage.newsSection).toBeVisible()
    await mainPage.subscribe(`${users[0].email}`);
    await expect(mainPage.newsSection).toContainText(`${data.newsSectionText}`);
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
  test('should be able to buy a personal ticket', async({ page }) => {
    const registrationPage = new RegistrationPage(page);
   
    await registrationPage.open();
    await registrationPage.registerButton.first().click();
    await expect(registrationPage.frame.locator('#eventreg_form')).toBeVisible();
  })

  test('should be able to buy a corporate ticket', async({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    await registrationPage.open();
    await registrationPage.goToCorporatePage();
    await registrationPage.registerButton.first().click();
    await expect(registrationPage.frame.locator('#eventreg_form')).toBeVisible();
  })
})