import { FeedMapperService } from "./feed.mapper.service";
import { FeedEntity } from '../../infraestructure/entity/feed.entity';
import { FeedDomain } from '../feed.domain';
import {FeedSelectorsInterface} from "../interface/feed-selectors.interface";
import {bootstrap, tearDown} from "../../../../../test/bootstrap";
import * as express from "express";
import { Container } from "inversify";
import {Types} from "mongoose";

let container: Container;
let service: FeedMapperService;

const feedSelector: FeedSelectorsInterface = {
    author: {
        query: "query example",
        attribute: "attribute example"
    },
    title: {
        query: "query example",
        attribute: "attribute example"
    },
    link: {
        query: "query example",
        attribute: "attribute example"
    },
};

describe('FeedMapperService', () => {

    beforeAll( async () => {
        const app = await bootstrap(__filename);
        container = app.container;
        service = container.get<FeedMapperService>(FeedMapperService)
    });

    afterAll(async () => {
        await tearDown(__filename);
    });

    it('should convert entity to domain', () => {
        const entity: Partial<FeedEntity> = {
            _id: '1',
            name: 'FeedName',
            url: 'http://example.com',
            selectors: feedSelector
        };

        const domain = service.toDomain(entity as FeedEntity);

        expect(domain.isPresent()).toBeTruthy();
        expect(domain.get().getId()).toEqual(entity._id);
        expect(domain.get().getName()).toEqual(entity.name);
        expect(domain.get().getUrl()).toEqual(entity.url);
        expect(domain.get().getSelectors()).toEqual(entity.selectors);
    });

    it('should convert domain to schema', () => {
        const domainFeedId = new Types.ObjectId().toString();
        const domain = new FeedDomain(domainFeedId, 'FeedName', 'http://example.com', feedSelector);

        const schema = service.toSchema(domain);

        expect(schema._id.toString()).toEqual(domain.getId());
        expect(schema.name).toEqual(domain.getName());
        expect(schema.url).toEqual(domain.getUrl());
        expect(schema.selectors).toEqual(domain.getSelectors());
    });

    it('should convert a list of entities to domains', () => {
        const entities: FeedEntity[] = [
            { _id: '1', name: 'FeedName1', url: 'http://example1.com', selectors: feedSelector } as FeedEntity,
            { _id: '2', name: 'FeedName2', url: 'http://example2.com', selectors: feedSelector } as FeedEntity,
        ];

        const domains = service.toDomains(entities);

        expect(domains.length).toEqual(entities.length);
        expect(domains[0].getId()).toEqual(entities[0]._id);
        expect(domains[0].getName()).toEqual(entities[0].name);
        expect(domains[0].getUrl()).toEqual(entities[0].url);
        expect(domains[0].getSelectors()).toEqual(entities[0].selectors);
    });
});