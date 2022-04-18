export const makeChunkArray = (arr, perChunk) => {
    if (!arr) return [];
    if (perChunk <= 0) return arr;

    return arr.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
        }

        resultArray[chunkIndex].push(item);

        return resultArray;
    }, []);
};
