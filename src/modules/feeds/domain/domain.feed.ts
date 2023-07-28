export class DomainFeed {
    private id: string;
    private name: string;
    protected url: string;

    public constructor(
        id: string,
        name: string,
        url: string,
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
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
}