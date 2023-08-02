import puppeteer, { Browser, Page } from 'puppeteer';
import { FeedSelectorsInterface } from '../interface/feed-selectors.interface';
import * as process from 'process';
import { CssSelector } from "./selectors/css-selector";

export abstract class FeedReader {
    private browser!: Browser;
    private page!: Page;
    protected selectors!: FeedSelectorsInterface;
    protected cssSelectors: CssSelector[] = [];
    protected constructor(protected url: string, selectors: FeedSelectorsInterface) {
        for (const selectorName in selectors) {
            this.cssSelectors.push(
                new CssSelector(
                    selectors[selectorName].query,
                    selectorName,
                    selectors[selectorName].attribute,
                ),
            );
        }
    }

    public async initializeReader() {
        this.browser = await puppeteer.launch({
            headless: process.env.PUPPETER_HEADLESS === 'true',
        });
        this.page = await this.browser.newPage();
        await this.page.goto(this.url);
    }

    public getSelectors() {
        return this.selectors;
    }

    public async read(): Promise<CssSelector[]> {
        const list: any = {};
        for (const index in this.cssSelectors) {
            const selectorQuery = this.cssSelectors[index].getCssQuery();
            const fieldName = this.cssSelectors[index].getFieldName();
            const fieldAttribute = this.cssSelectors[index].getAttribute();
            list[fieldName] = await this.page.evaluate(
                (selectorQueryString, fieldAttributeString) => {
                    return Array.from(
                        [...document.querySelectorAll(selectorQueryString)] as HTMLElement[],
                        (ele: HTMLElement) => ele[fieldAttributeString as keyof HTMLElement],
                    );
                },
                selectorQuery,
                fieldAttribute,
            );
            this.cssSelectors[index].setValue(list[fieldName]);
        }
        await this.browser.close();
        const news: any[] = [];
        for (const selectorId in this.cssSelectors) {
            const selector = this.cssSelectors[selectorId];
            const newsLength = selector.getValue().length;
            for (let i = 0; i <= newsLength - 1; i++) {
                if (news[i]) {
                    if (news[i] && news[i][selector.getFieldName()]) {
                        news[i][selector.getFieldName()] = selector.getValue()[i];
                    } else if (news[i] && !news[i][selector.getFieldName()]) {
                        news[i][selector.getFieldName()] = {};
                        news[i][selector.getFieldName()] = selector.getValue()[i];
                    }
                } else {
                    news[i] = {};
                    news[i][selector.getFieldName()] = {};
                    news[i][selector.getFieldName()] = selector.getValue()[i];
                }
            }
        }
        return news;
    }
}