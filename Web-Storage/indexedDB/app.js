import {get, set} from 'https://cdn.jsdelivr.net/npm/idb-keyval@6.2.1/dist/compat.min.js';

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
            //this.save({key: form.key.value, value: form.keyValue.value});
            //this.listValues();
            form.reset();
            form.key.disabled = false;
            form.key.focus();
        });
    }

    save({key, value}) {
        console.log("saiving data...");
        set(key,value);
    }

    listValues(){
        console.log("Listing data...");
        // const ls = window.localStorage;
        // if(!ls.length) {
        //     this.resetTable();
        //     return;
        // }
        // const lsKeys = Object.keys(ls);
        // const allValues = lsKeys.map(this.toHTML).join('');
        // this.addToHTML(allValues);
    }

    toHTML(key){
        const value = window.localStorage.getItem(key);
        const html = `
                  <tr>
                    <th scope="row" >${key}</th>
                    <td>${value}</td>
                    <td style="width: 30px">
                         <span style="cursor: pointer" onclick= "app.edit('${key}')" > ✏️ </span>
                    </td>
                    <td style="width: 30px">
                        <span style="cursor: pointer" onclick= "app.delete('${key}')"> 🗑️ </span>
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
        listValues.innerHTML = '<td colspan="4"> No data Available </td>';
    }

    delete(key){
        if(confirm("Are you Sure ?? ")){
            //window.localStorage.removeItem(key);
            //this.listValues();
        }
    }

    edit(key){
        console.log(`Editing the Key: ${key}`);
        const form = document.querySelector('form');
        const value = window.localStorage.getItem(key);
        form.key.disabled = true;
        form.key.value = key;
        form.keyValue.value = value;
    }

}

// TODO use html5 dialog instead of confirm

const app = new App();