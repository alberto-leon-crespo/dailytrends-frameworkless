import {id} from "inversify";

export class NewDomain {
    private id: string;
    private author: string;
    private title: string;
    private link: string;
    private feed_id: string;

    public constructor(
        newId: string,
        author: string,
        title: string,
        link: string,
        // tslint:disable-next-line:variable-name
        feed_id: string,
    ) {
        this.id = newId;
        this.author = author;
        this.title = title;
        this.link = link;
        this.feed_id = feed_id;
    }


    getId(): string {
        return this.id;
    }

    setId(value: string) {
        this.id = value;
    }

    getAuthor(): string {
        return this.author;
    }

    setAuthor(value: string) {
        this.author = value;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(value: string) {
        this.title = value;
    }

    getLink(): string {
        return this.link;
    }

    setLink(value: string) {
        this.link = value;
    }


    getFeedId(): string {
        return this.feed_id;
    }

    setFeedId(value: string) {
        this.feed_id = value;
    }
}