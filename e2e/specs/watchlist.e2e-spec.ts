import { browser, protractor, element, by } from 'protractor';
import { ProtractorExpectedConditions } from 'protractor/built/expectedConditions';

import { WorkspacePage } from '../pages/workspaces/workspace.po';
import { WatchlistPage } from '../pages/watchlists/watchlist.po';

import { getRandomString, getRandomName } from '../utils/utils';


describe('Watchlists', () => {
    let workspace: WorkspacePage;
    let watchlist: WatchlistPage;
    let expectedConditions: ProtractorExpectedConditions;
    let componentsTitles: Array<string>;


    beforeAll(() => {
        workspace = new WorkspacePage();
        watchlist = new WatchlistPage();
        expectedConditions = protractor.ExpectedConditions;
    });

    it('User is able to add Watchlists component to a workspace', () => {
        browser.sleep(5000);
        workspace.createNewWorkspace();
        browser.sleep(5000);
        workspace.openComponentList();
        browser.sleep(5000);
        workspace.addComponent(workspace.getComponentListItemByTitle('Watchlist'));
        browser.sleep(5000);
        expect(watchlist.getWatchlistsElement().isDisplayed).toBeTruthy();
    });

});
