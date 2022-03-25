export interface SportState {
    week: number;
    season_type: string;
    season_start_date: string;
    season: string;
    promo_types: string[];
    promo_start_date: string;
    promo_end_date: string;
    previous_season_start_date: string;
    previous_season: string;
    leg: number;
    league_season: string;
    league_create_season: string;
    display_week: number;
}