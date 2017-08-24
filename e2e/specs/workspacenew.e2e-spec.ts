import { browser, protractor, element, by } from 'protractor';

import { WorkspacePage } from '../pages/workspace/workspace.po';
import { Utils } from '../utils/utils';

describe('New Workspace', function() {
  let workspace: WorkspacePage;
  let utils: Utils;
  let wsName;

  beforeAll(() => {
    workspace = new WorkspacePage();
    utils = new Utils();
    wsName = utils.getRandomName('workspace');
    //browser.get('/workspaces/default');
    browser.ignoreSynchronization = true;
    //browser.waitForAngularEnabled(false);
  });

  it('should create New workspace', () => {
    browser.sleep(5000);
    workspace.createNewWorkspace();
    browser.sleep(5000);
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
    workspace.clearWorkspace();
    browser.get('/workspaces/default');
    browser.sleep(7000);
    expect(workspace.workspaceComponent.count()).toEqual(0);
  });

  it('10 workspaces are added. plus icon is not displayed', () => {
    for (let i = 0; i < 8; i++) {
      workspace.createNewWorkspace();
    }

    browser.sleep(7000);
    expect(workspace.plusIcon.isPresent()).toBe(false);
  });

  it('should edit workspace name', () => {
    workspace.editName(workspace.workspaceitem);
    browser.sleep(5000);
    expect(workspace.editInput.isEnabled()).toBe(true);
    workspace.editInput.clear();
    workspace.editInput.sendKeys(wsName);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    expect(workspace.activeworkspace.getText()).toContain(wsName);
  });

  it('should close workspace', () => {
    workspace.closeWorkspace();
    browser.sleep(5000);
    expect(element(by.cssContainingText('.workspace-name', wsName)).isPresent()).toBe(false);
  });
});
