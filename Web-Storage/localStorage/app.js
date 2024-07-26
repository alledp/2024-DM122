class App{
    constructor(){
        this.initializaForm();
    }

    initializaForm(){
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('form submitted');
            form.reset();
            form.key.focus();
        });
    }
}

new App();