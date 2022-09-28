let products = []
let isEditing = false;
let beingEdited = 0;

function showForm(){
    let table = document.getElementById("table-container");
    table.style.display = "none";
    let form = document.getElementById("form-container");
    form.style.display = "block";

    clearForm();    
}

function showTable(){
    if (isEditing){
        let product = products[beingEdited];

        let modeloInput = document.getElementById("modeloInput");
        let marcaInput = document.getElementById("marcaInput");
        let tipoInput = document.getElementById("tipoInput");
        let quantityInput = document.getElementById("quantityInput");
        let radio1 = document.getElementById("radio1");
        let radio2 = document.getElementById("radio2");
        let check1 = document.getElementById("check1");
        let check2 = document.getElementById("check2");
        let check3 = document.getElementById("check3");
    
        let checkedDifferentials = []
        if (check1.checked){
            checkedDifferentials.push(check1.value)
        }
        if (check2.checked){
            checkedDifferentials.push(check2.value)
        }
        if (check3.checked){
            checkedDifferentials.push(check3.value)
        }

        let checkedRadio = radio1.checked ? radio1.value : radio2.value;

        product.model = modeloInput.value;
        product.brand = marcaInput.value;
        product.type = tipoInput.value;
        product.quantity = quantityInput.value;
        product.condition = checkedRadio;
        product.differentials = checkedDifferentials.join(", ");
    }

    let form = document.getElementById("form-container");
    form.style.display = "none";
    let table = document.getElementById("table-container");
    table.style.display = "block";

    isEditing = false;
    beingEdited = 0;

    listProducts();
}

function createProduct(){

    if (!validateForm()){
        alert("Preencha os dados corretamente!");
        return;
    }

    let modeloInput = document.getElementById("modeloInput");
    let marcaInput = document.getElementById("marcaInput");
    let tipoInput = document.getElementById("tipoInput");
    let quantityInput = document.getElementById("quantityInput");
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let check1 = document.getElementById("check1");
    let check2 = document.getElementById("check2");
    let check3 = document.getElementById("check3");
   
    let checkedDifferentials = []
    if (check1.checked){
        checkedDifferentials.push(check1.value)
    }
    if (check2.checked){
        checkedDifferentials.push(check2.value)
    }
    if (check3.checked){
        checkedDifferentials.push(check3.value)
    }

    let checkedRadio = radio1.checked ? radio1.value : radio2.value;

    let product = {
        model: modeloInput.value,
        brand: marcaInput.value,
        type: tipoInput.value,
        quantity: quantityInput.value,
        condition: checkedRadio,
        differentials: checkedDifferentials,

        ligar: function(){
            alert(this.model + ": Ligando!")
        },
        aumentarVolume: function(){
            alert(this.model + ": Aumentando volume!")
        },
        reduzirVolume: function(){
            alert(this.model + ": Reduzindo volume!")
        },
        desligar: function(){
            alert(this.model + ": Desligando!")
        },
    }

    products.push(product);

    clearForm();    
    alert("Produto registrado com sucesso!");
    isEditing = false;
    beingEdited = 0;
    showTable();
    listProducts();

}

function editProduct(i){
    isEditing = true;
    beingEdited = i;

    let product = products[i];

    showForm();
    clearForm();

    let modeloInput = document.getElementById("modeloInput");
    modeloInput.value = product.model;
    let marcaInput = document.getElementById("marcaInput");
    marcaInput.value = product.brand;
    let tipoInput = document.getElementById("tipoInput")
    tipoInput.value = product.type;
    let quantityInput = document.getElementById("quantityInput");
    quantityInput.value = product.quantity;
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let check1 = document.getElementById("check1");
    let check2 = document.getElementById("check2");
    let check3 = document.getElementById("check3");
    
    if (product.condition == "Novo"){
        
        radio1.checked = true;
    }
    else{
        radio2.checked = true;
    }

    if (product.differentials.includes("Full HD")){
        check1.checked = true;
    }
    if (product.differentials.includes("5G")){
        check2.checked = true;
    }
    if (product.differentials.includes("Dual Chip")){
        check3.checked = true;
    }            
}

function listProducts(){

    let oldTbody = document.getElementById("table-body");
    var newTbody = document.createElement('tbody');
    newTbody.id = "table-body";

    oldTbody.parentElement.replaceChild(newTbody, oldTbody);

    table = newTbody;

    products.forEach((p, i) => {

        var row = table.insertRow(i);
        
        var cellNumber = row.insertCell(0);
        cellNumber.innerHTML = i+1;

        var cellModel = row.insertCell(1);
        cellModel.innerHTML = p.model;

        var cellBrand = row.insertCell(2);
        cellBrand.innerHTML = p.brand;

        var cellQuantity = row.insertCell(3);
        cellQuantity.innerHTML = p.quantity;

        var deleteAction = document.createElement("button");
        deleteAction.innerHTML = "Apagar"
        deleteAction.onclick = () => deleteProduct(i);
        deleteAction.classList.add("small-button");

        var editAction = document.createElement("button");
        editAction.innerHTML = "Editar"
        editAction.onclick = () => editProduct(i);
        editAction.classList.add("small-button");

        var testAction = document.createElement("button");
        testAction.innerHTML = "Testar"
        testAction.onclick = () => testProduct(i);
        testAction.classList.add("small-button");
        
        var actionsCell = row.insertCell(4);
        actionsCell.appendChild(deleteAction);
        actionsCell.appendChild(editAction);
        actionsCell.appendChild(testAction);
    });

}

function testProduct(i){

    let product = products[i];

    product.ligar();
    product.aumentarVolume();
    product.reduzirVolume();
    product.desligar();
}


function deleteProduct(i){

    if (!confirm("Deseja mesmo excluir o registro?")){
        return;
    }

    products.splice(i, 1);

    listProducts();
}

function clearForm(){
    let modeloInput = document.getElementById("modeloInput");
    let marcaInput = document.getElementById("marcaInput");
    let tipoInput = document.getElementById("tipoInput");
    let quantityInput = document.getElementById("quantityInput");
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let check1 = document.getElementById("check1");
    let check2 = document.getElementById("check2");
    let check3 = document.getElementById("check3");

    modeloInput.value = "";
    marcaInput.value = "";
    tipoInput.value = "-";
    quantityInput.value = "0";
    radio1.checked = false;
    radio2.checked = false;
    check1.checked = false;
    check2.checked = false;
    check3.checked = false;
}

function validateForm(){
    let modeloInput = document.getElementById("modeloInput");
    let marcaInput = document.getElementById("marcaInput");
    let tipoInput = document.getElementById("tipoInput");
    let quantityInput = document.getElementById("quantityInput");
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let check1 = document.getElementById("check1");
    let check2 = document.getElementById("check2");
    let check3 = document.getElementById("check3");

    if (modeloInput.value == null || modeloInput.value == ""){
        return false;
    }
    if (marcaInput.value == null || marcaInput.value == ""){
        return false;
    }
    if (tipoInput.value == null || tipoInput.value == "" || tipoInput.value == "-"){
        return false;
    }
    if (quantityInput.value == null || quantityInput.value == "" || quantityInput.value == "0"){
        return false;
    }
    if ((radio1.checked && radio2.checked) || (!radio1.checked && !radio2.checked)){
        return false;
    }
    if (!check1.checked && !check2.checked && !check3.checked){
        return false;
    }

    return true;
}