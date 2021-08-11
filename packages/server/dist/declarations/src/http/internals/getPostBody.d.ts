import { BaseRequest } from '../../internals/BaseHandlerOptions';
export declare function getPostBody({ req, maxBodySize, }: {
    req: BaseRequest;
    maxBodySize?: number;
}): Promise<any>;
