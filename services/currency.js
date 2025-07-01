const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function setCurrencyFormat(value) {
    return currency.format(value);
}

export default currency;