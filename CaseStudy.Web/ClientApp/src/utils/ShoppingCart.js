export const ShoppingCart = () => {
    const key = "shoppingCart";
    const save = () => localStorage.setItem(key, JSON.stringify(carIds));
    let carIds = JSON.parse(localStorage.getItem(key)) || [];

    return {
        getCarIds: () => carIds,
        add: (id) => {
            if (carIds.includes(id)) return;
            carIds.push(id);
            save();
        },
    
        remove: (id) => {
            carIds = carIds.filter(i => i != id);
            save();
        }
    };
};