export class Model {

    constructor(input?: any) {
        if (input) {
            Object.assign(this, input);
        }
    }
    static fromArray<T>(this: new () => T, data: any): Array<T> {
        if (!data) {
            return data;
        }
        return data.map((item) => {
            return Object.assign(new this(), item);
        });
    }

}
