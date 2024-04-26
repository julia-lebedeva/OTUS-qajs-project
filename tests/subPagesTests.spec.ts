import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { CocPage } from '../pages/sub_pages/cocPage';
import { SpeakersPage } from '../pages/sub_pages/speakersPage';

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
  