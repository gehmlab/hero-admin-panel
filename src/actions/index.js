// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    };
};

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    };
};

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    };
};

// Новые экшены для работы с фильтрами
export const filtersUpdated = (filters) => {
    return {
        type: 'FILTERS_UPDATED',
        payload: filters
    };
};

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    };
};

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    };
};
