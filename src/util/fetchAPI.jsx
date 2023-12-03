export default class fetchAPI {
    static baseUrl = 'http://localhost:4321'

    static async get(url) {
        const response = await fetch(`${this.baseUrl}${url}`)
        if (!response.ok) {
            throw new Error(`GET Request failed with status ${response.status}`)
        }
        return response.json()
    }

    static async post(url, data) {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(
                `POST Request failed with status ${response.status}`
            )
        }
        return response.json()
    }

    static async put(url, data) {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error(`PUT Request failed with status ${response.status}`)
        }

        return response.json()
    }

    static async delete(url) {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'DELETE',
        })
        if (!response.ok) {
            throw new Error(
                `DELETE Request failed with status ${response.status}`
            )
        }
    }
}
