import { browser } from 'protractor';

import { WorkspacePage } from '../pages/workspace/workspace.po';

describe('Default Workspace', function() {
  let workspace: WorkspacePage;

  beforeAll(() => {
    workspace = new WorkspacePage();
    browser.driver.get('http://localhost:4200/');
    browser.ignoreSynchronization = true;
    //browser.waitForAngularEnabled(false);
  });

  it('should contain Default workspace', () => {
    browser.sleep(3000);
    expect(workspace.getName(workspace.defaultworkspace)).toEqual('Default workspace');
  });

  it('should contain Watchlist Component', () => {
    expect(workspace.watchlist.isPresent()).toBe(true);
  });

  it('should contain News Component', () => {
    expect(workspace.news.isPresent()).toBe(true);
  });

  it('should contain Open Positions Component', () => {
    expect(workspace.openpositions.isPresent()).toBe(true);
  });

  it('should not contain X button', () => {
    expect(workspace.closeIcon.isPresent()).toBe(false);
  });

  it('should contain the list of components', () => {
    workspace.openComponentList();

    expect(workspace.getComponents())
    .toEqual(['Watchlist', 'Chart', 'News feed', 'Open positions', 'Active orders', 'Economic calendar', 'Trade history', 'Order history']);
  });

  it('should add all components', () => {
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
});
