//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
     document.getElementsByClassName('btn-pagar')[0].addEventListener('click', function() {
        // Obtener los valores de los campos del cliente
        var nombre = document.getElementById('nombre').value.trim();
        var nombreComercial = document.getElementById('nombreComercial').value.trim();
        var telefono = document.getElementById('telefono').value.trim();

        // Validar que todos los campos estén completos
        if (!nombre || !nombreComercial || !telefono) {
            alert('Por favor completa la información de Cliente.');
            return; // Detener el proceso si falta algún campo
        }

        // Aquí puedes proceder con el proceso de la orden (por ejemplo, enviar datos, mostrar confirmación, etc.)
        // Llama a la función pagarClicked() para realizar la orden
        pagarClicked();
    });
         // Add event listener to product images
      var productImages = document.getElementsByClassName('img-item');
      for (var i = 0; i < productImages.length; i++) {
        var productImage = productImages[i];
        productImage.addEventListener('click', showImageModal);
      }

      // Get the modal elements
      var modal = document.getElementById('imageModal');
      var modalImage = document.getElementById('modalImage');
      var closeBtn = document.getElementsByClassName('close')[0];

      // Close the modal when clicking the close button or outside the modal
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });

      window.addEventListener('click', function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      });
      ocultarCarrito();
    }

    var currentImageIndex = 0;
    var productImages = [];

    // Función para mostrar el modal con la imagen ampliada y las flechas de navegación
    function showImageModal(event) {
        var modal = document.getElementById('imageModal');
        var modalImage = document.getElementById('modalImage');

        // Obtener la URL de la imagen haciendo clic en el producto
        var imageSrc = event.target.src;
        var images = event.target.getAttribute('data-images');

        // Guardar todas las imágenes del producto en un array
        productImages = images.split(', ');

        // Encontrar el índice de la imagen actual en el array
        currentImageIndex = productImages.indexOf(imageSrc);

        // Establecer la imagen ampliada en el modal
        modalImage.src = imageSrc;
        modalImage.classList.add('modal-content'); // Agregar la clase 'modal-content' a la imagen

        // Mostrar el modal
        modal.style.display = 'block';
    }

    // Función para cambiar la imagen mostrada en el modal
    function changeImage(direction) {
        currentImageIndex += direction;

        // Ciclo de imágenes en el array
        if (currentImageIndex >= productImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = productImages.length - 1;
        }

        // Obtener la imagen correspondiente según el índice actual
        var newImageSrc = productImages[currentImageIndex];
        var modalImage = document.getElementById('modalImage');
        modalImage.src = newImageSrc;
    }

    // Obtener todas las imágenes de productos y agregar un event listener a cada una
    var productImages = document.getElementsByClassName('img-item');
    for (var i = 0; i < productImages.length; i++) {
        var productImage = productImages[i];
        productImage.addEventListener('click', showImageModal);
    }

    // Obtener elementos del modal y agregar funcionalidad para cerrarlo
    var modal = document.getElementById('imageModal');
    var closeBtn = document.getElementsByClassName('close')[0];

    // Cerrar el modal cuando se hace clic en el botón de cerrar
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal cuando se hace clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    

//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item" data-imagen="${imagenSrc}">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    // Agregamos la funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    // Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    // Actualizamos total
    actualizarTotalCarrito();

    // Asignamos el atributo data-imagen al elemento .carrito-item
    item.setAttribute('data-imagen', imagenSrc);
}

//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var precioTexto = precioElemento.innerText.replace('$', '').replace(',', ''); // Remover el símbolo de moneda y la coma de separación de miles
        var precioNumerico = parseFloat(precioTexto); // Convertir el precio a número

        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = parseInt(cantidadItem.value);

        total += precioNumerico * cantidad; // Calcular el subtotal por artículo
    }

    // Redondear el total a dos decimales
    total = total.toFixed(2);

    // Separar la parte entera y la parte decimal del total
    var partesTotal = total.split('.');
    var parteEntera = partesTotal[0];
    var parteDecimal = partesTotal.length > 1 ? '.' + partesTotal[1] : '';

    // Formatear la parte entera con separadores de miles usando una expresión regular
    parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Crear el formato final del total con coma como separador de miles y punto como separador decimal
    var totalFormateado = '$' + parteEntera + parteDecimal;

    // Mostrar el total formateado en el elemento HTML
    document.getElementsByClassName('carrito-precio-total')[0].innerText = totalFormateado;
}


