import RNFS from 'react-native-fs';
import { CartProductType, ProductType } from 'types/AppTypes';

const cartFilePath = RNFS.DocumentDirectoryPath + '/cartData.json';

// Check if cart file exists
export const ensureCartFileExists = async () => {
    const exists = await RNFS.exists(cartFilePath);
    if (!exists) {
        // If not exists, create an empty cart
        await RNFS.writeFile(cartFilePath, JSON.stringify([]), 'utf8');
        console.log('Cart file created as empty array []');
    }
};

// Read Cart
export const readCart = async () => {
    try {
        await ensureCartFileExists();
        const cartJson = await RNFS.readFile(cartFilePath, 'utf8');
        const cartData = JSON.parse(cartJson);
        return cartData;
    } catch (error: any) {
        console.error('Error reading cart:', error.message);
        return [];
    }
};

// Add new product to cart
export const addProductToCart = async (newProduct: CartProductType) => {
    try {
        const cart = await readCart();
        cart.push(newProduct);
        await RNFS.writeFile(cartFilePath, JSON.stringify(cart), 'utf8');
        console.log('Product added to cart:', newProduct);
    } catch (error: any) {
        console.error('Error adding product to cart:', error.message);
    }
};

// Clear entire cart (optional helper)
export const clearCart = async () => {
    try {
        await RNFS.writeFile(cartFilePath, JSON.stringify([]), 'utf8');
        console.log('Cart cleared.');
    } catch (error: any) {
        console.error('Error clearing cart:', error.message);
    }
};


// Update cart by adding or updating a product
export const updateCart = async (newProduct: ProductType) => {
    try {
        const cartData = await readCart();
        const existingProductIndex = cartData.findIndex((item: ProductType) => (item!._id === newProduct?._id));
        if (existingProductIndex > -1) {
            cartData[existingProductIndex] = newProduct;
        } else {
            cartData.push(newProduct);
        }
        await RNFS.writeFile(cartFilePath, JSON.stringify(cartData), 'utf8');
        console.log('Cart updated');
    } catch (error) {
        console.error('Error updating cart:', error);
    }
};

// Delete product from cart by ID
export const deleteProductFromCart = async (product: ProductType) => {
    try {
        const cartData = await readCart();
        const updatedCart = cartData.filter((item: ProductType) => item!._id !== product?._id);
        await RNFS.writeFile(cartFilePath, JSON.stringify(updatedCart), 'utf8');
        console.log('Product removed from cart');
    } catch (error) {
        console.error('Error removing product from cart:', error);
    }
};

// Example usage:
const initialCart = [
    { id: 1, name: 'Product 1', price: 20 },
    { id: 2, name: 'Product 2', price: 30 }
];
