import { browser, protractor, element, by } from 'protractor';

import { WorkspacePage } from '../pages/workspace/workspace.po';
import { Utils } from '../utils/utils';

describe('New Workspace', () => {
  let workspace: WorkspacePage;
  let utils: Utils;
  let wsName;

  beforeAll(() => {
    workspace = new WorkspacePage();
    utils = new Utils();
    wsName = utils.getRandomName('workspace');
  });

  it('should create New workspace', () => {
    let ec = protractor.ExpectedConditions;
    let e = workspace.newworkspace;
    workspace.createNewWorkspace();
    browser.wait(ec.visibilityOf(e), 15000);
    expect(workspace.getName(workspace.newworkspace)).toEqual('New workspace 2');
  });

  it('should add all components', () => {
    workspace.openComponentList();
    workspace.componentListItem.each((element) => {
      element.click();
      browser.sleep(1000);
    });

    expect(workspace.countItem.count()).toEqual(8);
  });

  it('should clear workspace', () => {
    let ec = protractor.ExpectedConditions;
    let e = workspace.clearWorkspaceButton;
    workspace.clearWorkspace();
    browser.wait(ec.invisibilityOf(e), 15000);
    expect(workspace.workspaceComponent.count()).toEqual(0);
  });

  it('10 workspaces are added. plus icon is not displayed', () => {
    for (let i = 0; i < 8; i++) {
      workspace.createNewWorkspace();
    }

    expect(workspace.plusIcon.isPresent()).toBe(false);
  });

  it('should edit workspace name', () => {
    let ec = protractor.ExpectedConditions;
    let e = workspace.editInput;
    workspace.editName(workspace.workspaceitems);
    browser.wait(ec.visibilityOf(e), 15000);
    expect(workspace.editInput.isEnabled()).toBe(true);
    workspace.editInput.clear();
    workspace.editInput.sendKeys(wsName);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(workspace.activeworkspace.getText()).toContain(wsName);
  });

  it('should close workspace', () => {
    let ec = protractor.ExpectedConditions;
    let e = element(by.cssContainingText('.workspace-name', wsName));
    browser.wait(ec.visibilityOf(e), 15000);
    workspace.closeWorkspace();
    browser.sleep(5000);
    browser.wait(ec.invisibilityOf(e), 15000);
    expect(e.isPresent()).toBe(false);
  });
});
