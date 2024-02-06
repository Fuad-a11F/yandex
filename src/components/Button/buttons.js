import Handlebars from 'handlebars';

export const button = ({text, url}) => Handlebars.compile(`
<button class="button"  onclick="window.location.href ='{{ url }}'">{{ text }}</button>`)({text, url})

export const button_blue = ({text, url}) => Handlebars.compile(`
<button class="button button__blue"  onclick="window.location.href ='{{ url }}'">{{ text }}</button>`)({text, url})

