fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.querySelector('footer').outerHTML = data;
    carregarAno();
});