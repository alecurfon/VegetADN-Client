export class Taxon {
  constructor(
    public taxon_id: number,
    public ncbi_taxon_id: number,
    public parent_taxon_id: number,
    public node_rank: string,
    public genetic_code: number,
    public mito_genetic_code: number,
    public left_value: number,
    public right_value: number,
  ) { }
}