function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    var mediaQuery = window.matchMedia('(max-width: 768px)');

    if (mediaQuery.matches) {
        // Mobile view
        items.style.width = '100%';
    } else {
        // Desktop view
        items.style.width = '60%';
    }
}

function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        var mediaQuery = window.matchMedia('(max-width: 768px)');

        if (mediaQuery.matches) {
            // Mobile view
            items.style.width = '100%';
        } else {
            // Desktop view
            items.style.width = '100%';
        }
    }
}


// Obtener todos los botones de filtro
const botonesFilter = document.querySelectorAll('.btn-filtro');
const itemsContainer = document.querySelector('.contenedor-items');

// Agregar evento clic a los botones de filtro
botonesFilter.forEach(boton => {
    boton.addEventListener('click', () => {
        botonesFilter.forEach(btn => btn.classList.remove('active'));
        boton.classList.add('active');

        const filtro = boton.getAttribute('data-filtro');

        itemsContainer.querySelectorAll('.item').forEach(item => {
            if (filtro === 'all') {
                item.style.display = 'block';
            } else {
                const tituloItem = item.querySelector('.titulo-item').textContent.toLowerCase();

                if (filtro === '1kg' && tituloItem.includes('1kg')) {
                    item.style.display = 'block';
                } else if (filtro === '100g' && tituloItem.includes('100g')) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// Define the available coupon codes and their respective discounts
const couponCodes = {
    'PROMO10': 10, // 10% discount
    'PROMO20': 20, // 20% discount
};

// Get references to the coupon input and apply button
const couponInput = document.getElementById('couponCode');
const applyCouponBtn = document.getElementById('applyCoupon');

// Variable to keep track of whether a coupon has been applied
let couponApplied = false;

// Add an event listener to the apply coupon button
applyCouponBtn.addEventListener('click', function() {
    const couponCode = couponInput.value.toUpperCase(); // Convert the input to uppercase

    // Check if a coupon has already been applied
    if (couponApplied) {
        alert('¡Ya hay un cupón activo aplicado!');
        return;
    }

    // Check if the coupon code is valid
    if (couponCodes.hasOwnProperty(couponCode)) {
        const discount = couponCodes[couponCode];
        applyDiscount(discount);
        alert(`¡Descuento de ${discount}% aplicado Correctamente!`);
        couponApplied = true; // Set the flag to indicate that a coupon has been applied
        showCouponUsed(discount, couponCode); // Pass the coupon code as well
    } else {
        alert('Codigo de Cupón Invalido!');
    }

    couponInput.value = ''; // Clear the coupon input field
});

// Function to apply the discount to the total
function applyDiscount(discount) {
    const totalElement = document.getElementsByClassName('carrito-precio-total')[0];
    const totalText = totalElement.textContent.replace('$', '').replace(',', '');
    const total = parseFloat(totalText);

    const discountedTotal = total * (1 - discount / 100);
    const formattedDiscountedTotal = formatTotal(discountedTotal);

    totalElement.textContent = formattedDiscountedTotal;
}

// Function to format the total with commas and decimal places
function formatTotal(total) {
    const partesTotal = total.toFixed(2).split('.');
    const parteEntera = partesTotal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const parteDecimal = partesTotal.length > 1 ? '.' + partesTotal[1] : '';
    return '$' + parteEntera + parteDecimal;
}

// Function to show the coupon used message
function showCouponUsed(discount, couponCode) {
    const couponInfoElement = document.querySelector('.coupon-info');
    couponInfoElement.textContent = `Cupón '${couponCode}' (${discount}% Off) Aplicado`;
}


// Configura Firebase
const firebaseConfig = {
    apiKey: "56295b27a9c62b6b1c082f8f5e8e899cefc09237",
    authDomain: "rutaslogistica-e7846.firebaseapp.com",
    databaseURL: "https://rutaslogistica-e7846-default-rtdb.firebaseio.com",
    projectId: "rutaslogistica-e7846",
    storageBucket: "rutaslogistica-e7846.appspot.com",
    messagingSenderId: "944349651926",
    appId: "944349651926"
};

// Inicialización de Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const database = firebase.database();

function pagarClicked() {
  // Obtener los valores de los campos del cliente
  var nombre = document.getElementById('nombre').value.trim();
  var nombreComercial = document.getElementById('nombreComercial').value.trim();
  var telefono = document.getElementById('telefono').value.trim();

  // Validar que todos los campos estén completos
  if (!nombre || !nombreComercial || !telefono) {
    alert('Por favor completa la información de Cliente.');
    return;
  }

  // Obtener el carrito-items y total
  var carritoItems = document.getElementsByClassName('carrito-items')[0];
  var items = [];
  var total = 0;

  // Crear un objeto con las URLs de las imágenes
  var imagenes = {};
  var itemElements = document.querySelectorAll('.item');
  for (var i = 0; i < itemElements.length; i++) {
    var itemElement = itemElements[i];
    var imagenSrc = itemElement.getAttribute('data-imagen');
    var tituloItemElement = itemElement.querySelector('.titulo-item');
    if (tituloItemElement) {
      var titulo = tituloItemElement.textContent;
      imagenes[titulo] = imagenSrc;
    }
  }

  for (var i = 0; i < carritoItems.children.length; i++) {
    var item = carritoItems.children[i];
    var itemTitulo = item.getElementsByClassName('carrito-item-titulo')[0].innerText;
    var itemPrecio = parseFloat(item.getElementsByClassName('carrito-item-precio')[0].innerText.replace('$', ''));
    var itemCantidad = parseInt(item.getElementsByClassName('carrito-item-cantidad')[0].value);
    var itemTotal = itemPrecio * itemCantidad;

    total += itemTotal;

    items.push({
      titulo: itemTitulo,
      precio: itemPrecio,
      cantidad: itemCantidad,
      total: itemTotal
    });
  }

  // Get the formatted total
  var totalFormateado = document.getElementsByClassName('carrito-precio-total')[0].innerText;

  // Crear un objeto con la orden
  var orden = {
    nombre: nombre,
    nombreComercial: nombreComercial,
    telefono: telefono,
    items: items,
    total: totalFormateado,
    imagenes: imagenes
  };

  // Save the order in the Firebase Realtime Database
  var ordersRef = database.ref('OrdenesApp').push();
  var uniqueOrderId = ordersRef.key; // Get the unique key generated by Firebase

  ordersRef.set(orden)
    .then(() => {
      // Mostrar el recibo de la orden
      showOrderConfirmation(uniqueOrderId, nombre, nombreComercial, telefono, items, totalFormateado, imagenes);

      // Limpiar el carrito y los campos del cliente
      while (carritoItems.hasChildNodes()) {
        carritoItems.removeChild(carritoItems.firstChild);
      }
      document.getElementById('nombre').value = '';
      document.getElementById('nombreComercial').value = '';
      document.getElementById('telefono').value = '';
      actualizarTotalCarrito();
      ocultarCarrito();
    })
    .catch((error) => {
      console.error("Error al guardar la orden en la base de datos:", error);
    });
}

function showOrderConfirmation(orderId, nombre, nombreComercial, telefono, items, totalFormateado) {
// Create a new div element to display the order confirmation
  var orderConfirmationDiv = document.createElement('div');
  orderConfirmationDiv.classList.add('modal', 'fade', 'show');
  orderConfirmationDiv.setAttribute('id', 'orderConfirmationModal');
  orderConfirmationDiv.setAttribute('tabindex', '-1');
  orderConfirmationDiv.setAttribute('role', 'dialog');
  orderConfirmationDiv.setAttribute('aria-labelledby', 'orderConfirmationModalLabel');
  orderConfirmationDiv.setAttribute('aria-hidden', 'true');
  orderConfirmationDiv.style.display = 'block';

  // Create the modal dialog
  var modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');

  // Create the modal content
  var modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  // Create the modal header
  var modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header', 'bg-primary', 'text-white');

  var modalTitle = document.createElement('h5');
  modalTitle.classList.add('modal-title');
  modalTitle.setAttribute('id', 'orderConfirmationModalLabel');
  modalTitle.textContent = 'Orden Creada Exitosamente';

  var checkIcon = document.createElement('i');
  checkIcon.classList.add('fas', 'fa-check-circle', 'fa-2x', 'me-2');

  modalHeader.appendChild(checkIcon);
  modalHeader.appendChild(modalTitle);

  // Create the modal body
  var modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  var orderIdText = document.createElement('p');
  orderIdText.classList.add('fw-bold');
  orderIdText.textContent = `ID de Orden : #${orderId}`;
  modalBody.appendChild(orderIdText);

  // Agrega el texto solicitado en negritas
  var noticeText = document.createElement('p');
  noticeText.classList.add('fw-bold');
  noticeText.textContent = "Nuestro departamento de ventas se comunicará con usted para confirmar la orden desde el número: +524491234567.";
  modalBody.appendChild(noticeText);

  var itemsTable = document.createElement('table');
  itemsTable.classList.add('table', 'table-striped');

  var thead = document.createElement('thead');
  var theadRow = document.createElement('tr');
  var thProduct = document.createElement('th');
  thProduct.textContent = 'Producto';
  var thQuantity = document.createElement('th');
  thQuantity.textContent = 'Cantidad';
  var thPrice = document.createElement('th');
  thPrice.textContent = 'Precio';

  theadRow.appendChild(thProduct);
  theadRow.appendChild(thQuantity);
  theadRow.appendChild(thPrice);
  thead.appendChild(theadRow);
  itemsTable.appendChild(thead);

  var tbody = document.createElement('tbody');
  items.forEach(item => {
    var tr = document.createElement('tr');

    var tdProduct = document.createElement('td');
    tdProduct.textContent = item.titulo; // Eliminamos la imagen y solo mostramos el título del producto

    var tdQuantity = document.createElement('td');
    tdQuantity.textContent = item.cantidad;

    var tdPrice = document.createElement('td');
    tdPrice.textContent = `$${item.total.toFixed(2)}`;

    tr.appendChild(tdProduct);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdPrice);
    tbody.appendChild(tr);
  });
  itemsTable.appendChild(tbody);

  var customerInfoDiv = document.createElement('div');
  customerInfoDiv.classList.add('mt-3');
  customerInfoDiv.innerHTML = `
    <p class="fw-bold">Información del Cliente:</p>
    <p>Nombre: ${nombre}</p>
    <p>Nombre Comercial: ${nombreComercial}</p>
    <p>Teléfono: ${telefono}</p>
    <p>Total: ${totalFormateado}</p>
  `;

  var printVoucherButton = document.createElement('button');
  printVoucherButton.classList.add('btn', 'btn-primary');
  printVoucherButton.textContent = 'Imprimir Voucher';
  printVoucherButton.addEventListener('click', () => {
    generatePDF(orderId, nombre, nombreComercial, telefono, items, totalFormateado);
  });

  modalBody.appendChild(orderIdText);
  modalBody.appendChild(itemsTable);
  modalBody.appendChild(customerInfoDiv);
  modalBody.appendChild(printVoucherButton);

  // Create the modal footer
  var modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer', 'justify-content-center'); // Centra el botón

  var closeButton = document.createElement('button');
  closeButton.classList.add('btn', 'btn-secondary');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.textContent = 'Cerrar';
  closeButton.addEventListener('click', function() {
    location.href = location.href; // Refrescar la página al hacer clic en "Cerrar"
  });
  modalFooter.appendChild(closeButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modalDialog.appendChild(modalContent);
  orderConfirmationDiv.appendChild(modalDialog);

  document.body.appendChild(orderConfirmationDiv);
}

function generatePDF(orderId, nombre, nombreComercial, telefono, items, totalFormateado) {
  // Obtener la referencia al elemento que contiene la orden final
  var orderConfirmationElement = document.getElementById('orderConfirmationModal');

  // Excluir los botones de la captura
  var buttons = orderConfirmationElement.querySelectorAll('button');
  buttons.forEach(button => {
    button.style.display = 'none';
  });

  // Capturar el elemento como una imagen usando html2canvas
  html2canvas(orderConfirmationElement, {
    allowTaint: true,
    useCORS: true,
    width: orderConfirmationElement.offsetWidth,
    height: orderConfirmationElement.offsetHeight
  })
    .then(function (canvas) {
      // Convertir el lienzo a un enlace de descarga
      var link = document.createElement('a');
      link.download = `OrderConfirmation_${orderId}.jpeg`;
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.click();

      // Restaurar la visibilidad de los botones
      buttons.forEach(button => {
        button.style.display = '';
      });
    })
    .catch(function (error) {
      console.error('Error al capturar la imagen:', error);
    });
}