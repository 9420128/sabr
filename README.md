#  Vue 3 + Composition Api + Pinia + hosting Firebase

## Функционал
Фильтр, поиск данных

Поле поиска (input.search) выводит совпадение в данных, подсвечивает совпадающий текст. Поиск запускается после введения 3 символов, максимальное 7. При клике на значение поиска отображается вся информация одного обЪекта. При клике на значок поиска или нажатии клавиши enter отображается информация всех данных которые предлагает поиск, дубли отсутствуют. При нажатии на крестик или вводе менее 3 символов данные поиска очищаются. Поиск осуществляется с учетом выбранных фильтров.

Поля (.select) фильтруют данные по ключ => значение, учитывается фильтрация поика. 

Кнопка (.creativeBtn) загружает JSON данные с сервера и фильтры для них (ключи для фильтров прописываются в переменной ${arrFilters}), При повторном нажатии данные подтягиваются из Pinia. 

При клике на аватар показывается address.

Демо: https://sabr-vue.web.app/

## Сборка
Vue-cli
Vue-3
Pinia
Sass
Firebase


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
