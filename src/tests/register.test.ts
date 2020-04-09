import { request } from 'graphql-request';
import { User } from "../entity/User";
import { startServer } from '../startServer';

let getHost = () => '';

beforeAll(async () => {
   const app = await startServer();
   const { port } = app.address();
   getHost = () => `http://127.0.0.1:${port}`;
})

const email = "hjk14985@naver.com";
const password = "sky14985";

const mutation = `
mutation {
    register(email: "${email}", password: "${password}")
}
`;

test("Register user", async () => {
    const response = await request(getHost(), mutation);
    expect(response).toEqual({ register: true });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
});

// use a test database
// drop all data once the test is over
// when i run npm yarn test it also starts the server