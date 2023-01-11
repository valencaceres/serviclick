export interface IUI {
  channel: { id: string; name: string };
  agent: { id: string; name: string };
  product: { id: string; name: string; price: number; plan_id: number };
}
