import { browser, $ } from 'protractor';
import { promise } from 'selenium-webdriver';


export class LoginPage {
  private username = $('#login-username');
  private password = $('#login-password');
  private submit = $('#login-submit');

  navigateTo(): promise.Promise<any> {
    return browser.get(browser.baseUrl);
  }

  signIn(login: string, password: string): promise.Promise<void> {
    this.username.sendKeys(login);
    this.password.sendKeys(password);

    return this.submit.click();
  }
}
