import { browser, element, $, $$, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { promise } from 'selenium-webdriver';


export class WatchlistPage {
    private watchlist = element(by.cssContainingText('.workspace-item--header-item','Watchlists'));
    private watchlistHeader = $('.watchlists-header');
    private watchlistTitles = $$('.watchlist-header__title');
    private popularMarkets = $('.curated');

    private chevronRightIcons = $$('.icon-chevron-right');
    private chevronDownIcons = $$('.icon-chevron-down');
    private trashIcon = $$('.icon-trash-can');

    private addWatchlistLink = $('.add-watchlist__link'); 
    private watchlistNameInput = $('.add-watchlist__input').$('input[type = "text"]');
    private clearSearchButton = $('.clear-search');
    
    private marketName = $('.market-name');
    private marketNameInput = $('.add-market--search-container').$('input[type = "text"]');

    // Elements
    getWatchlistsElement(): ElementFinder {
        return element(by.cssContainingText('.workspace-item--header-item','Watchlists'));
    }

    getWatchlistTitles(): promise.Promise<string> {
        return this.watchlistTitles.getText();
    }

    getWatchlistIds(): promise.Promise<string> {
        return $$('.watchlist-markets-container--list').getAttribute('watchlistid');        
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
}