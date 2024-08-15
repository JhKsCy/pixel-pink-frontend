import { Component } from '@angular/core';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {

  productos = [
    { nombre: 'Producto 1', categoria: 'CAMISETAS/TOPS' },
    { nombre: 'Producto 2', categoria: 'HOODIES' },
    { nombre: 'Producto 3', categoria: 'VESTIDOS' },
    { nombre: 'Producto 4', categoria: 'SWEATERS' },
  
  ];
  productosFiltrados = [...this.productos]; // Inicialmente muestra todos los productos

  filterCategory(categoria: string) {
    this.productosFiltrados = this.productos.filter(producto => producto.categoria === categoria);
  }
}
