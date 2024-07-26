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
        if(!ls.length) {
            this.resetTable();
            return;
        }
        const lsKeys = Object.keys(ls);
        const allValues = lsKeys.map(this.toHTML).join('');
        this.addToHTML(allValues);
    }

    toHTML(key){
        const value = window.localStorage.getItem(key);
        const html = `
                  <tr>
                    <th scope="row" onclick="app.edit('${key}')">${key}</th>
                    <td>${value}</td>
                    <td style="cursor: pointer" onclick= "app.delete('${key}')">
                    🗑️
                    </td>
                  </tr>`;
        return html;
    }

    addToHTML(allValues){
        const listValues = document.getElementById('listValues');
        listValues.innerHTML= '';
        listValues.insertAdjacentHTML('beforeend', allValues)
    }

    resetTable(){
        const listValues = document.getElementById('listValues');
        listValues.innerHTML = '<td colspan="3"> No data Available </td>';
    }

    delete(key){
        if(confirm("Are you Sure ?? ")){
            window.localStorage.removeItem(key);
            this.listValues();
        }
    }

    edit(key){
        console.log(`Clicked to edit ${key}`);
    }

}

// TODO edit Values : fill the form after the value and save
// TODO use html5 dialog instead of confirm

const app = new App();