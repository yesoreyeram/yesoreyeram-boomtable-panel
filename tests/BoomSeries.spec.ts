import { getSeriesValue, getCurrentTimeStamp, replaceDelimitedColumns, getRowName, getColName } from "./../src/app/boom/BoomUtils";

const dummy_series_1 = {
    stats: {
        "total": 3268,
        "max": 24,
        "min": 0,
        "logmin": 1,
        "avg": 9.077777777777778,
        "current": 6,
        "first": 2,
        "delta": 1396,
        "diff": 4,
        "range": 24,
        "timeStep": 60000,
        "count": 360
    }
};
const dummy_series_2 = {
    "datapoints": [
        [
            108,
            1575198840000
        ],
        [
            86,
            1575198900000
        ],
        [
            93,
            1575198960000
        ],
        [
            48,
            1575199020000
        ],
        [
            null,
            1575199080000
        ],
        [
            null,
            1575199140000
        ],
        [
            null,
            1575199200000
        ],
        [
            null,
            1575199260000
        ]
    ],
    "label": "COM # count",
    "id": "COM # count",
    "alias": "COM # count",
    "aliasEscaped": "COM # count",
    "stats": {
        "total": 335,
        "max": 108,
        "min": 0,
        "logmin": 48,
        "avg": 41.875,
        "current": 0,
        "first": 108,
        "delta": 93,
        "diff": -108,
        "range": 108,
        "timeStep": 60000,
        "count": 8
    }
};

describe("Boom Series", () => {
    it("getSeriesValue", () => {
        expect(getSeriesValue({}, "total")).toBe(NaN);
        expect(getSeriesValue({}, "foo")).toBe(NaN);
        expect(getSeriesValue(dummy_series_1, "foo")).toBe(null);
        expect(getSeriesValue(dummy_series_1, "total")).toBe(3268);
        expect(getSeriesValue(dummy_series_1, "TOTAL")).toBe(3268);
        expect(getSeriesValue(dummy_series_1, "last_time")).toBe(null);
        expect(getSeriesValue(dummy_series_1, "LAST_TIME")).toBe(null);
        expect(getSeriesValue(dummy_series_2, "total")).toBe(dummy_series_2.stats.total);
        expect(getSeriesValue(dummy_series_2, "last_time_nonnull")).toBe(1575199020000);
        expect(getSeriesValue(dummy_series_2, "last_time")).toBe(1575199260000);
    });
    it("getCurrentTimeStamp", () => {
        expect(getCurrentTimeStamp(dummy_series_2.datapoints)).toStrictEqual(new Date(1575199260000));
    });
    it("replaceDelimitedColumns", () => {
        expect(replaceDelimitedColumns("Hello _0_ is _1_", "foo.bar.baz", ".", "_")).toBe("Hello foo is bar");
        expect(replaceDelimitedColumns("Hello _0__1_", "foo.bar.baz", ".", "_")).toBe("Hello foobar");
        expect(replaceDelimitedColumns("Hello _0__1__1_", "foo.bar.baz", ".", "_")).toBe("Hello foobarbar");
        expect(replaceDelimitedColumns("Hello _0__1__3_", "foo.bar.baz", ".", "_")).toBe("Hello foobar_3_");
        expect(replaceDelimitedColumns("Hello _0__1__1_", "foo bar baz", " ", "_")).toBe("Hello foobarbar");
        expect(replaceDelimitedColumns("Hello #0##1##1#", "foo bar baz", " ", "#")).toBe("Hello foobarbar");
    });
    it("getRowName", () => {
        expect(getRowName("Hello _0_ is _1_", ".", "_", "foo.bar.baz", "", [])).toBe("Hello foo is bar");
        expect(getRowName("Hello _0_ is _1_ _series_ _series_", ".", "_", "foo.bar.baz", "", [])).toBe("Hello foo is bar foo.bar.baz foo.bar.baz");
    });
    it("getColName", () => {
        expect(getColName("Hello _0_ is _1_", ".", "_", "foo.bar.baz","rowName" , "", [])).toBe("Hello foo is bar");
        expect(getColName("foo.bar", ".", "_", "foo.bar", "foo.bar" ,"", [])).toBe("foo.bar");
    });
});
