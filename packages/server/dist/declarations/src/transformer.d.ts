export declare type DataTransformer = {
    serialize(object: any): any;
    deserialize(object: any): any;
};
export declare type CombinedDataTransformer = {
    input: DataTransformer;
    output: DataTransformer;
};
export declare type CombinedDataTransformerClient = {
    input: Pick<DataTransformer, 'serialize'>;
    output: Pick<DataTransformer, 'deserialize'>;
};
export declare type DataTransformerOptions = DataTransformer | CombinedDataTransformer;
export declare type ClientDataTransformerOptions = DataTransformer | CombinedDataTransformerClient;
