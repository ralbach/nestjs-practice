import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    addProduct(
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number,
    ): any {
        const createdProductId = this.productService.addProduct(productTitle, productDescription, productPrice);
        
        return {id: createdProductId};
    }

    @Get()
    getAllProducts(){
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId: string){
        return this.productService.getProduct(productId);
    }

    @Patch(':id')
    updateProduct(@Param('id') productId: string, @Body('title') productTitle: string, @Body('description') productDescription: string, @Body('price') productPrice: number){
        return this.productService.updateProduct(productId, productTitle, productDescription, productPrice);
    }

    @Delete(':id')
    deleteProduct(@Param('id') productId: string){
        return this.productService.deleteProduct(productId);
    }
}
