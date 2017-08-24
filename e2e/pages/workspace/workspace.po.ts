import { browser, element, $, $$, by } from 'protractor';


export class WorkspacePage {
  private workspacename = $$('.workspace-name');
  private panelcontainer = $('.panel-container');
  workspaceitem = $$('.workspace__item');
  activeworkspace = $('.workspace__item--active');
  defaultworkspace = this.workspacename.first();
  newworkspace = this.workspacename.last();
  watchlist = this.panelcontainer.element(by.cssContainingText('.workspace-item--header-item', 'Watchlist Component'));
  news = this.panelcontainer.element(by.cssContainingText('.workspace-item--header-item', 'News Component'));
  openpositions = this.panelcontainer.element(by.cssContainingText('.workspace-item--header-item', 'Open Positions List'));
  workspaceComponent = $$('.workspace-item--header-item');
  closeIcon = this.activeworkspace.$('.icon-close');
  dropdownIcon = this.activeworkspace.$('.icon-chevron');
  componentList = $('.components-list');
  componentListItem = $$('.components-list__item');
  countItem = $$('.item-count');
  clearWorkspaceButton = $('.clear-workspace');
  plusIcon = $('.plus-icon');
  createnewworkspace = $('.create-new-workspace');
  workspaceInfo = $('.workspace-info');
  editIcon = $('.icon-edit');
  editInput = $('input[type = "Text"]');

  getName(workspace) {
    return workspace.getText();
  }

  openDefaultWorkspace() {
    return this.defaultworkspace.click();
  }

  createNewWorkspace() {
    return this.createnewworkspace.click();
  }

  openWorkspace(item) {
    return this.workspaceitem.get(item);
  }

  openComponentList() {
    return this.dropdownIcon.click();
  }

  getComponents() {
    return this.componentListItem.getText();
  }

  clearWorkspace() {
    return this.clearWorkspaceButton.click();
  }

  editName(item) {
    item.count().then((cnt) => {
      let p = Math.floor(Math.random() * cnt + 1);
      this.workspaceitem.get(p).click().then(() => {
        browser.sleep(5000);
        this.dropdownIcon.click().then(() => {
          browser.sleep(5000);
          return this.editIcon.click();
        });
      });
    });
  }

  closeWorkspace() {
    return this.closeIcon.click();
  }
}
