import {get, set, entries, del} from 'https://cdn.jsdelivr.net/npm/idb-keyval@6.2.1/dist/compat.min.js';

class App{
    constructor(){
        this.initializaForm();
        this.listValues();
    }

    initializaForm(){
        const form = document.querySelector('form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('form submitted');
            await this.save({key: form.key.value, value: form.keyValue.value});
            this.listValues();
            form.reset();
            form.key.disabled = false;
            form.key.focus();
        });
    }

    async save({key, value}) {
        console.log("saiving data...");
        return set(key,value).then(() => console.log("Saving Data"));
    }

    async listValues(){
        console.log("Listing data...");
        const keyValueList = await entries();
        if(!keyValueList.length) {
            this.resetTable();
            return;
        }
        console.log(keyValueList);
        const allValues = keyValueList.map(this.toHTML).join('');
        this.addToHTML(allValues);
    }

    toHTML(entry){
        const [key, value] = entry;
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

    async delete(key){
        if(confirm("Are you Sure ?? ")){
            await del(key);
            this.listValues();
        }
    }

    async edit(key){
        console.log(`Editing the Key: ${key}`);
        const form = document.querySelector('form');
        const value = await get(key);
        form.key.disabled = true;
        form.key.value = key;
        form.keyValue.value = value;
    }

}

// TODO use html5 dialog instead of confirm

const app = new App();

//This is ugly, try to avoid it.
window.app = app;