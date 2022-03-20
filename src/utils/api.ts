class Api {
  _baseUrl: string;

  constructor(options: { baseUrl: string }) {
    this._baseUrl = options.baseUrl;
  }

  _handleResponse(res: any) {
    return res.ok
      ? res.json()
      : Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getLatestCurrencies() {
    return fetch(`${this._baseUrl}/daily_json.js`).then(this._handleResponse);
  }
}

export const api = new Api({
  baseUrl: 'https://www.cbr-xml-daily.ru',
});
