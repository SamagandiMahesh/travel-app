
import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  rest.get('http://localhost:4200/locations', (req, res, ctx) => {
    return res(ctx.json(['Location 1', 'Location 2', 'Location 3']));
  })
);
