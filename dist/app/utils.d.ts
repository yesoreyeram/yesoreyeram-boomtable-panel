import { OptionOverride } from "../interfaces/interfaces";
declare const COLORS: {
    GREEN: string;
    ORANGE: string;
    RED: string;
};
declare const hasDuplicates: (array: any) => boolean;
declare const isUniqueArray: (array: any) => boolean;
declare const getFields: (collection: any[], field: String) => any[];
declare const getUniqueFields: (collection: any[], field: String) => any[];
declare const normalizeColor: (color: String) => String;
declare const getActualNameWithoutTransformSign: (value: String) => String;
declare const buildError: (errorTitle: String, errorMessage: String) => Error;
declare const replaceFontAwesomeIcons: (value: String) => String;
declare const replaceWithImages: (value: String) => String;
declare const getDecimalsForValue: (value: number, _decimals: number) => Object;
declare const buildOptionOverride: (o: any[], i: Number) => OptionOverride;
export { COLORS, hasDuplicates, hasDuplicates as isDuplicateArray, isUniqueArray, getFields, getUniqueFields, getDecimalsForValue, getActualNameWithoutTransformSign, buildOptionOverride, normalizeColor, replaceFontAwesomeIcons, replaceWithImages, buildError };
