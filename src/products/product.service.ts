import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model'

@Injectable()
export class ProductService {
	private products: Product[] = [];

    addProduct(title: string, description: string, price: number) {
		const productId = Math.floor(Math.random() * 100).toString();
		const newProduct = new Product(productId, title, description, price);
		this.products.push(newProduct);
		return productId;
    }

	getAllProducts() {
		return [...this.products];
	}

	getProduct(id: string) {
		const product = this.findProduct(id);
		return {...product}
	}

	updateProduct(id: string, title: string, description: string, price: number){
		const [product, productIndex] = this.findProduct(id);
		const updatedProduct = {...product}
		if(title){
			updatedProduct.title = title
		}
		if(description){
			updatedProduct.description = description

		}
		if(price){
			updatedProduct.price = price

		}
		this.products[productIndex] = updatedProduct
		return this.products[productIndex];
	}

	deleteProduct(id: string){
		const [product, productIndex] = this.findProduct(id);
		this.products.splice(productIndex, 1);
		return 'success: ' + this.products
	}

	private findProduct(id: string): [Product, number]{
		const productIndex =  this.products.findIndex(product => product.id === id);
		const product = this.products[productIndex]
		if(!product) throw new NotFoundException('Product not found');
		return [product, productIndex];
	}
};
