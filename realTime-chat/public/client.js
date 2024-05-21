const socket = io();
let name = "pramod"
// do{
//     name = prompt("Enter the name")
// }while(!name);

const textarea = document.querySelector("#text-area");
const messageArea = document.querySelector(".message__area");
textarea.addEventListener("keyup",(e)=>{
    if(e.key === "Enter"){
        sendmessage(e.target.value);
    }
})

function sendmessage(msge){
    let msg = {
        user:name,
        message:msge.trim(),
    }
    appendMessage(msg,"outgoing");
    textarea.value = ""
    socket.emit('message',msg);

    scrollToBottom()
}

function appendMessage(msg,type){
    let mainDiv = document.createElement("div");
    mainDiv.classList.add(type,'message');
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}  

socket.on('message',(msg)=>{
    appendMessage(msg,"incoming");
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}