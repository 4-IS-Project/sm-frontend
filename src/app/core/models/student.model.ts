export interface Student {
    _id?: string,
    name: string,
    last_name: string,
    dni: number,
    email: string,
    address: string,
    phone: Array<number>,
    grade: number,
    level: string,
    section: string,
    health_status: boolean,
    representative?: {
        name: string,
        last_name: string,
        dni: number,
        phone: number,
        email: string
    },
    enrollment: Array<string>,
    lat: number,
    long: number
}
