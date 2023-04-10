const newTransfer = document.querySelector("#newTransfer"),
      divTransfer = document.querySelector(".formTransfer"),
      divTransaction = document.querySelector('.divTransactions'),
      addBalance = document.querySelector("#addBalance"),
      actualBalance = document.querySelector("#actualBalance"),
      labelBalance = document.querySelector("#labelBalance"),
      savedTransactions = document.querySelector(".savedTransactions")
      lsBalance = JSON.parse(localStorage.getItem("balance"))


window.addEventListener('load', async ()=>{
    labelBalance.innerHTML += `Saldo: R$${lsBalance}`
    
    const arrData = await getDataFromDb()
    if(arrData.length === 0){
        savedTransactions.innerHTML = "Nenhuma transferência registrada"
    }
    await renderTransfers(savedTransactions)
    const removeButtons = document.querySelectorAll(".removeDiv")
    removeTransaction(removeButtons, arrData)
})
newTransfer.addEventListener('click', ()=>{
    divTransaction.innerHTML = ""
    divTransfer.innerHTML = ""
    createForm(divTransfer)

    const form = document.querySelector('.formTransfer')
    form.addEventListener('submit' , async (ev)=>{
        ev.preventDefault()
        saveOnDb()
        divTransaction.innerHTML = ""
        await renderTransfers(divTransaction)

        const arrData = await getDataFromDb()
        const removeButtons = document.querySelectorAll(".removeDiv")
        removeTransaction(removeButtons, arrData)
    })
})

function removeTransaction(removeButtons, arrData){
    removeButtons.forEach((e)=>{
        e.addEventListener('click', async ()=>{
            removeFromDb(e.id)
            // savedTransactions.innerHTML = " "
            divTransaction.innerHTML += await renderTransfers(divTransaction)

            if(arrData.length === 1){
                savedTransactions.innerHTML = "Nenhuma transferência registrada"
            }
        })
    })
}
addBalance.addEventListener('click', ()=>{
    divTransfer.innerHTML = " "
    createFormBalance(divTransaction)

    const balanceElements = document.querySelectorAll(".balanceElements")

    balanceElements[1].addEventListener('click', ()=>{
        // divTransaction.innerHTML = ""
        if(isNaN(balanceElements[0].value)){

            balanceElements[2].innerHTML = "Apenas números"
        }else{
            setBalance(balanceElements[0].value)
            labelBalance.innerHTML = `Saldo: R$${JSON.parse(localStorage.getItem("balance"))}`
        }
    })
})