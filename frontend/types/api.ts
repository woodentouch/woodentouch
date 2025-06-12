export interface Result<T = any> {
        status: number;
        message: string;
        data?: T;
}

export interface BestSellerDTO {
        productName: string;
        licenseName: string;
        quantitySold: number;
        total: number;
}

export interface LicenseStatDTO {
        licenseName: string;
        count: number;
        percentage: number;
}
