export interface Middleware {
  execute(event: any): Promise<any>;
}
