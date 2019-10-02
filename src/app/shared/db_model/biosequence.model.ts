export class Biosequence {
  constructor(
    public bioentry_id: number,
    public version: number,
    public length: number,
    public alphabet: string,
    public seq: string,
  ) { }
}
