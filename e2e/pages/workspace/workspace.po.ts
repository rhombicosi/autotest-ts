import { browser, protractor, element, $, $$, by } from 'protractor';


export class WorkspacePage {
  workspaceMyLink = $('[routerlink="/workspaces"]');
  workspaceNames = $$('.workspace-name');
  panelContainer = $('.panel-container');
  workspaceitems = $$('.workspace__item');
  activeworkspace = $('.workspace__item--active');
  defaultworkspace = this.workspaceNames.first();
  newworkspace = this.workspaceNames.last();
  watchlist = this.panelContainer.element(by.cssContainingText('.workspace-item--header-item', 'Watchlist Component'));
  news = this.panelContainer.element(by.cssContainingText('.workspace-item--header-item', 'News Component'));
  openpositions = this.panelContainer.element(by.cssContainingText('.workspace-item--header-item', 'Open Positions List'));
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
    return this.workspaceitems.get(item);
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
      this.workspaceitems.get(p).click().then(() => {
        let ec = protractor.ExpectedConditions;
        let e = this.workspaceitems.get(p);
        browser.wait(ec.visibilityOf(e), 15000);
        this.dropdownIcon.click().then(() => {
          let ec = protractor.ExpectedConditions;
          let e = this.editIcon;
          browser.wait(ec.visibilityOf(e), 15000);
          return this.editIcon.click();
        });
      });
    });
  }

  closeWorkspace() {
    return this.closeIcon.click();
  }
}
