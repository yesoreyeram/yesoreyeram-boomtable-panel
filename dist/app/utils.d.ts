declare const getFields: (collection: any[], field: String) => any[];
declare const getUniqueFields: (collection: any[], field: String) => any[];
declare const normalizeColor: (color: String) => String;
declare const getActualNameWithoutTransformSign: (value: String) => String;
declare const buildError: (errorTitle: String, errorMessage: String) => Error;
declare const replaceFontAwesomeIcons: (value: String) => String;
declare const replaceWithImages: (value: String) => String;
declare const getDecimalsForValue: (value: number, _decimals: number) => Object;
export { getFields, getUniqueFields, getDecimalsForValue, getActualNameWithoutTransformSign, normalizeColor, replaceFontAwesomeIcons, replaceWithImages, buildError };
