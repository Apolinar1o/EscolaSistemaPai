const url = "http://localhost:5000"


const loginB = document.querySelector("#loginB");
const CadastroB = document.querySelector("#CadastroB");



loginB.addEventListener("click", async  () => {
       

        try {
            const password = document.querySelector("#password").value;
            const email = document.querySelector("#email").value;
            const dataAtual = new Date()
            const dataFormatada = dataAtual.toISOString().slice(0, 19).replace('T', ' ');
       

            const res = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  
                },
                body: JSON.stringify({  
                    password: password,
                    login: email,
                    dataAcesso: dataFormatada
                }),
            });
            alert("logado com sucesso");

        } catch (error) {
            return res.status(500).json({"error": error})
        }

})

CadastroB.addEventListener("click", async  () => {
        
        try {
            const nome = document.querySelector("#names").value;
            const surnames = document.querySelector("#surnames").value;
            const emailCreate = document.querySelector("#emailCreate").value;
            const passwordCreate = document.querySelector("#passwordCreate").value;
            const dataAtual = new Date()
            const dataFormatada = dataAtual.toISOString().slice(0, 19).replace('T', ' ');

            const res = await fetch(`${url}/cadastro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  
                },
                body: JSON.stringify({  
                    nome: nome,
                    sobrenome: surnames,
                    email: emailCreate,
                    senha: passwordCreate,
                    dataRegistro: dataFormatada
                }),
            });
            alert("adicionado com sucesso");

        } catch (error) {
            alert(error);
        }
    

})

