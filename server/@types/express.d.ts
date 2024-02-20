declare module "express" {
    interface Request {
        user?: any; 
    }
}
declare module "express" {
    import { Request as ExpressRequest, Response as ExpressResponse } from "express-serve-static-core";

    export interface Request extends ExpressRequest {
    }

    export interface Response extends ExpressResponse {
    }

    export { Express, Router, RequestHandler, Application } from "express-serve-static-core";
}
