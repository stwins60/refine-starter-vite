import type { DataProvider } from "@refinedev/core";
// import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

const API_URL = 'http://10.0.0.172:5055/api/v1/jokes';

export const dataProvider: DataProvider = {
    create: async ({ resource, variables }) => {
        console.log("create", resource, variables);
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(variables),
        });

        if (response.status < 200 || response.status > 299) throw response;

        return { data: await response.json() };
    },
    getOne: async ({ id, meta }) => {
        const response = await fetch(`${API_URL}/${id}`);

        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();
        console.log(data);
        return { data };
    },
    update: async ({ id, variables }) => {
        console.log("update", id, variables);
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(variables),
        });
        console.log(response);

        if (response.status < 200 || response.status > 299) throw response;

        return { data: await response.json() };
    },
    getList: async ({ pagination, filters, sorter, meta }) => {
        const params = new URLSearchParams();
        console.log(pagination);

        if (pagination) {
            const currentPage = pagination.current ?? 1;  // Default to 1 if undefined
            const pageSize = pagination.pageSize ?? 10;   // Default pageSize to 10 if undefined

            // Use _start and _end to calculate pagination
            const _start = ((currentPage - 1) * pageSize).toString();
            const _end = (currentPage * pageSize).toString();

            params.append("_start", _start);
            params.append("_end", _end);
        }

        if (sorter && sorter.length > 0) {
            params.append("_sort", sorter.map((sorter) => sorter.field).join(","));
            params.append("_order", sorter.map((sorter) => sorter.order).join(","));
        }

        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                if ("field" in filter && filter.operator === "eq") {
                    params.append(filter.field, filter.value);
                }
            });
        }

        const response = await fetch(`${API_URL}?${params.toString()}`);
        if (response.status < 200 || response.status > 299) throw response;

        const data = await response.json();
        console.log(data);

        if (Array.isArray(data.jokes)) {
            return {
                data: data.jokes,
                total: data.total,
            };
        }

        return {
            data: data.data,
            total: data.total || 0,
        };
    }

};
