export const checkIntersections = (objs, roi) => {
    const intersects = [false, false];

    const isIntersecting = (bbox, region) => {
        const [x1, y1, x2, y2] = bbox;
        const [rx1, ry1, rx2, ry2] = region;

        return !(x2 < rx1 || x1 > rx2 || y2 < ry1 || y1 > ry2);
    };

    for (const obj of objs.filter(o => o.class === "person")) {
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

// Example usage
// const objs = [
//     { bbox: [1, 1, 3, 3] },
//     { bbox: [4, 4, 6, 6] },
// ];

// const roi = [
//     [2, 2, 5, 5], // First ROI
//     [5, 5, 7, 7]  // Second ROI
// ];

// console.log(checkIntersections(objs, roi)); // Output: [true, true]
