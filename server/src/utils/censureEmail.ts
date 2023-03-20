export function censureEmail(email: string) {
    // Obter o nome de usuário e o domínio do e-mail
    const [nome, dominio] = email.split('@');

    // Substituir os caracteres do nome por asteriscos, deixando apenas a primeira e última letra
    const nomeCensurado = nome.charAt(0) + nome.slice(1, -1).replace(/./g, '*') + nome.charAt(nome.length - 1);

    // Juntar o nome censurado e o domínio para formar o e-mail censurado
    const emailCensurado = nomeCensurado + '@' + dominio;

    // Retornar o e-mail censurado
    return emailCensurado;
}
