import { FeedSelectorsInterface } from "./interface/feed-selectors.interface";

export class FeedDomain {
    private id: string;
    private name: string;
    private url: string;
    private selectors: FeedSelectorsInterface;

    public constructor(
        id: string,
        name: string,
        url: string,
        selectors: FeedSelectorsInterface,
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.selectors = selectors;
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