const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [ "all", "fire", "water", "wind", "earth"], // Список доступных фильтров
    activeFilters: [] // Активные фильтры
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            };
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload // Загрузка фильтров с сервера
            };
        case 'FILTERS_UPDATED':
            return {
                ...state,
                activeFilters: action.payload // Обновление активных фильтров
            };
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error' // Если добавить статус загрузки фильтров
            };
        default: 
            return state;
    }
};

export default reducer;
