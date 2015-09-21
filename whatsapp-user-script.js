// ==UserScript==
// @name         Whatsapp web Elseve Chat Control Improvements
// @namespace    http://saulovallory.com/
// @version      0.1
// @author       Saulo Vallory
// @match        *://web.whatsapp.com/*
// @grant        none
// ==/UserScript==

var ticketUrl = 'http://elsevechatcontrol.dlapp.co/server/default/ticket/';
window.$ = function(q) { return document.querySelector(q); }
window.$$ = function(q) { return document.querySelectorAll(q); }

var bt = document.createElement("button");
bt.className = "btn btn-primary";
bt.innerText = "Ticket";
bt.setAttribute('style', 'position: absolute;right: 115px;top: 12px;');

bt.onclick = function() {
    var name = $('#main .chat-title > span').innerText;
    var ticket = (name.match(/[0-9]+/)||[])[0] || false;

    if(ticket){
        window.open(ticketUrl+ticket, 'ticket-'+ticket);
    } else {
        alert('Desculpe, não consegui achar o número do ticket dessa pessoa :(');
    }

    return false;
}

window.ticketButton = bt;

function addTicketBtn() {
    // pane-side  #main
    var title = $('#main .chat-main');
    title.appendChild(window.ticketButton);
}

var btnExists = false;

function startScript(){
    if(document.body.contains('.chatlist') && !btnExists){
        $('.chatlist').onclick = function(){
            window.setTimeout(addTicketBtn, 100);
            btnExists = true;
        }
    }
}

window.setInterval(startScript, 1000);
window.start = startScript;
