export interface Order {
    offerId: string;
    user: string;
    name: string;
    surname: string;
    email: string;
    items: OrderItem[];
}

export interface OrderItem {
    plantId: string;
    amount: number;
}