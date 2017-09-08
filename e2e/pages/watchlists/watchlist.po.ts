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
    private watchlistNameInput = $('.add-watchlist__input').$('input[text = "text"]');
    private clearSearchButton = $('.clear-search');
    
    private marketName = $('.market-name');

    getWatchlistTitles(): promise.Promise<string> {
        return this.watchlistTitles.getText();
    }

    getWatchlistId(): promise.Promise<string> {
        return $('.watchlist-markets-container--list').getAttribute('watchlistid');        
    }

    getMarketById(marketId: string): ElementFinder {
        return $(`[marketid=${marketId}]`);
    }    
}