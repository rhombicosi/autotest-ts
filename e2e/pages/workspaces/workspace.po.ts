import { browser, element, $, $$, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';


export class WorkspacePage {
  private panelContainer = $('.panel-container');
  private workspaceItems = $$('.workspace__item');
  private workspaceActive = $('.workspace__item--active');
  private workspaceTitles = $$('.workspace-name');
  private workspaceDefault = this.workspaceTitles.first();

  private componentListItems = $$('.components-list__item');
  private workspaceComponents = $$('.workspace-item--header-item');

  private closeIcon = this.workspaceActive.$('.icon-close');
  private closeIcons = $$('.icon-close');
  private dropdownIcon = this.workspaceActive.$('.icon-chevron');
  private clearWorkspaceButton = $('.clear-workspace');
  private createNewWorkspaceLink = $('.create-new-workspace');
  private editIcon = $('.icon-edit');

  private componentHeader = 'workspace-item--header-item';


  // Elements
  getMyWorkspacesLinkElement(): ElementFinder {
    return $('[routerlink="/workspaces"]');
  }

  getWorkspaceItemsElement(): ElementArrayFinder {
    return $$('.workspace__item');
  }

  getWorkspaceActiveElement(): ElementFinder {
    return $('.workspace__item--active');
  }

  getWorkspaceDefaultElement(): ElementFinder {
    return this.workspaceTitles.first();
  }

  getWorkspaceNewElement(): ElementFinder {
    return this.workspaceTitles.last();
  }

  getCreateNewWorkspaceLinkElement(): ElementFinder {
    return $('.create-new-workspace');
  }

  getEditInputElement(): ElementFinder {
    return $('input[type = "Text"]');
  }

  getWatchListComponentElement(): ElementFinder {
    return this.panelContainer.element(by.cssContainingText(`.${this.componentHeader}`, 'Watchlist Component'));
  }

  getNewsComponentElement(): ElementFinder {
    return this.panelContainer.element(by.cssContainingText(`.${this.componentHeader}`, 'News Component'));
  }

  getOpenPositionsComponentElement(): ElementFinder {
    return this.panelContainer.element(by.cssContainingText(`.${this.componentHeader}`, 'Open Positions List'));
  }

  getCloseIconElement(): ElementFinder {
    return this.workspaceActive.$('.icon-close');
  }

  getClearWorkspaceButtonElement(): ElementFinder {
    return $('.clear-workspace');
  }


  // Actions
  getName(workspace: ElementFinder): promise.Promise<string> {
    return workspace.getText();
  }

  openDefaultWorkspace(): promise.Promise<void> {
    return this.workspaceDefault.click();
  }

  createNewWorkspace(): promise.Promise<void> {
    return this.createNewWorkspaceLink.click();
  }

  openComponentList(): promise.Promise<void> {
    return this.dropdownIcon.click();
  }

  getComponentsTitles(): promise.Promise<string> {
    return this.componentListItems.getText();
  }

  addAllComponents(): void {
    this.componentListItems.each((element) => {
      element.click();
    });
  }

  countComponents(): promise.Promise<number> {
    return this.workspaceComponents.count();
  }

  clearWorkspace(): promise.Promise<void> {
    return this.clearWorkspaceButton.click();
  }

  activateEditName(item: ElementArrayFinder): void {
    item.count().then((count) => {
      let workspaceItem = Math.floor(Math.random() * (count - 1) + 1);

      this.workspaceItems.get(workspaceItem).click().then(() => {
        browser.sleep(3000);
        this.dropdownIcon.click().then(() => {
          browser.sleep(3000);

          return this.editIcon.click();
        }).catch((error) => {
          console.error(error);
        });
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  closeWorkspace(): promise.Promise<void> {
    return this.closeIcon.click();
  }

  getWorkspaceByName(name): ElementFinder {
    return element(by.cssContainingText('.workspace-name', name));
  }

  getComponentListItemByTitle(title: string): ElementFinder {
    return $(`span[title = ${title}]`);
  }

  addComponent(component: ElementFinder): promise.Promise<void> {
    return component.click();
  }

  closeAllWorkspaces(): void {
    this.closeIcons.each((element) => {
      element.click();
    });
  }
}
