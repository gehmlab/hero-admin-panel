import { useDispatch, useSelector } from 'react-redux';
import { filtersUpdated } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    // Получаем фильтры из Redux-состояния
    const filters = useSelector(state => state.filters);
    const activeFilters = useSelector(state => state.activeFilters || []);

    console.log("Активные фильтры:", activeFilters);

    // Функция для обработки клика по фильтру
    const onFilterClick = (filter) => {
        // Обновляем список активных фильтров
        const updatedFilters = activeFilters.includes(filter)
            ? activeFilters.filter(f => f !== filter) // Удаляем фильтр
            : [...activeFilters, filter]; // Добавляем фильтр

        // Отправляем данные в Redux
        dispatch(filtersUpdated(updatedFilters));

        // Отправляем данные на сервер
        request('http://localhost:3001/filters/eb64', 'PATCH', {
            id: 'eb64',  // Включаем id объекта, который обновляется
            filters: updatedFilters  // Обновленные фильтры
        }).catch(err => console.error('Ошибка обновления фильтров:', err));
    };

    // Если фильтры не загружены, показываем сообщение
    if (!filters || filters.length === 0) {
        return <p>Фильтры не загружены...</p>;
    }

    // Функция для получения соответствующего класса по элементу фильтра
    const getFilterClass = (filter, isActive) => {
        // Изменяем местами стили
        if (isActive) {
            switch (filter) {
                case 'fire':
                    return 'btn-outline-danger'; // Огонь
                case 'water':
                    return 'btn-outline-primary'; // Вода
                case 'wind':
                    return 'btn-outline-success'; // Ветер
                case 'earth':
                    return 'btn-outline-secondary'; // Земля
                case 'all':
                    return 'btn-outline-dark'; // Все
                default:
                    return 'btn-outline-dark'; // По умолчанию
            }
        } else {
            // Для неактивных кнопок яркий фон с белым текстом
            switch (filter) {
                case 'fire':
                    return 'btn-danger'; // Огонь
                case 'water':
                    return 'btn-primary'; // Вода
                case 'wind':
                    return 'btn-success'; // Ветер
                case 'earth':
                    return 'btn-secondary'; // Земля
                case 'all':
                    return 'btn-dark'; // Все
                default:
                    return 'btn-dark'; // По умолчанию
            }
        }
    };

    // Отображаем кнопки фильтров
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={`btn ${getFilterClass(filter, activeFilters.includes(filter))}`}
                            onClick={() => onFilterClick(filter)}>
                            {filter === 'all' ? 'Все' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroesFilters;
