// Fetch API para cargar productos dinámicamente
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos();
});

async function cargarProductos() {
    const container = document.getElementById('productos-container');
    
    try {
        // Fetch desde archivo local JSON
        const response = await fetch('./data/productos.json');
        
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        
        const productos = await response.json();
        
        // Limpiar el spinner
        container.innerHTML = '';
        
        // Renderizar productos
        productos.forEach(producto => {
            const productoHTML = `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text text-muted">${producto.categoria}</p>
                            <p class="card-text">${producto.descripcion}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="h4 mb-0 text-primary">$${producto.precio}</span>
                                <button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${producto.id})">
                                    <i class="fas fa-shopping-cart"></i> Agregar
                                </button>
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                            <small>Stock: ${producto.stock} unidades</small>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productoHTML;
        });
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle"></i> 
                    Error al cargar los productos. Por favor, intenta más tarde.
                </div>
            </div>
        `;
    }
}

function agregarAlCarrito(id) {
    alert(`Producto ${id} agregado al carrito`);
}
