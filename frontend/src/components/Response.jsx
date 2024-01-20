function Response() {
    const PetShopList = [
        "Meu Canino Feliz",
        "Vai Rex",
        "ChowChawgas"
    ]
    const Derreal = 10.00;
    return (
       
        <div>
            <p>O PetShop com melhor custo é: {PetShopList[0]}</p>
            <p>O preço total é: {Derreal}</p>
        </div>
        
        
    );
}

export default Response;