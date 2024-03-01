import { Request, Response, NextFunction } from "express";

const getHeadersOWASP = async () => {
    const response = await fetch(
        "https://owasp.org/www-project-secure-headers/ci/headers_add.json",
        {
            method: "GET",
        }
    );
    const resBody = await response.json();
    return resBody.headers;
};

export const customerHeadersConfig = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const getHeaders = await getHeadersOWASP();

    const newHeader: { [k: string]: any } = {};

    getHeaders.map((header: { name: string; value: string }) => {
        // if (header.name === "Clear-Site-Data") {
        //     return;
        // } else if (header.name === "Cross-Origin-Resource-Policy") {
        //     return;
        // } else {
        //     newHeader[`${header.name}`] = header.value;
        // }
        newHeader[`${header.name}`] = header.value;
    });

    res.set(newHeader ? newHeader : "");

    next();
};
