export class Bioentry {
  constructor(
    public bioentry_id: number,
    public biodatabase_id: number,
    public taxon_id: number,
    public name: string,
    public accession: string,
    public identifier: string,
    public division: string,
    public desciption: string,
    public version: number,
  ) { }
}
