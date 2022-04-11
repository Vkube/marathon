const getRandomNumber = (num)=> {
    return Math.ceil(Math.random() * num);
};

const createHTMLElement = (tag = 'div', classname, content) => {
    const element = document.createElement(tag);
    if (classname) {
        element.classList.add(classname);
    }
    if (typeof content === 'string') {
        element.innerHTML = content;
    }
    if (Array.isArray(content)) {
        content.forEach((item) => element.appendChild(item));
    }
    return element;
};

export{ getRandomNumber, createHTMLElement }