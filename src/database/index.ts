import { createConnection, getConnectionOptions } from "typeorm";

// interface IOptions {
//    host: string;
// }

getConnectionOptions().then((options) => {
    // as configurações abaixo devem ser habilitadas caso a aplicação seja utilizada em um container
    // const newOptions = options as IOptions;
    // newOptions.host = "database_postgres"; // Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
    // newOptions.host = "rtx";
    createConnection({
        ...options,
    });
});
