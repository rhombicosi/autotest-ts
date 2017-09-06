import { browser, protractor, element, by } from 'protractor';
import { ProtractorExpectedConditions } from 'protractor/built/expectedConditions';

import { WorkspacePage } from '../pages/workspaces/workspace.po';

import { getRandomString, getRandomName } from '../utils/utils';


describe('My Workspaces', () => {
  let workspace: WorkspacePage;
  let workspaceName: string;
  let expectedConditions: ProtractorExpectedConditions;
  let componentsTitles: Array<string>;


  beforeAll(() => {
    workspace = new WorkspacePage();
    workspaceName = `New workspace ${getRandomString()}`;
    // workspaceName = getRandomString();
    expectedConditions = protractor.ExpectedConditions;

    componentsTitles = [
      'Watchlist',
      'Chart',
      'News feed',
      'Open positions',
      'Active orders',
      'Economic calendar',
      'Trade history',
      'Order history'
    ];
  });

//   beforeEach(() => {
//     workspaceName = `New workspace ${getRandomString()}`;
//   });

  it('should contain Default workspace', () => {
    expect(workspace.getName(workspace.getWorkspaceDefaultElement())).toEqual('Default workspace');
  });

  describe('Default workspace', () => {
    xit('should contain Watchlist Component', () => {
      expect(workspace.getWatchListComponentElement().isPresent()).toBeTruthy();
    });

    xit('should contain News Component', () => {
      expect(workspace.getNewsComponentElement().isPresent()).toBeTruthy();
    });

    xit('should contain Open Positions Component', () => {
      expect(workspace.getOpenPositionsComponentElement().isPresent()).toBeTruthy();
    });

    it('should not contain X button', () => {
      expect(workspace.getCloseIconElement().isPresent()).toBeFalsy();
    });

    it('should contain the list of components', () => {
      workspace.openComponentList();

      expect(workspace.getComponentsTitles()).toEqual(componentsTitles);
    });

    it('should add all components', () => {
      workspace.addAllComponents();

      expect(workspace.countComponents()).toEqual(8);
    });

    it('should clear workspace', () => {
      workspace.clearWorkspace();

      expect(workspace.countComponents()).toEqual(0);
    });
  });

  describe('New Workspace', () => {
    it('should add New workspace', () => {
      let element = workspace.getWorkspaceNewElement();

      workspace.createNewWorkspace();
      browser.wait(expectedConditions.visibilityOf(element));

      expect(workspace.getName(workspace.getWorkspaceNewElement())).toEqual('New workspace 2');
    });

    it('should add all components', () => {
      workspace.openComponentList();
      workspace.addAllComponents();

      expect(workspace.countComponents()).toEqual(8);
    });

    it('should clear workspace', () => {
      let element = workspace.getClearWorkspaceButtonElement();

      workspace.clearWorkspace();
      browser.wait(expectedConditions.invisibilityOf(element));

      expect(workspace.countComponents()).toEqual(0);
    });

    describe('When 10 workspaces are added', () => {
      it('plus icon should not be displayed', () => {
        let element = protractor.element(by.cssContainingText('.workspace-name', 'New workspace 10'));

        for (let i = 0; i < 8; i++) {
          workspace.createNewWorkspace();
        }

        browser.wait(expectedConditions.visibilityOf(element));

        expect(workspace.getCreateNewWorkspaceLinkElement().isPresent()).toBeFalsy();
      });
    });

    it('should enable workspace name input', () => {
      let element = workspace.getEditInputElement();

      workspace.activateEditName(workspace.getWorkspaceItemsElement());
      browser.wait(expectedConditions.visibilityOf(element));

      expect(workspace.getEditInputElement().isEnabled()).toBeTruthy();
    });

    it('should edit workspace name', () => {
      workspace.getEditInputElement().clear();
      workspace.getEditInputElement().sendKeys(workspaceName);
      browser.actions().sendKeys(protractor.Key.ENTER).perform();

      expect(workspace.getWorkspaceActiveElement().getText()).toContain(workspaceName);
    });

    it('should close workspace', () => {
      let element = workspace.getWorkspaceByName(workspaceName);

      browser.wait(expectedConditions.visibilityOf(element));
      workspace.closeWorkspace();

      // INFO: expectedConditions doesn't work here
      // browser.wait(expectedConditions.invisibilityOf(element));
      browser.sleep(1000);

      expect(element.isPresent()).toBeFalsy();
      workspace.closeAllWorkspaces();
    });
  });
});
