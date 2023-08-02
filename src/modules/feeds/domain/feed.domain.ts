import { FeedSelectorsInterface } from "./interface/feed-selectors.interface";
import { FeedReader } from "./reader/feed.reader";

export class FeedDomain extends FeedReader {
    private id: string;
    private name: string;

    public constructor(
        id: string,
        name: string,
        url: string,
        selectors: FeedSelectorsInterface,
    ) {
        super(url, selectors);
        this.id = id;
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): string {
        return this.id;
    }

    public getUrl(): string {
        return this.url;
    }

    public getSelectors(): FeedSelectorsInterface {
        return this.selectors;
    }

    public setId(value: string) {
        this.id = value;
    }

    public setName(value: string) {
        this.name = value;
    }

    public setUrl(value: string) {
        this.url = value;
    }

    public setSelectors(value: FeedSelectorsInterface) {
        this.selectors = value;
    }
}