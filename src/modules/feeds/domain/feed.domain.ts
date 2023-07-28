export class FeedDomain {
    private _id: string;
    private _name: string;
    private _url: string;

    public constructor(
        id: string,
        name: string,
        url: string,
    ) {
        this._id = id;
        this._name = name;
        this._url = url;
    }

    public getName(): string {
        return this._name;
    }

    public getId(): string {
        return this._id;
    }

    public getUrl(): string {
        return this._url;
    }


    public setId(value: string) {
        this._id = value;
    }

    public setName(value: string) {
        this._name = value;
    }

    public setUrl(value: string) {
        this._url = value;
    }
}