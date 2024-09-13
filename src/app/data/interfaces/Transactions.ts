export interface Transaction {
  status:         string;
  type:           string;
  metadata:       null;
  created:        number;
  settings:       null;
  leg:            number;
  draft_picks:    DraftPick[];
  creator:        string;
  transaction_id: string;
  adds:           { [key: string]: number } | null;
  drops:          { [key: string]: number } | null;
  consenter_ids:  number[];
  roster_ids:     number[];
  status_updated: number;
  waiver_budget:  any[];
}
  
export interface DraftPick {
  round:             number;
  season:            string;
  league_id:         null;
  roster_id:         number;
  owner_id:          number;
  previous_owner_id: number;
}