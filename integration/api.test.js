// @flow
import {server} from "../src/server/mockServer";
import superTest from 'supertest';

const request = superTest(server);

describe("It will get the correct information from the server", () => {
  beforeEach(async () => {
    await request.get('/start');
  });
  afterEach(async () => {
    await request.get('/quit');
  });
  it('Gets the test endpoint', async () => {
    // Sends GET Request to /test endpoint
    const {body} = await request.get('/serverData');
    const bodyKeys = body.map(b => Object.keys(b));
    expect(bodyKeys).toEqual(
        expect.arrayContaining([
            expect.arrayContaining([
            'title',
            'division',
            'project_owner',
            'budget',
            'status',
            'created',
            'modified',
        ])
      ])
    );
    expect(body.length).toBeGreaterThan(0);
  });

});
