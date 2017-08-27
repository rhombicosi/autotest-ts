import { browser, protractor, $ } from 'protractor';

import { LoginPage } from '../pages/login/login.po';
import { WorkspacePage } from '../pages/workspace/workspace.po';
import { loginPageData } from '../data.example';

describe('Login page', () => {
  let page: LoginPage;
  let workspace: WorkspacePage;

  beforeAll(() => {
    page = new LoginPage();
    workspace = new WorkspacePage();
    browser.get(browser.baseUrl);
  });

  it('should sign in', () => {
    let ec = protractor.ExpectedConditions;
    let e = workspace.workspaceMyLink;

    page.signIn(loginPageData.login, loginPageData.password);
    browser.wait(ec.visibilityOf(e), 15000);
    expect(browser.driver.getCurrentUrl()).toContain('workspaces/default');
  });
});
