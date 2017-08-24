import { browser } from 'protractor';

import { LoginPage } from '../pages/login/login.po';
import { loginPageData } from '../data.example';

describe('Login page', function() {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should sign in', () => {
    page.signIn(loginPageData.login, loginPageData.password);
    browser.sleep(7000);
    expect(browser.driver.getCurrentUrl()).toContain('workspaces');
  });
});
