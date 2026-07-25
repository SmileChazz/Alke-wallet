const STORAGE_KEYS = {
balance: "alke-wallet-balance",
contacts: "alke-wallet-contacts",
transactions: "alke-wallet-transactions",
};

function getBalance() {
const stored = localStorage.getItem(STORAGE_KEYS.balance);
return stored ? parseFloat(stored) : 1000; 
}

function setBalance(amount) {
localStorage.setItem(STORAGE_KEYS.balance, amount.toFixed(2));
}

function getContacts() {
const stored = localStorage.getItem(STORAGE_KEYS.contacts);
return stored ? JSON.parse(stored) : [];
}

function setContacts(contacts) {
localStorage.setItem(STORAGE_KEYS.contacts, JSON.stringify(contacts));
}

function getTransactions() {
const stored = localStorage.getItem(STORAGE_KEYS.transactions);
return stored ? JSON.parse(stored) : [];
}

function setTransactions(transactions) {
localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
}

function addTransaction(description, type, amount) {
const transactions = getTransactions();
transactions.unshift({
date: new Date().toLocaleDateString("es-CL"),
description: description,
type: type,
amount: amount,
});
setTransactions(transactions);
}

function formatCurrency(amount) {
return "$" + amount.toFixed(2);
}

function showMessage(selector, text) {
$(selector).text(text).stop(true).fadeIn(200);
}

function hideMessage(selector) {
$(selector).stop(true).fadeOut(150);
}

function renderBalance() {
const $el = $("#balance-amount");
if ($el.length === 0) return; 
$el.text(formatCurrency(getBalance()));
}

function flashBalance() {
const $el = $("#balance-amount");
if ($el.length === 0) return;
$el.stop(true).animate({ opacity: 0.15 }, 150).animate({ opacity: 1 }, 300);
}

const DEMO_EMAIL = "usuario@alkewallet.com";
const DEMO_PASSWORD = "123456";

function initLoginForm() {
const $form = $("#login-form");
if ($form.length === 0) return;

$form.on("submit", function (event) {
event.preventDefault();

const email = $("#email").val().trim();
const password = $("#password").val();

if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    window.location.href = "menu.html";
} else {
    showMessage(
    "#login-error",
    "Credenciales incorrectas. Usa " + DEMO_EMAIL + " / " + DEMO_PASSWORD + " para probar."
    );
}
});
}

function initDepositForm() {
const $form = $("#deposit-form");
if ($form.length === 0) return;

$form.on("submit", function (event) {
event.preventDefault();

const $amountInput = $("#deposit-amount");
const amount = parseFloat($amountInput.val());

if (isNaN(amount) || amount <= 0) {
    showMessage("#deposit-message", "Ingresa un monto válido.");
    return;
}

const newBalance = getBalance() + amount;
setBalance(newBalance);
addTransaction("Depósito", "Ingreso", amount);

renderBalance();
flashBalance();
hideMessage("#deposit-message");
$amountInput.val("");
alert("Depósito realizado: " + formatCurrency(amount));
});
}

function initSendMoneyForm() {
const $form = $("#sendmoney-form");
if ($form.length === 0) return;

$form.on("submit", function (event) {
event.preventDefault();

const $contactInput = $("#contact-search");
const $amountInput = $("#send-amount");

const contactName = $contactInput.val().trim();
const amount = parseFloat($amountInput.val());
const balance = getBalance();

if (!contactName) {
    showMessage("#send-message", "Ingresa o selecciona un contacto.");
    return;
}

if (isNaN(amount) || amount <= 0) {
    showMessage("#send-message", "Ingresa un monto válido.");
    return;
}

if (amount > balance) {
    showMessage("#send-message", "No tienes saldo suficiente para esta transferencia.");
    return;
}

setBalance(balance - amount);
addTransaction("Transferencia a " + contactName, "enviaste", amount);

renderBalance();
flashBalance();
hideMessage("#send-message");
$contactInput.val("");
$amountInput.val("");
alert("Transferencia a " + contactName + " por " + formatCurrency(amount));
});
}

function initContactAutocomplete() {
const $input = $("#contact-search");
const $suggestions = $("#contact-suggestions");
if ($input.length === 0 || $suggestions.length === 0) return;

$input.on("input", function () {
const query = $(this).val().trim().toLowerCase();
$suggestions.empty();

if (query.length === 0) {
    $suggestions.hide();
    return;
}

const matches = getContacts().filter(function (contact) {
    return contact.name.toLowerCase().indexOf(query) !== -1;
});

if (matches.length === 0) {
    $suggestions.hide();
    return;
}

matches.forEach(function (contact) {
    $("<li>")
    .addClass("list-group-item")
    .text(contact.name + " — " + contact.alias)
    .on("click", function () {
        $input.val(contact.name);
        $suggestions.empty().hide();
    })
    .appendTo($suggestions);
});

$suggestions.show();
});

$(document).on("click", function (event) {
const $target = $(event.target);
if (!$target.closest("#contact-search, #contact-suggestions").length) {
    $suggestions.hide();
}
});
}

function renderContacts() {
const $contactsList = $("#contacts-list");
if ($contactsList.length === 0) return;

const contacts = getContacts();
$contactsList.empty();

contacts.forEach(function (contact) {
$("<li>").text(contact.name + " — " + contact.alias).appendTo($contactsList);
});
}

function initAddContactForm() {
const $form = $("#add-contact-form");
if ($form.length === 0) return;

renderContacts();

$form.on("submit", function (event) {
event.preventDefault();

const $nameInput = $("#new-contact-name");
const $aliasInput = $("#new-contact-alias");

const name = $nameInput.val().trim();
const alias = $aliasInput.val().trim();

if (!name || !alias) return;

const contacts = getContacts();
contacts.push({ name: name, alias: alias });
setContacts(contacts);
renderContacts();

$form.trigger("reset");

const modalEl = $("#addContactModal").get(0);
const modalInstance = bootstrap.Modal.getInstance(modalEl);
if (modalInstance) {
    modalInstance.hide();
}
});
}

function renderTransactions() {
const $tbody = $("#transactions-body");
const $emptyMessage = $("#no-transactions-message");
if ($tbody.length === 0) return;

const transactions = getTransactions();

if (transactions.length === 0) {
$emptyMessage.fadeIn(200);
return;
}

$emptyMessage.hide();

transactions.forEach(function (tx) {
$("<tr>")
    .append($("<td>").text(tx.date))
    .append($("<td>").text(tx.description))
    .append($("<td>").text(tx.type))
    .append($("<td>").text(formatCurrency(tx.amount)))
    .appendTo($tbody);
});
}


function initMenuAnimations() {
const $balanceCard = $("#balance-summary");
if ($balanceCard.length === 0) return; // no estamos en menu.html

$balanceCard.hide().fadeIn(500);

$("#quick-actions .quick-action-card").each(function (index) {
$(this)
    .hide()
    .delay(150 * index)
    .fadeIn(400);
});
}

$(document).ready(function () {
renderBalance();
initLoginForm();
initDepositForm();
initSendMoneyForm();
initContactAutocomplete();
initAddContactForm();
renderTransactions();
initMenuAnimations();
});