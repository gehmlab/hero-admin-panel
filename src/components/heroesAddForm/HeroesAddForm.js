import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroesFetched } from '../../actions';



// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров




const HeroesAddForm = () => {
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        element: '',
    });
    
    const dispatch = useDispatch();
    const { request } = useHttp();

    // Обработчик изменения полей формы
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Обработчик отправки формы
    const onSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.element) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const newHero = {
            id: uuidv4(), // Генерация уникального ID
            name: formData.name,
            description: formData.description,
            element: formData.element,
        };

        // Отправка нового героя на сервер
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(() => {
                // Обновляем Redux-состояние после успешного добавления
                request('http://localhost:3001/heroes') // Повторный запрос на получение всех героев
                    .then(data => dispatch(heroesFetched(data)));
                setFormData({ name: '', description: '', element: '' }); // Сброс формы
            })
            .catch(err => console.error('Ошибка при добавлении героя:', err));
    };

    
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={formData.name}
                    onChange={onInputChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={formData.description}
                    onChange={onInputChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"value={formData.element}
                    onChange={onInputChange}>
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;