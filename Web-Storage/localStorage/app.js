class App{
    constructor(){
        this.initializaForm();
    }

    initializaForm(){
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('form submitted');
            this.save({key: form.key.value, value: form.keyValue.value});
            form.reset();
            form.key.focus();
        });
    }

    save(data) {
        console.log("saiving data...");
        console.log(data);
    }
}

new App();