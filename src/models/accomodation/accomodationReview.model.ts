export interface AccomodationReview {
    id: number;
    content: string;
    stars: number;
    user: {
        name: string;
        surname: string;
    }
    createdAt: Date;
}