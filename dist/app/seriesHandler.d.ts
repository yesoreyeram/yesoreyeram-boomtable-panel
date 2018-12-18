import { Series, Pattern } from "./../interfaces/interfaces";
declare let defaultHandler: (seriesData: Series) => Series;
declare let compute: (dataComputed: Series[], defaultPattern: Pattern, patterns: Pattern[], row_col_wrapper: String) => Series[];
export { compute, defaultHandler };
