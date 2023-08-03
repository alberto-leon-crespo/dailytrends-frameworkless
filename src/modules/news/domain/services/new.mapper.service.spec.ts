import { NewMapperService } from "./new.mapper.service";
import { NewEntity } from '../../infraestructure/entity/new.entity';
import { NewDomain } from '../new.domain';
import {bootstrap, tearDown} from "../../../../../test/bootstrap";
import * as express from "express";
import {Container} from "inversify";
import {Types} from "mongoose";

let container: Container;
let service: NewMapperService;

describe('NewMapperService', () => {

    beforeAll( async () => {
        const app = await bootstrap(__filename);
        container = app.container;
        service = container.get<NewMapperService>(NewMapperService)
    });

    afterAll(async () => {
        await tearDown(__filename);
    });

    it('should convert entity to domain', () => {
        const entity: Partial<NewEntity> = {
            _id: '1',
            author: 'Author',
            title: 'Title',
            link: 'Link',
            feed_id: 'Feed',
        };

        const domain = service.toDomain(entity as NewEntity);

        expect(domain.isPresent()).toBeTruthy();
        expect(domain.get().getId()).toEqual(entity._id);
        expect(domain.get().getAuthor()).toEqual(entity.author);
        expect(domain.get().getTitle()).toEqual(entity.title);
        expect(domain.get().getLink()).toEqual(entity.link);
        expect(domain.get().getFeedId()).toEqual(entity.feed_id);
    });

    it('should convert domain to schema', () => {
        const domainNewid = new Types.ObjectId().toString();
        const domainFeedId = new Types.ObjectId().toString();
        const domain = new NewDomain(domainNewid, 'Author', 'Title', 'Link', domainFeedId);

        const schema = service.toSchema(domain);

        expect(schema._id.toString()).toEqual(domain.getId());
        expect(schema.author).toEqual(domain.getAuthor());
        expect(schema.title).toEqual(domain.getTitle());
        expect(schema.link).toEqual(domain.getLink());
        expect(schema.feed_id.toString()).toEqual(domain.getFeedId());
    });

    it('should convert a list of entities to domains', () => {
        const entities: NewEntity[] = [
            { _id: '1', author: 'Author 1', title: 'Title 1', link: 'Link 1', feed_id: 'Feed 1' } as NewEntity,
            { _id: '2', author: 'Author 2', title: 'Title 2', link: 'Link 2', feed_id: 'Feed 2' } as NewEntity,
        ];

        const domains = service.toDomains(entities);

        expect(domains.length).toEqual(entities.length);
        expect(domains[0].getId()).toEqual(entities[0]._id);
        expect(domains[0].getAuthor()).toEqual(entities[0].author);
        expect(domains[0].getTitle()).toEqual(entities[0].title);
        expect(domains[0].getLink()).toEqual(entities[0].link);
        expect(domains[0].getFeedId()).toEqual(entities[0].feed_id);
    });
});
