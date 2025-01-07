


const url = "http://localhost:5000"
const entidadeAdd = document.querySelector("#entidadeAdicionar"); 

async function buscarRegistros() {
    const listaRegistros = document.querySelector("#lista-registros")
    const entidadeBuscar = document.querySelector("#entidadeBuscar").value;
    try {
  
        const res = await fetch(`${url}/${entidadeBuscar}`);
        const dados = await res.json();
        console.log(dados)
        if(dados.length === 0){
            listaRegistros.innerHTML = "sem registros"
        }

        dados.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = JSON.stringify(item);
            listaRegistros.appendChild(li);
        });

    } catch (error) {
        alert(error);
    }
    
}
async function adicionarRegistro() {
    const entidadeAdicionar = document.querySelector("#entidadeAdicionar").value;


        

        
        try {
            if(entidadeAdicionar == "aluno") {
                const dataNascimento = document.querySelector("#dataNascimento").value;
                const Anome = document.querySelector("#Anome").value;
                const Asexo = document.querySelector("#Asexo").value;
                const Aendereco = document.querySelector("#Aendereco").value;
                const resp_id = document.querySelector("#resp_id").value;
                const res = await fetch(`${url}/insert/${entidadeAdicionar}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",  
                    },
                    body: JSON.stringify({  
                        nome: Anome,
                        endereço: Aendereco,
                        dataNascimento: dataNascimento,
                        sexo: Asexo,
                        resp_id: resp_id
                    }),
                });

            }else{ 
                const cpf = document.querySelector("#Rcpf").value;
                const nome = document.querySelector("#Rnome").value;
                const sexo = document.querySelector("#Rsexo").value;
                const endereco = document.querySelector("#Rendereco").value;

                const res = await fetch(`${url}/insert/${entidadeAdicionar}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",  
                    },
                    body: JSON.stringify({  
                        nome: nome,
                        endereço: endereco,
                        cpf: cpf,
                        sexo: sexo
                    }),
                });
    
            }
            
            alert("adicionado com sucesso");
            location.reload()

        } catch (error) {
            alert(error);
        }
    
}
async function deletarRegistro() {
    const entidadeDeletar = document.querySelector("#entidadeDeletar").value;
    const nome = document.querySelector("#nomeDeletar").value;
    
    try {
        
        const res = await fetch(`${url}/delete/${entidadeDeletar}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify({  
                nome: nome
            }),
        });
        alert("deletado com sucesso");
        location.reload()
    } catch (error) {
        alert(error);
    }
    
}
async function atualizarRegistro() {
    const entidadeAtualizar = document.querySelector("#entidadeAtualizar").value;
    const alt = document.querySelector("#campoAtualizar").value
    const cpf = document.querySelector("#cpfAtualizar").value
    const valor = document.querySelector("#valorAtualizar").value
    try {
        
        const res = await fetch(`${url}/atualizar/${entidadeAtualizar}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify({  
                alt: alt,
                value: valor,
                cpf: cpf
            }),
        });
        
        alert("atualizado com sucesso");
        location.reload()
    } catch (error) {
        alert(error);
    }
    
}


entidadeAdd.addEventListener("change", (event)=> {
    const inputsA = document.querySelectorAll(".aluno") 
    const inputsR = document.querySelectorAll(".responsavel") 
    if(event.target.value == "responsavel") {
        inputsA.forEach(inputs=> {
            inputs.style.display = "none";
        })
        inputsR.forEach(inputs=> {
            inputs.style.display = "block";
        })
    
    } else {
        inputsA.forEach(inputs=> {
            inputs.style.display = "block";
        })
        inputsR.forEach(inputs=> {
            inputs.style.display = "none";
        })
    }

})