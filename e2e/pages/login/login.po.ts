import { browser, element, by } from 'protractor';


export class LoginPage {
  private username = element(by.id('login-username'));
  private password = element(by.id('login-password'));
  private submit = element(by.id('login-submit'));

  navigateTo() {
    return browser.get('/login');
    //return browser.driver.get('https://trade-qat.loginandtrade.com/webtrader');
  }

  signIn(login: string, password: string) {
    this.username.sendKeys(login);
    this.password.sendKeys(password);

    return this.submit.click();
  }
}
