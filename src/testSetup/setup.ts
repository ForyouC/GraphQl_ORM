import { startServer } from "../startServer";
startServer();
// interface AddressInfo {
//   port: any;
// }    
  const port = process.env.NODE_ENV === "test" ? 4000 : 4000
  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
  console.log(process.env.TEST_HOST);

//  export const setup = async () => {
//   const app = await startServer();
//   const { port } = app.address() as AddressInfo;

//  };


