class App{
    constructor(){
        this.initializaForm();
        this.listValues();
    }

    initializaForm(){
        const form = document.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('form submitted');
            this.save({key: form.key.value, value: form.keyValue.value});
            this.listValues();
            form.reset();
            form.key.focus();
        });
    }

    save({key, value}) {
        console.log("saiving data...");
        console.log(key, value);
        window.localStorage.setItem(key, value);
    }

    listValues(){
        console.log("Listing data...");
        const ls = window.localStorage;
        const lsKeys = Object.keys(ls);
        console.log(lsKeys);
    }
}

new App();