export const handleErrors = (code: string) => {
    console.log(code);
    switch (code) {
        case "22P02":
            return {
                status: 400,
                message: "Formato no válido en el parámetro",
            };
        case "400":
            return {
                status: 400,
                message: "Faltan datos en la petición",
            };
        case "outOfRange":
            return {
                status: 400,
                message: "precio fuera de rango o minimo mayor al maximo",
            };
        case "404":
            return {
                status: 404,
                message: "No existe ese registro",
            };
        case "404a":
            return {
                status: 404,
                message: "nignún registro coincide con los parametros enviados",
            };

        default:
            return {
                status: 500,
                message: "Error de servidor",
            };
    }
};
