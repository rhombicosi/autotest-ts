import { browser, protractor } from 'protractor';

import { LoginPage } from '../pages/login/login.po';
import { WorkspacePage } from '../pages/workspaces/workspace.po';

import { loginPageData } from '../data';


describe('Login page', () => {
  let page: LoginPage;
  let workspace: WorkspacePage;

  beforeEach(() => {
    page = new LoginPage();
    workspace = new WorkspacePage();
    page.navigateTo();
  });

  it('should sign in', () => {
    let expectedConditions = protractor.ExpectedConditions;
    let element = workspace.getMyWorkspacesLinkElement();

    page.signIn(loginPageData.login, loginPageData.password);
    browser.wait(expectedConditions.visibilityOf(element));

    expect(browser.getCurrentUrl()).toContain('workspaces');
  });
});
