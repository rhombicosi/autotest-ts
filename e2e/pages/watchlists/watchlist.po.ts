import { browser, element, $, $$, by, ElementFinder, ElementArrayFinder, protractor } from 'protractor';
import { promise } from 'selenium-webdriver';


export class WatchlistPage {
    private watchlist = element(by.cssContainingText('.workspace-item--header-item', 'Watchlists'));
    private watchlistHeader = $('.watchlists-header');
    private watchlistTitles = $$('.watchlist-header__title');
    private popularMarkets = $('.curated');
    private popularMarketsTitle = element(by.cssContainingText('.watchlist-header__title--annotation', 'City Index Watch List'));

    private chevronRightIcons = $$('.icon-chevron-right');
    private chevronDownIcons = $$('.icon-chevron-down');
    private trashIcon = $$('.icon-trash-can');

    private addWatchlistLink = $('.add-watchlist__link');
    private watchlistNameInput = $('.add-watchlist__input').$('input[type = "text"]');
    private clearSearchButton = $('.clear-search');

    private marketName = $('.market-name');
    private marketNameInput = $('.add-market--search-container').$('input[type = "text"]');

    private watchlistRename = $('.rename-watchlist');
    private watchlistRenameInput = $('input[name = watchlistNewName]');

    // Elements
    getWatchlistElement(): ElementFinder {
        return this.watchlist;
    }

    getPopularMarketsTitleElement(): ElementFinder {
        return this.popularMarketsTitle;
    }

    // Actions
    getWatchlistByTitle(title: string): ElementFinder {
        return element(by.cssContainingText('.watchlist-header__title', title));
    }

    getWatchlistTitles(): promise.Promise<string> {
        return this.watchlistTitles.getText();
    }

    getWatchlistIds(): promise.Promise<string> {
        return $$('.watchlist-markets-container--list').getAttribute('watchlistid');
    }

    getTrashIcon(title: string): ElementFinder {
        return this.getWatchlistByTitle(title).element(by.xpath('following-sibling::div')).$('.icon-trash-can');
    }
    

    getMarketById(marketId: string): ElementFinder {
        return $(`.[marketid=${marketId}]`);
    }

    getMarketNameInput(watchlistId: promise.Promise<string>): ElementFinder {
        let marketNameInputeLocator: ElementFinder;
        watchlistId.then((id) => {
            marketNameInputeLocator = $(`.div[watchlistid = ${id}]`).marketNameInput;
        });

        return marketNameInputeLocator;
    }

    createWatchlist(name: string): void {
        this.addWatchlistLink.click().then(() => {
            this.watchlistNameInput.sendKeys(name);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        });
    }

    renameWatchlist(currentName: string, newName: string) {
        this.getWatchlistByTitle(currentName).click().then(() => {
            this.watchlistRenameInput.clear();
            this.watchlistRenameInput.sendKeys(newName);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        });
    }

    deleteWatchlist(name: string) {
        return this.getTrashIcon(name).click();
    }

}