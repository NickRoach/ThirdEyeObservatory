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

export const getCart = async () => {
    const col = firestore.collection("carts");
    const queryData = await col.get();
    const documents = queryData.docs;
    return documents.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addToCart = async (productId, numberOf) => {
    const productObject = {
        productId: productId,
        numberOf: numberOf,
    };
    console.log("AddtoCart was called");
    const col = firestore.collection("carts");
    await col.add(productObject);
};
