import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями

    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                    // используйте name как значение и текстовое содержимое
                        let option = document.createElement("option");
                        option.value = name;
                        option.textContent = name;
                        return option;
                                                        // @todo: создать и вернуть тег опции
                      })
        )
    }) 

    return (data, state, action) => {
        if(action && action.name === "clear") {
            const parent = action.closest(".filter-wrapper");
            const input = parent.querySelector("input");
            input.value = "";
            const attrbute = action.getAttribute("data-field");
            state[attrbute] = "";
        }
        // @todo: #4.2 — обработать очистку поля

    const from = state.totalFrom ? parseInt(state.totalFrom) : undefined;
    const to = state.totalTo ? parseInt(state.totalTo) : undefined;

    state.total = [from, to];

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}