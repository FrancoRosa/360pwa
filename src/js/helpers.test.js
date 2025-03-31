describe("checkIntersections", () => {
    const checkIntersections = (objs, roi) => {
        const intersects = [false, false];

        const isIntersecting = (bbox, region) => {
            const [x1, y1, x2, y2] = bbox;
            const [rx1, ry1, rx2, ry2] = region;

            return !(x2 < rx1 || x1 > rx2 || y2 < ry1 || y1 > ry2);
        };

        for (const obj of objs) {
            if (!obj.bbox) continue;

            roi.forEach((region, index) => {
                if (isIntersecting(obj.bbox, region)) {
                    intersects[index] = true;
                }
            });

            if (intersects[0] && intersects[1]) break; // Early exit if both are true
        }

        return intersects;
    };

    test("No intersection at all", () => {
        const objs = [{ bbox: [10, 10, 15, 15] }];
        const roi = [[1, 1, 5, 5], [6, 6, 9, 9]];
        expect(checkIntersections(objs, roi)).toEqual([false, false]);
    });

    test("Intersection with only the first ROI", () => {
        const objs = [{ bbox: [2, 2, 4, 4] }];
        const roi = [[1, 1, 5, 5], [6, 6, 9, 9]];
        expect(checkIntersections(objs, roi)).toEqual([true, false]);
    });

    test("Intersection with only the second ROI", () => {
        const objs = [{ bbox: [7, 7, 8, 8] }];
        const roi = [[1, 1, 5, 5], [6, 6, 9, 9]];
        expect(checkIntersections(objs, roi)).toEqual([false, true]);
    });

    test("Intersection with both ROIs", () => {
        const objs = [{ bbox: [3, 3, 7, 7] }];
        const roi = [[1, 1, 5, 5], [6, 6, 9, 9]];
        expect(checkIntersections(objs, roi)).toEqual([true, true]);
    });

    test("Multiple objects, some intersect with each ROI", () => {
        const objs = [
            { bbox: [2, 2, 4, 4] },
            { bbox: [7, 7, 8, 8] }
        ];
        const roi = [[1, 1, 5, 5], [6, 6, 9, 9]];
        expect(checkIntersections(objs, roi)).toEqual([true, true]);
    });

    test("Empty objects array", () => {
        const objs = [];
        const roi = [[1, 1, 5, 5], [6, 6, 9, 9]];
        expect(checkIntersections(objs, roi)).toEqual([false, false]);
    });

    test("Objects with missing bbox field", () => {
        const objs = [{ notBbox: [2, 2, 4, 4] }];
        const roi = [[1, 1, 5, 5], [6, 6, 9, 9]];
        expect(checkIntersections(objs, roi)).toEqual([false, false]);
    });
});
