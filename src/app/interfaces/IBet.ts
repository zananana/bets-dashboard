interface ITeams {
    name: string;
    win: number;
    oddsIncreased?: boolean;
  }

export interface IBet {
    id: number;
    teams: ITeams[];
    draw: number;
    oddsIncreased?: boolean;
  }
