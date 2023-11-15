export interface IProcess {
  product: {
    id: string;
    name: string;
  };
  agent: {
    type: string;
    id: string;
    name: string;
  };
  process: {
    code: string;
    url: string;
  };
}
