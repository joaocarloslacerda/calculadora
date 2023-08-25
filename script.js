const previousOpText = document.querySelector("#previous-op");
const currentOpText = document.querySelector("#current-op");
const buttons = document.querySelectorAll("#buttons button");

class Calculator{
    constructor(previousOpText, currentOpText){
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.currentOp = "";
    }

    /*pega o digito e chama o método de atualização da tela de novos digitos*/
    addDigit(digit){
        //verifica se um ponto já foi digitado
        if(digit === "." && this.currentOpText.innerText.includes(".")){
            return;
        }

        this.currentOp = digit;
        this.updateScreen();
    }

    //realiza o processamento das operações
    processOperation(operation){
        //testa se currentOpText está vazio e se a operação selecionado é a para limpar todas as operações
        if(this.currentOpText.innerText === "" && operation != "C"){
            //testa se previousOpText não está vazio e chama o método para trocar a operação
            if(this.previousOpText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }

        let operationValue;
        //converte eo texto para número e passa para as constantes
        //pega sempre a primeira casa no array, do contrário iria cair em uma vazia e não atualizaria a tela corretamente
        const previous = +this.previousOpText.innerText.split(" ")[0];
        const current = +this.currentOpText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelDigit();
                break;
            case "CE":
                this.processCeOp();
                break;
            case "C":
                this.processClearOp();
                break;
            case "=":
                this.processEqualOp();
                break;
            default:
                return;
        }
    }

    //atualiza a tela dos novos digitos
    updateScreen(operationValue = null, operation = null, current = null, previous = null){
                
        //segue concatenando os digitos se nenhuma operação tiver sido selecionada ainda
        if(operationValue === null){
            this.currentOpText.innerText += this.currentOp;
        }else{
            if(previous === 0){
                operationValue = current;
            }
            
            //passa o valor atual e a operação selecionada para o tela superiora
            this.previousOpText.innerText = `${operationValue} ${operation}`
            //atualiza para vazio, pois serão informados novos digitos
            this.currentOpText.innerText = "";
        }
    }

    //altera a operação selecionada
    changeOperation(operation){

        //array com todas as operações possíveis
        const mathOperations = ["*", "/", "+", "-"];

        //testa se a operação digitada não está contida no array
        if(!mathOperations.includes(operation)){
            return;
        }

        //atualiza a operação
        this.previousOpText.innerText = this.previousOpText.innerText.slice(0, -1) + operation;

    }

    //deleta dígitos
    processDelDigit(){
        this.currentOpText.innerText = this.currentOpText.innerText.slice(0, -1);
    }

    //limpa a operação atual
    processCeOp(){
        this.currentOpText.innerText = "";
    }

    //limpa todas as operações
    processClearOp(){
        this.currentOpText.innerText = "";
        this.previousOpText.innerText = "";
    }

    //operação de igualdade
    processEqualOp(){
        //pega a operação que foi digitada e passa para a constante operation
        const operation = previousOpText.innerText.split(" ")[1];
        //chama novamente o método que processa as operações passando para ele a operação qeu foi selecionada, assim irá cair no switch conforme o operador
        this.processOperation(operation);
    }
}

/*instanciando objeto*/
const calc = new Calculator(previousOpText, currentOpText);

/*laço for para percorrer os botões*/
buttons.forEach((btn) => {
    /*adiciona um evento de click ao botão selecionado */
    btn.addEventListener("click", (e) => {
        /*passa para a constante value o texto contido no botão */
        const value = e.target.innerText;

        /*testa se o botão é um número, se não entra no else e processa a operação*/
        if (+value >=0 || value === "."){
            calc.addDigit(value);
        }else{
            calc.processOperation(value);
        }
    });
});