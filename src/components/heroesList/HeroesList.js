import React from 'react';
import {useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    
    const {
       data: heroes = [],
       isLoading,
       isError,
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation(); 

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();
        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter]);
    
    // Функция берет id и по нему удаляет ненужного персонажа из store
    // ТОЛЬКО если запрос на удаление прошел успешно
    // Отслеживайте цепочку действий actions => reducers
    const onDelete = useCallback((id) => {
        // Удаление персонажа по его id
        deleteHero(id);
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            const noHeroesRef = React.createRef();

            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero"
                    nodeRef={noHeroesRef}
                >
                    <h5 ref={noHeroesRef} className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            );
        }

        return arr.map(({ id, ...props }) => {
            const nodeRef = React.createRef();

            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="hero"
                    nodeRef={nodeRef}
                >
                    <HeroesListItem {...props} onDelete={() => onDelete(id)} nodeRef={nodeRef} />
                </CSSTransition>
            );
        });
    };

    const elements = renderHeroesList(filteredHeroes);

    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    );
};

export default HeroesList;
