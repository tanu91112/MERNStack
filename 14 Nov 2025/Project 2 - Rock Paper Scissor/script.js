let userChoice = ""
let userScore = 0
let compScore = 0

document.querySelectorAll(".userChoice").forEach(btn=>{
    btn.onclick=function(){
        document.querySelectorAll(".userChoice").forEach(b=>b.classList.remove("active"))
        this.classList.add("active")
        userChoice=this.dataset.value
    }
})

document.getElementById("playBtn").onclick=function(){
    if(userChoice==="") return

    let values=["rock","paper","scissor"]
    let compChoice=values[Math.floor(Math.random()*3)]

    document.querySelectorAll(".compChoice").forEach(c=>c.classList.remove("active"))
    document.querySelector('.compChoice[data-value="'+compChoice+'"]').classList.add("active")

    if(userChoice===compChoice){}

    else if(
        (userChoice==="rock" && compChoice==="scissor") ||
        (userChoice==="paper" && compChoice==="rock") ||
        (userChoice==="scissor" && compChoice==="paper")
    ){ userScore++ }
    
    else{ compScore++ }

    document.getElementById("userScore").innerText=userScore
    document.getElementById("compScore").innerText=compScore
}
