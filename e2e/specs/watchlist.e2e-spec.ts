import { browser, protractor, element, by } from 'protractor';
import { ProtractorExpectedConditions } from 'protractor/built/expectedConditions';

import { WorkspacePage } from '../pages/workspaces/workspace.po';
import { WatchlistPage } from '../pages/watchlists/watchlist.po';

import { getRandomString, getRandomName } from '../utils/utils';


describe('Watchlists', () => {
    let workspace: WorkspacePage;
    let watchlist: WatchlistPage;
    let watchlistName: string;
    let watchlistNewName:string;
    let expectedConditions: ProtractorExpectedConditions;
    let componentsTitles: Array<string>;


    beforeAll(() => {
        workspace = new WorkspacePage();
        watchlist = new WatchlistPage();
        watchlistName = `New watchlist ${getRandomString()}`;
        watchlistNewName = `New watchlist ${getRandomString()}`;
        expectedConditions = protractor.ExpectedConditions;
    });

    it('User should be able to add Watchlists component to a workspace', () => {
        browser.sleep(3000);
        workspace.createNewWorkspace();
        browser.sleep(7000);
        workspace.openComponentList();
        browser.sleep(3000);
        workspace.addComponent(workspace.getComponentListItemByTitle('Watchlist'));
        browser.sleep(3000);
        expect(watchlist.getWatchlistElement().isDisplayed()).toBeTruthy();
    });

    it('Contains popular markets watchlist', () => {
        expect(watchlist.getPopularMarketsTitleElement().isDisplayed()).toBeTruthy();
    });

    it('User should be able to create custom watchlist', () => {
        watchlist.createWatchlist(watchlistName);
        browser.sleep(3000);
        expect(watchlist.getWatchlistByTitle(watchlistName).isDisplayed()).toBeTruthy();
    });

    it('User should be able to rename custom watchlist', () => {
        watchlist.renameWatchlist(watchlistName, watchlistNewName);
        browser.sleep(3000);
        expect(watchlist.getWatchlistByTitle(watchlistNewName).isDisplayed()).toBeTruthy();
    });

    

});
