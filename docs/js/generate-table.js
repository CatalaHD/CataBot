// Script que mostra la info de manera ordenada 

let commands = [];
fetch("../Storage/commands.json")
    .then(response => response.json())
    .then(json => {
        commands = json;
        //console.table(commands);
        let musica = [];
        /*
        for (let i = 0; i < commands.length; i++) {
            let command = commands[i];
            if (command.type === "musica") {
                delete command.type;
                musica.push(command);
            }
        }*/

        let mod = [];
        let banc = [];
        let entreteniment = [];
        let privat = [];
        let altres = [];
        let headers = ['Nom', 'Descripció', 'Tipus', 'Ús', 'Alias'];

        // Encuem cada comanda a la taula que toca
        for (let i = 0; i < commands.length; i++) {
            let command = commands[i];

            if (!command.alias) command.alias = "";
            /*
                        switch (command.type) {
                            case 'musica':
                                musica.push(command);
                                break;
                            case 'mod':
                                mod.push(command);
                                break;
                            case 'banc':
                                banc.push(command);
                                break;
                            case 'entreteniment':
                                entreteniment.push(command);
                                break;
                            case 'privat':
                                privat.push(command);
                                break;
                            case 'altres':
                                altres.push(command);
                                break;
                            default:
                                altres.push(command);
                                break;
                        }
                        */
        }

        /*
        console.table(musica);
        console.table(mod);
        console.table(entreteniment);
        console.table(privat);
        console.table(altres);
        */

        let content = document.getElementById("table_content");
        // delete musica.type;
        generateTable(content, commands);
    });

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        row.className = "row100 body";

        let i = 1;
        for (let key in element) {
            let cell = row.insertCell();
            cell.className = "cell100 column" + i;
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
            i++;
        }
    }
}