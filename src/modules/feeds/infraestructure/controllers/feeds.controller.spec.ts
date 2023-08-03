import request from 'supertest';
import * as express from 'express';
import { HttpStatus } from "../../../commons/domain/server/http-statuses.enum";
import { bootstrap, tearDown } from '../../../../../test/bootstrap'

let feedId: string;
let appInstance: Express.Application;

// Test are placed under this line
describe('Verify feeds controller', () => {

    beforeAll( async () => {
        const app = await bootstrap(__filename, true);
        appInstance = app.app;
    });

    afterAll(async () => {
        await tearDown(__filename);
    });

    it('should return valid feed list with all properties GET /api/feeds', async () => {
        // Supongamos que el id 1 existe en la base de datos
        const response = await request(appInstance)
            .get(`/api/feeds`)
            .send();

        expect(response.status).toBe(HttpStatus.OK);
        const feeds = response.body;
        feeds.forEach((feed: any) => {
            feedId = feed.id;
            expect(feed).toEqual(expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
                url: expect.any(String),
                selectors: expect.objectContaining({
                    title: expect.objectContaining({
                        query: expect.any(String),
                        attribute: expect.any(String),
                    }),
                    author: expect.objectContaining({
                        query: expect.any(String),
                        attribute: expect.any(String),
                    }),
                    link: expect.objectContaining({
                        query: expect.any(String),
                        attribute: expect.any(String),
                    }),
                }),
            }));
        });
    });

    it('should return valid feed detail with all properties GET /api/feeds/:id', async () => {
        // Supongamos que el id 1 existe en la base de datos
        const response = await request(appInstance)
            .get(`/api/feeds/${feedId}`)
            .send();

        expect(response.status).toBe(HttpStatus.OK);
        const feed = response.body;
        expect(feed).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            url: expect.any(String),
            selectors: expect.objectContaining({
                title: expect.objectContaining({
                    query: expect.any(String),
                    attribute: expect.any(String),
                }),
                author: expect.objectContaining({
                    query: expect.any(String),
                    attribute: expect.any(String),
                }),
                link: expect.objectContaining({
                    query: expect.any(String),
                    attribute: expect.any(String),
                }),
            }),
        }));
    });

    it('should create valid feed POST /api/feeds', async () => {
        const payload = {
            "name": "La razón",
            "url": "https://www.larazon.es/",
            "selectors": {
                "title": {
                    "query": "div.ue-l-cg__item .ue-c-cover-content  header.ue-c-cover-content__headline-group",
                    "attribute": "innerText"
                },
                "author": {
                    "query": "div.ue-l-cg__item .ue-c-cover-content  div.ue-c-cover-content__list-inline > ul span.ue-c-cover-content__byline-name",
                    "attribute": "outerText"
                },
                "link": {
                    "query": "div.ue-l-cg__item .ue-c-cover-content  header.ue-c-cover-content__headline-group > a.ue-c-cover-content__link",
                    "attribute": "href"
                }
            }
        };
        // Supongamos que el id 1 existe en la base de datos
        const response = await request(appInstance)
            .post(`/api/feeds`)
            .send(payload);

        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String)
        }));
        delete response.body.id;
        expect(response.body).toEqual(payload);
    });

    it(`should return feed ${feedId} news /api/feeds/:id/news`, async () => {
        // Supongamos que el id 1 existe en la base de datos
        const response = await request(appInstance)
            .get(`/api/feeds/${feedId}/news`)
            .send();

        expect(response.status).toBe(HttpStatus.OK);

        response.body.forEach( (newObject: any) => {
            expect(newObject).toHaveProperty('id');
            expect(typeof newObject.id).toBe('string');

            expect(newObject).toHaveProperty('author');
            expect(typeof newObject.author).toBe('string');

            expect(newObject).toHaveProperty('title');
            expect(typeof newObject.title).toBe('string');

            expect(newObject).toHaveProperty('link');
            expect(typeof newObject.link).toBe('string');

            expect(newObject).toHaveProperty('feed_id');
            expect(typeof newObject.feed_id).toBe('string');
        })

    });

    it('should update valid feed PUT /api/feeds/:id', async () => {
        const payload = {
            "name": "La razón 2",
            "url": "https://www.larazon.es/2",
            "selectors": {
                "title": {
                    "query": "div.ue-l-cg__item .ue-c-cover-content  header.ue-c-cover-content__headline-group",
                    "attribute": "innerText"
                },
                "author": {
                    "query": "div.ue-l-cg__item .ue-c-cover-content  div.ue-c-cover-content__list-inline > ul span.ue-c-cover-content__byline-name",
                    "attribute": "outerText"
                },
                "link": {
                    "query": "div.ue-l-cg__item .ue-c-cover-content  header.ue-c-cover-content__headline-group > a.ue-c-cover-content__link",
                    "attribute": "href"
                }
            }
        };
        // Supongamos que el id 1 existe en la base de datos
        const response = await request(appInstance)
            .put(`/api/feeds/${feedId}`)
            .send(payload);

        expect(response.status).toBe(HttpStatus.NO_CONTENT);

        const updatedFeedResponse = await request(appInstance)
            .get(`/api/feeds/${feedId}`)
            .send();

        expect(updatedFeedResponse.status).toBe(HttpStatus.OK);
        expect(updatedFeedResponse.body).toEqual(expect.objectContaining({
            id: feedId
        }));
        delete updatedFeedResponse.body.id;
        expect(updatedFeedResponse.body).toEqual(payload);
    });

    it('should delete feed id DELETE /api/feeds/:id', async () => {
        // Supongamos que el id 1 existe en la base de datos
        const response = await request(appInstance)
            .delete(`/api/feeds/${feedId}`)
            .send();

        expect(response.status).toBe(HttpStatus.NO_CONTENT);

        const feedResponse = await request(appInstance)
            .get(`/api/feeds/${feedId}`)
            .send();

        expect(feedResponse.status).toBe(HttpStatus.NOT_FOUND);
    });
});

