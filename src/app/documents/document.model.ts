export class Document {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public url: string,
        public children: string[] = null,
        public _id?: string
    ) {}
}