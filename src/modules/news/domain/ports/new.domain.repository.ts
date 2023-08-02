import { NewDomain } from '../new.domain';
import {Optional} from "typescript-optional";

export interface NewDomainRepository {
    getAllNews(): Promise<NewDomain[]>;
    /**
     * Returns feed filtered by id
     * @returns a `Feed` object containing the data.
     * @param id string
     */
    getNew(id: string): Promise<Optional<NewDomain>>;

    createNew(feed: NewDomain): Promise<Optional<NewDomain>>;

    deleteNew(feedId: string): Promise<Optional<NewDomain>>;

    updateNew(feedId: string, feed: NewDomain): Promise<Optional<NewDomain>>;
}