import firestore from "../FireStore";

export const getProduct = async (id) => {
    const col = firestore.collection("products");
    const ref = col.doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
        return;
    }

    return { id: doc.id, ...doc.data() };
};

export const getProducts = async () => {
    const col = firestore.collection("products");
    const queryData = await col.get();
    const documents = queryData.docs;
    return documents.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getCart = async (userName) => {
    const col = firestore.collection("carts").doc(userName);
    const queryData = await col.get();
    const productsObject = { id: queryData.id, ...queryData.data() };
    return productsObject;
};

export const addToCart = async (productId, numberOf, userName) => {
    const currentCart = await getCart(userName);
    const currentCartProducts = currentCart.products;

    //get the index of the product object that matches the one being added

    let foundIndex = -1;

    currentCartProducts.forEach((prodObj, index) => {
        if (prodObj.productId === productId) {
            foundIndex = index;
        }
    });

    let newCartProductObjs = [];

    if (foundIndex === -1) {
        //if the item isn't already in the cart, then add it
        const productObject = {
            productId: productId,
            numberOf: numberOf,
        };
        newCartProductObjs = [...currentCartProducts, productObject];
    } else {
        //if it's already in there, increase the quanitity by one
        newCartProductObjs = [...currentCartProducts];
        newCartProductObjs[foundIndex] = {
            productId: productId,
            numberOf: newCartProductObjs[foundIndex].numberOf + 1,
        };
    }

    const newCart = {
        products: newCartProductObjs,
    };

    const col = firestore.collection("carts").doc(userName);
    await col.update(newCart);
};

/////////////////////////////////////////////////
//////////////////////////////////////////////////
/////////////////////////////////////////////////

// export const removeFromCart = async (productId, numberOf, userName) => {
//     const currentCart = await getCart(userName);
//     const currentCartProducts = currentCart.products;

//     //get the index of the product object that matches the one being added

//     let foundIndex = -1;

//     currentCartProducts.forEach((prodObj, index) => {
//         if (prodObj.productId === productId) {
//             foundIndex = index;
//         }
//     });

//     let newCartProductObjs = [];

//     if (foundIndex === -1) {
//         //if the item isn't already in the cart, then add it
//         const productObject = {
//             productId: productId,
//             numberOf: numberOf,
//         };
//         newCartProductObjs = [...currentCartProducts, productObject];
//     } else {
//         //if it's already in there, increase the quanitity by one
//         newCartProductObjs = [...currentCartProducts];
//         newCartProductObjs[foundIndex] = {
//             productId: productId,
//             numberOf: newCartProductObjs[foundIndex].numberOf + 1,
//         };
//     }

//     const newCart = {
//         products: newCartProductObjs,
//     };

//     const col = firestore.collection("carts").doc(userName);
//     await col.update(newCart);
// };
