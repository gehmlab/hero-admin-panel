import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const { heroes, heroesLoadingStatus, activeFilters } = useSelector(state => ({
        heroes: state.heroes,
        heroesLoadingStatus: state.heroesLoadingStatus,
        activeFilters: state.activeFilters
    }));
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));
    }, [dispatch, request]);

    const deleteHero = (id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => {
                return request('http://localhost:3001/heroes');
            })
            .then(data => {
                dispatch(heroesFetched(data));
            })
            .catch(err => console.error('Error deleting hero:', err));
    };

    const filterHeroes = (heroes, activeFilters) => {
        if (!activeFilters.length || activeFilters.includes('all')) {
            return heroes;
        }
        return heroes.filter(hero => activeFilters.includes(hero.element));
    };

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} id={id} {...props} onDelete={deleteHero} />;
        });
    };

    const filteredHeroes = filterHeroes(heroes, activeFilters);
    const elements = renderHeroesList(filteredHeroes);

    return (
        <ul>
            {elements}
        </ul>
    );
};

export default HeroesList
