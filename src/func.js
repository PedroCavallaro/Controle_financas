function createForm(divMain){
    const form = document.createElement("form"),
    labelValue = document.createElement("label"),
    labelBank = document.createElement('label'),
    labelAnumber = document.createElement('label'),
    labelUsername = document.createElement('label'),
    valueInput = document.createElement("input"),
    bankName = document.createElement('input'),
    br2 = document.createElement('br'),
    agenNumber = document.createElement('input'),
    br3 = document.createElement('br'),
    userName = document.createElement('input'),
    br4 = document.createElement('br'),
    bSend = document.createElement("input"),
    h1 = document.createElement('h1'),
    radio1 = document.createElement('input'),
    radio2 = document.createElement('input'),
    br = document.createElement('br'),
    label1 = document.createElement('label'),
    label2 = document.createElement('label')

    labelValue.innerText += "Valor"
    labelBank.innerText += "Banco"
    labelAnumber.innerText += 'N° Agência'
    labelUsername.innerText += "Nome"
    bankName.classList.add('data')
    agenNumber.classList.add('data')
    userName.classList.add('data')

    label1.innerText += "TED"
    label2.innerText +=  "DOC"

    radio1.name = 'radioTransfer'
    radio1.type = 'radio'
    radio2.value = 'TED'
    radio2.name = 'radioTransfer'
    radio2.type = 'radio'
    radio2.value = 'DOC'

    form.action = "http://localhost:3000/transfers"
    form.method = "post"
    form.classList.add('formTransfer')

    valueInput.type = "text"
    valueInput.classList.add('data')

    bSend.type = 'submit'
    bSend.classList.add('bTransfer')

    h1.innerText += "Nova transferência"
    form.append(h1,labelBank,bankName,br, labelAnumber, agenNumber,br2, labelUsername, userName,br3,
                        labelValue, valueInput,bSend,br4,radio1,label1, radio2, label2)
    divMain.append(form)

    
}
async function getFromDb(){
    const reponse = await fetch('http://localhost:3000', {
        method: 'GET',
    headers:{
        'Content-type': 'application-json'
    }
    })
    return await reponse.json()
}

function createDivTransaction(mainDiv, e){
    const div = document.createElement('div')
    div.innerHTML += `<input type="button" id=${e.id} class="removeDiv" value="x"> 
                      <h6>ID:${e.id}</h6>
                      <h6>Nome:${e.name}</h6>
                      <h6>Valor:${e.value}</h6>
                      <h6>Tipo de Transferência:${e.transferType}</h6>
                      <h6>Banco:${e.bank}</h6>
                       `
    div.classList.add("transactionCard")
    mainDiv.append(div)
    
}
async function saveOnDb(){
    const transferAllData = document.querySelectorAll('.data') 
    try{
        if(!(transferAllData.forEach((ele)=>{
            ele.value === ""
            return false
        }))){
        if(isNaN(transferAllData[3].value)){
            // console.log(err)
        }else{
            const transferData = {
                bank: transferAllData[0].value,
                agenNumber: transferAllData[1].value,
                name: transferAllData[2].value,
                value: transferAllData[3].value,
                transferType: document.querySelector('input[name=radioTransfer]:checked').value
            }          
            const response = await fetch('http://localhost:3000/transfers', {
                    method: "POST",
                    headers: {
                        'Content-type': "application/json"
                    },
                    body: JSON.stringify(transferData)
            })
            return await response.json()
            }
        }
    }catch(err){
        window.alert('Review the form')
    }
}
async function renderTransfers(mainDiv){
    const response = await fetch(`http://localhost:3000/transfers`, {
        method: 'GET',
        headers:{
            'Content-type': 'application/json'  
        } 
    })
    const size = await response.json()

    localStorage.setItem("Size",  JSON.stringify(size.length))
    mainDiv.innerHTML = ""

     size.forEach((e)=>{
        console.log(e)
        createDivTransaction(mainDiv, e)
     })
}
async function removeFromDb(transferId){
    await fetch(`http://localhost:3000/transfers/${transferId}`, {
        method: "DELETE",
        headers:{
            'Content-type': 'application/json'
        },
    })
}
async function getDataFromDb(){
    const getData = await fetch("http://localhost:3000/transfers", {
        method: 'GET',
        headers:{
            'Content-type': 'application/json'
        }
    })
    const dataRecieved = await getData.json();
    return dataRecieved
}    

function setBalance(value){
    let sum
    if(localStorage.getItem("balance")){
        let aux = JSON.parse(localStorage.getItem("balance"))
        sum = parseFloat(aux)  + parseFloat(value)
        localStorage.setItem("balance", JSON.stringify(sum))
    }else{
        localStorage.setItem("balance", JSON.stringify(value))
    }
}
function createFormBalance(mainDiv){
    // mainDiv.innerHTML = ""
    mainDiv.innerHTML += `<label for="balanceInput">Valor:</label><br>
                            <input type="text" id="balanceInput" class="balanceElements" placeholder="Digite um valor">
                            <input type="button" class="balanceElements" value="salvar"><br>
                            <span class="balanceElements"></span>`
}
